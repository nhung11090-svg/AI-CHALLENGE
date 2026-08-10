import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-side State & Cost Guard Memory
let dailyImageCount = 0;
let dailyImageLimit = 30; // Default limit
let sessionImageCount = 0;
let sessionImageLimit = 1; // Default 1 image per session
let currentDateStr = new Date().toISOString().split("T")[0];

function checkAndResetDailyCounter() {
  const today = new Date().toISOString().split("T")[0];
  if (today !== currentDateStr) {
    currentDateStr = today;
    dailyImageCount = 0;
  }
}

// Lazy Gemini Client Initialization
function getGenAIClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API ROUTE 1: Status Check
app.get("/api/status", (req, res) => {
  checkAndResetDailyCounter();
  const hasKey = !!process.env.GEMINI_API_KEY;

  res.json({
    hasKey,
    textAiStatus: hasKey ? "online" : "demo",
    imageAiStatus: hasKey
      ? dailyImageCount >= dailyImageLimit
        ? "quota_reached"
        : "online"
      : "demo",
    dailyImageCount,
    dailyImageLimit,
    sessionImageCount,
    sessionImageLimit,
  });
});

// API ROUTE 2: Detective Game 2 Text AI Endpoint
app.post("/api/detective", async (req, res) => {
  try {
    const ai = getGenAIClient();
    if (!ai) {
      return res.status(400).json({ error: "NO_API_KEY", message: "Chế độ Demo Mode offline" });
    }

    const { category, level, history } = req.body;

    const systemInstruction = `Bạn là AI Detective trong một gameshow dành cho học sinh Việt Nam.
Một học sinh đang nghĩ bí mật về một đối tượng thuộc chủ đề: "${category}". Cấp độ học sinh: ${level}.
Nhiệm vụ của bạn là đoán đối tượng.
Quy tắc:
1. Chỉ hỏi từng câu một.
2. Mỗi câu phải có thể trả lời bằng Có, Không hoặc Không chắc.
3. Không hỏi hai nội dung cùng lúc.
4. Câu hỏi cực kỳ ngắn gọn, tiếng Việt tự nhiên, phù hợp với học sinh.
5. Bạn được hỏi tối đa 7 câu.
6. Nếu đã đủ 5-7 thông tin hoặc đủ tự tin, hãy đưa ra dự đoán cụ thể.
7. Trả về định dạng JSON duy nhất.`;

    const formattedHistory = Array.isArray(history)
      ? history
          .map(
            (h: { question: string; answer: string }, idx: number) =>
              `Câu ${idx + 1}: AI hỏi: "${h.question}" -> Học sinh trả lời: "${h.answer}"`
          )
          .join("\n")
      : "";

    const userPrompt = `Lịch sử câu hỏi đã qua:\n${formattedHistory || "Chưa có câu hỏi nào"}\n\nHãy đưa ra CÂU HỎI TIẾP THEO hoặc DỰ ĐOÁN ĐÁP ÁN.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: {
              type: Type.STRING,
              description: "Must be 'question' if asking a question, or 'guess' if predicting the answer",
            },
            text: {
              type: Type.STRING,
              description: "The Vietnamese question text OR the guess answer text",
            },
          },
          required: ["type", "text"],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI");
    }

    const parsed = JSON.parse(responseText);
    res.json(parsed);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Error";
    console.error("Detective API Error:", errorMessage);
    res.status(500).json({ error: "API_ERROR", message: errorMessage });
  }
});

// API ROUTE 3: Image Generation Endpoint with Cost Guard
app.post("/api/generate-image", async (req, res) => {
  try {
    checkAndResetDailyCounter();

    const { prompt, overrideCostGuard, quality } = req.body;

    // Check Cost Guard Limits
    if (!overrideCostGuard) {
      if (dailyImageCount >= dailyImageLimit) {
        return res.status(429).json({
          error: "DAILY_LIMIT_REACHED",
          message: `Đã đạt giới hạn ${dailyImageLimit} ảnh hôm nay. Chuyển sang PROMPT ONLY MODE.`,
          dailyImageCount,
          dailyImageLimit,
        });
      }

      if (sessionImageCount >= sessionImageLimit) {
        return res.status(429).json({
          error: "SESSION_LIMIT_REACHED",
          message: `Đã đạt giới hạn 1 ảnh mỗi lượt chơi. Cần quyền Teacher Override để tạo lại.`,
          sessionImageCount,
          sessionImageLimit,
        });
      }
    }

    const ai = getGenAIClient();
    if (!ai) {
      return res.status(400).json({ error: "NO_API_KEY", message: "Chế độ Demo Mode offline" });
    }

    // Generate image using Gemini / Imagen API
    let imageUrl = "";
    try {
      if (ai.models && typeof (ai.models as any).generateImages === "function") {
        const imgRes = await (ai.models as any).generateImages({
          model: "imagen-3.0-generate-002",
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: "image/jpeg",
            aspectRatio: "1:1",
          },
        });
        if (imgRes.generatedImages?.[0]?.image?.imageBytes) {
          imageUrl = `data:image/jpeg;base64,${imgRes.generatedImages[0].image.imageBytes}`;
        }
      }
    } catch (imgErr) {
      console.warn("Imagen 3 API call failed, attempting fallback generateContent:", imgErr);
    }

    if (!imageUrl) {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64Str = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || "image/png";
            imageUrl = `data:${mimeType};base64,${base64Str}`;
            break;
          }
        }
      }
    }

    if (!imageUrl) {
      throw new Error("Không nhận được dữ liệu ảnh từ Gemini API");
    }

    // Increment counters
    dailyImageCount++;
    sessionImageCount++;

    res.json({
      success: true,
      imageUrl,
      dailyImageCount,
      dailyImageLimit,
      sessionImageCount,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Error";
    console.error("Image Generation API Error:", errorMessage);
    res.status(500).json({ error: "IMAGE_GEN_FAILED", message: errorMessage });
  }
});

// API ROUTE 4: Reset Session Counter (called on "NHÓM TIẾP THEO")
app.post("/api/reset-session", (req, res) => {
  sessionImageCount = 0;
  res.json({ success: true, sessionImageCount, dailyImageCount });
});

// API ROUTE 5: Teacher Cost Guard Config Update
app.post("/api/update-limits", (req, res) => {
  const { maxDaily, resetDailyCounter, resetSessionCounter } = req.body;
  if (typeof maxDaily === "number" && maxDaily > 0) {
    dailyImageLimit = maxDaily;
  }
  if (resetDailyCounter) {
    dailyImageCount = 0;
  }
  if (resetSessionCounter) {
    sessionImageCount = 0;
  }
  res.json({
    success: true,
    dailyImageCount,
    dailyImageLimit,
    sessionImageCount,
    sessionImageLimit,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI ARENA Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
