export interface DatasetImage {
  id: string; // Neutral ID e.g. "IMG_00101"
  filename: string; // Neutral e.g. "IMG_00101.jpg"
  contentUrl: string; // Photorealistic image URL
  sourceType: 'ai' | 'real';
  level: 'EXPLORER' | 'CHALLENGER' | 'MASTER';
  category: 'Đời sống' | 'Đồ vật' | 'Thiên nhiên' | 'Kiến trúc' | 'Ẩm thực' | 'Công nghệ';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  title: string;
  explanation: string;
  sourceNote?: string; // Admin mode only - hidden from students
  enabled: boolean;
  flaggedTooEasy?: boolean;
  points?: number; // 1 for normal, 2 for final bonus question
}

// Curated Photorealistic Paired Image Dataset for Game 1
export const INITIAL_DATASET: DatasetImage[] = [
  // ==========================================
  // --- CATEGORY: ĐỜI SỐNG (LIFESTYLE) ---
  // ==========================================
  {
    id: 'IMG_00101',
    filename: 'IMG_00101.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'EXPLORER',
    category: 'Đời sống',
    difficulty: 'Easy',
    title: 'Góc Bàn Học Bên Cửa Sổ Buổi Sáng',
    explanation: 'Ảnh thật chụp góc học tập ngập tràn ánh nắng tự nhiên. Bố cục và bóng đổ ánh sáng thực tế hoàn toàn trùng khớp.',
    sourceNote: 'Unsplash Photography / Authentic Classroom Desk',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00102',
    filename: 'IMG_00102.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'EXPLORER',
    category: 'Đời sống',
    difficulty: 'Easy',
    title: 'Góc Học Tập Nhỏ Trong Căn Phòng Gỗ',
    explanation: 'Ảnh AI tạo bối cảnh góc học tập. Mặc dù rất chân thực, khi soi kỹ chi tiết phần gáy sách trên kệ có các ký tự chưa rõ nghĩa.',
    sourceNote: 'Generative AI Photorealistic Model / Teacher Approved',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00103',
    filename: 'IMG_00103.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'CHALLENGER',
    category: 'Đời sống',
    difficulty: 'Medium',
    title: 'Chiếc Xe Đạp Dựa Vào Tường Gạch Rêu',
    explanation: 'Ảnh thật chụp chiếc xe đạp cũ dựa vào tường. Chi tiết và xích xe, độ sờn sơn khung xe phản ánh đúng hao mòn vật lý thực tế.',
    sourceNote: 'Unsplash Photography / Street Bicycle',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00104',
    filename: 'IMG_00104.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'CHALLENGER',
    category: 'Đời sống',
    difficulty: 'Medium',
    title: 'Xe Đạp Cổ Trong Nắng Chiều Thành Phố',
    explanation: 'Ảnh AI sinh phong cách candid photography. Nan hoa bánh xe và các mắt xích chạy rất mượt nhưng một vài nan hoa chập vào nhau.',
    sourceNote: 'ChatGPT DALL-E 3 Photorealistic prompt / Approved',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00105',
    filename: 'IMG_00105.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'MASTER',
    category: 'Đời sống',
    difficulty: 'Hard',
    title: 'Quán Cà Phê Nhỏ Trong Hẻm Yên Tĩnh',
    explanation: 'Ảnh thật chụp góc quán cà phê. Ánh sáng xiên qua cửa kính tạo tương phản chân thực giữa vùng sáng và bóng tối.',
    sourceNote: 'Documentary Photography / Street Cafe',
    enabled: true,
    points: 2,
  },
  {
    id: 'IMG_00106',
    filename: 'IMG_00106.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'MASTER',
    category: 'Đời sống',
    difficulty: 'Hard',
    title: 'Cửa Hàng Cà Phê Gỗ Ấm Cúng Chiều Thu',
    explanation: 'Ảnh AI chất lượng rất cao. Nhìn bằng mắt thường gần như không thể khẳng định 100% là AI nếu không soi phản chiếu ánh sáng bề mặt.',
    sourceNote: 'Photorealistic AI Generation / Ultra High Quality',
    enabled: true,
    points: 2,
  },

  // ==========================================
  // --- CATEGORY: ĐỒ VẬT (OBJECTS) ---
  // ==========================================
  {
    id: 'IMG_00201',
    filename: 'IMG_00201.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'EXPLORER',
    category: 'Đồ vật',
    difficulty: 'Easy',
    title: 'Chiếc Balo Học Sinh Đặt Trên Ghế Gỗ',
    explanation: 'Ảnh thật chụp balo đi học. Mũi chỉ khâu, khóa kéo kim loại có độ mờ và vết xước tự nhiên.',
    sourceNote: 'Unsplash / Backpack Product Photo',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00202',
    filename: 'IMG_00202.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'EXPLORER',
    category: 'Đồ vật',
    difficulty: 'Easy',
    title: 'Balo Học Sinh Vải Canvas Màu Xanh Dường',
    explanation: 'Ảnh AI tạo hình balo. Tổng thể rất nét nhưng phần quai đeo bên trái có đường chỉ tự dưng chui vào bên trong thân balo.',
    sourceNote: 'Generative AI Object Render',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00203',
    filename: 'IMG_00203.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'CHALLENGER',
    category: 'Đồ vật',
    difficulty: 'Medium',
    title: 'Đôi Giày Thể Thao Đỏ Trên Sàn Bê Tông',
    explanation: 'Ảnh chụp thực tế đôi giày Nike. Đường gân đế giày và bóng đổ xéo hoàn toàn tuân theo quang học thực tế.',
    sourceNote: 'Unsplash / Authentic Sneaker Photography',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00204',
    filename: 'IMG_00204.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'CHALLENGER',
    category: 'Đồ vật',
    difficulty: 'Medium',
    title: 'Đôi Giày Running Trắng Bút Lưới Tự Nhiên',
    explanation: 'Ảnh AI Photorealistic. Cấu trúc dây buộc và lỗ xỏ dây cực kỳ khớp, chỉ khi nhìn kỹ chất liệu vải mới thấy mẫu lặp đối xứng hoàn hảo.',
    sourceNote: 'AI Midjourney v6 Shoe Render',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00205',
    filename: 'IMG_00205.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'MASTER',
    category: 'Đồ vật',
    difficulty: 'Hard',
    title: 'Máy Ảnh Cơ Bằng Kim Loại Đặt Trên Sổ Tay',
    explanation: 'Ảnh chụp máy ảnh film cổ thực tế. Các con số tiêu cự và thương hiệu ghim khắc chìm trên kim loại có chiều sâu vật lý.',
    sourceNote: 'Vintage Camera Still Life',
    enabled: true,
    points: 2,
  },
  {
    id: 'IMG_00206',
    filename: 'IMG_00206.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'MASTER',
    category: 'Đồ vật',
    difficulty: 'Hard',
    title: 'Chiếc Máy Ảnh Cổ Điển Trên Bàn Làm Việc',
    explanation: 'Ảnh AI đạt chất lượng Studio đỉnh cao. Không thể khẳng định AI chỉ bằng quan sát mắt thường nếu không có công cụ phân tích kiểm chứng.',
    sourceNote: 'ChatGPT Image Generation / Master Level',
    enabled: true,
    points: 2,
  },

  // ==========================================
  // --- CATEGORY: THIÊN NHIÊN (NATURE) ---
  // ==========================================
  {
    id: 'IMG_00301',
    filename: 'IMG_00301.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'EXPLORER',
    category: 'Thiên nhiên',
    difficulty: 'Easy',
    title: 'Chú Mèo Vàng Nằm Dưới Ánh Nắng Chiều',
    explanation: 'Ảnh thật chụp động vật. Từng sợi lông mèo mềm mại không đều và hạt bụi nhỏ bay trong không khí.',
    sourceNote: 'Unsplash / Pet Photography',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00302',
    filename: 'IMG_00302.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'EXPLORER',
    category: 'Thiên nhiên',
    difficulty: 'Easy',
    title: 'Chú Mèo Xám Đốm Trắng Ngồi Trong Vườn',
    explanation: 'Ảnh AI tạo hình thú cưng. Mặc dù bộ lông rất đẹp nhưng bóng râm dưới bụng mèo lại không ăn khớp với hướng mặt trời.',
    sourceNote: 'AI Animal Generation Model',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00303',
    filename: 'IMG_00303.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'CHALLENGER',
    category: 'Thiên nhiên',
    difficulty: 'Medium',
    title: 'Dãy Núi Hùng Vĩ Lúc BÌnh Minh',
    explanation: 'Ảnh thật thiên nhiên chụp bằng DSLR chuyên nghiệp. Mây và ánh sáng mặt trời phản chiếu tự nhiên trên các vách đá.',
    sourceNote: 'Unsplash / Mountain Landscape',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00304',
    filename: 'IMG_00304.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'CHALLENGER',
    category: 'Thiên nhiên',
    difficulty: 'Medium',
    title: 'Hồ Nước Trong Xanh Giữa Rừng Thông',
    explanation: 'Ảnh AI phong cảnh sông núi photorealistic. Mặt nước phản chiếu bóng núi rất thật nhưng sóng nước đối xứng lạ mắt.',
    sourceNote: 'Photorealistic AI Landscape',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00305',
    filename: 'IMG_00305.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'MASTER',
    category: 'Thiên nhiên',
    difficulty: 'Hard',
    title: 'Cánh Đồng Sương Mù Trong Nắng Sớm',
    explanation: 'Ảnh thật tài liệu địa lý. Lớp sương mờ dốc núi mờ dần theo độ xa chính xác hiệu ứng khí quyển.',
    sourceNote: 'National Geographic Style Real Photo',
    enabled: true,
    points: 2,
  },
  {
    id: 'IMG_00306',
    filename: 'IMG_00306.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'MASTER',
    category: 'Thiên nhiên',
    difficulty: 'Hard',
    title: 'Thung Lũng Xanh Tươi Dưới Ánh Nắng Vàng',
    explanation: 'Ảnh AI cực kỳ hoàn hảo. Đây là ví dụ cho thấy ảnh AI ngày nay đã đạt tới mức gần như không thể phát hiện nếu chỉ dùng mắt thường.',
    sourceNote: 'AI Master Photorealistic Nature',
    enabled: true,
    points: 2,
  },

  // ==========================================
  // --- CATEGORY: KIẾN TRÚC (ARCHITECTURE) ---
  // ==========================================
  {
    id: 'IMG_00401',
    filename: 'IMG_00401.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'EXPLORER',
    category: 'Kiến trúc',
    difficulty: 'Easy',
    title: 'Hành Lang Thư Viện Trường Học',
    explanation: 'Ảnh thật chụp thư viện. Các dãy sách, bóng đèn trần và gạch lát sàn nối tiếp chuẩn khung cảnh đời thường.',
    sourceNote: 'School Library Interior Photography',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00402',
    filename: 'IMG_00402.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'EXPLORER',
    category: 'Kiến trúc',
    difficulty: 'Easy',
    title: 'Phòng Đọc Sách Cổ Kính Bằng Gỗ',
    explanation: 'Ảnh AI sinh kiến trúc. Mặc dù khung cảnh rất thơ mộng nhưng kệ sách ở tít góc xa gộp vào tường không có khe mở.',
    sourceNote: 'AI Interior Architecture Generation',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00403',
    filename: 'IMG_00403.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'CHALLENGER',
    category: 'Kiến trúc',
    difficulty: 'Medium',
    title: 'Căn Phòng Ngập Ánh Sáng Cửa Sổ Kính',
    explanation: 'Ảnh thật căn phòng hiện đại. Khung cửa sổ, ổ cắm điện và các chi tiết nội thất có vết xước sử dụng thực tế.',
    sourceNote: 'Unsplash / Interior Living Room',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00404',
    filename: 'IMG_00404.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'CHALLENGER',
    category: 'Kiến trúc',
    difficulty: 'Medium',
    title: 'Ngôi Nhà Hiện Đại Giữa Khu Vườn Xanh',
    explanation: 'Ảnh AI thiết kế nhà mẫu photorealistic. Bố cục ánh sáng hoàn hảo tuyệt đối giống như render 3D chuyên nghiệp.',
    sourceNote: 'AI Architectural Render',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00405',
    filename: 'IMG_00405.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'MASTER',
    category: 'Kiến trúc',
    difficulty: 'Hard',
    title: 'Tòa Nhà Kính Hiện Đại Chiếu Bóng Bầu Trời',
    explanation: 'Ảnh thật tòa nhà chọc trời. Phản chiếu mây trên kính có độ méo khúc xạ bề mặt thủy thực.',
    sourceNote: 'Skyscraper Architectural Photography',
    enabled: true,
    points: 2,
  },
  {
    id: 'IMG_00406',
    filename: 'IMG_00406.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'MASTER',
    category: 'Kiến trúc',
    difficulty: 'Hard',
    title: 'Tòa Biệt Thự Trắng Sang Trọng Trong Đêm',
    explanation: 'Ảnh AI chất lượng siêu thực. Bằng quan sát thông thường, ngay cả chuyên gia cũng khó phân biệt đây là AI hay ảnh chụp quảng cáo bất động sản.',
    sourceNote: 'AI Villa Photorealistic Generation',
    enabled: true,
    points: 2,
  },

  // ==========================================
  // --- CATEGORY: ẨM THỰC (FOOD & DRINK) ---
  // ==========================================
  {
    id: 'IMG_00501',
    filename: 'IMG_00501.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'EXPLORER',
    category: 'Ẩm thực',
    difficulty: 'Easy',
    title: 'Tách Cà Phê Latte Trên Bàn Gỗ',
    explanation: 'Ảnh thật tách cà phê. Bọt sữa nghiêng nhẹ tự nhiên, mặt bàn gỗ có vết xước gỗ đời thực.',
    sourceNote: 'Unsplash / Real Coffee Photo',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00502',
    filename: 'IMG_00502.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'EXPLORER',
    category: 'Ẩm thực',
    difficulty: 'Easy',
    title: 'Ly Cà Phê Nóng Bốc Khói Nhẹ Buổi Sáng',
    explanation: 'Ảnh AI sinh đồ uống. Làn khói bốc lên mượt mà nhưng quai tách cà phê hơi dẹp bất thường ở góc dính vào thành tách.',
    sourceNote: 'Generative AI Food Photo',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00503',
    filename: 'IMG_00503.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'CHALLENGER',
    category: 'Ẩm thực',
    difficulty: 'Medium',
    title: 'Bánh Pizza Phô Mai Nóng Hổi',
    explanation: 'Ảnh chụp món ăn thực tế. Phô Mai kéo sợi và độ nướng cháy xém viền bánh không đồng đều tự nhiên.',
    sourceNote: 'Real Food Photography / Pizza',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00504',
    filename: 'IMG_00504.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'CHALLENGER',
    category: 'Ẩm thực',
    difficulty: 'Medium',
    title: 'Chiếc Bánh Pizza Mới Nướng Bắt Mắt',
    explanation: 'Ảnh AI tạo hình món ăn vô cùng hấp dẫn. Các miếng pepperoni được rải hoàn hảo như trong quảng cáo.',
    sourceNote: 'AI Food Styling Render',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00505',
    filename: 'IMG_00505.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'MASTER',
    category: 'Ẩm thực',
    difficulty: 'Hard',
    title: 'Tô Mì Ramen Nóng Hổi Với Trứng Lòng Đào',
    explanation: 'Ảnh chụp món ăn thực tế tại nhà hàng. Giọt dầu nổi trên nước dùng và lát thịt xá xíu có thớ thịt thực tế.',
    sourceNote: 'Authentic Ramen Noodle Photo',
    enabled: true,
    points: 2,
  },
  {
    id: 'IMG_00506',
    filename: 'IMG_00506.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'MASTER',
    category: 'Ẩm thực',
    difficulty: 'Hard',
    title: 'Món Mì Nóng Hổi Đầy Đặn Gia Vị',
    explanation: 'Ảnh AI món ăn cực kỳ sống động. Độ bóng của nước sốt và hành lá tươi ngon khiến người xem khó nhận ra đây là tác phẩm trí tuệ nhân tạo.',
    sourceNote: 'AI Master Culinary Render',
    enabled: true,
    points: 2,
  },

  // ==========================================
  // --- CATEGORY: CÔNG NGHỆ (TECH) ---
  // ==========================================
  {
    id: 'IMG_00601',
    filename: 'IMG_00601.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'EXPLORER',
    category: 'Công nghệ',
    difficulty: 'Easy',
    title: 'Chiếc Laptop Đặt Trên Bàn Làm Việc',
    explanation: 'Ảnh chụp laptop thực tế. Bàn phím có ký tự rõ ràng, vết vân tay mờ nhẹ trên vỏ kim loại.',
    sourceNote: 'Real Laptop Product Photography',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00602',
    filename: 'IMG_00602.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'EXPLORER',
    category: 'Công nghệ',
    difficulty: 'Easy',
    title: 'Laptop Hiện Đại Mỏng Nhẹ Nhôm Nguyên Khối',
    explanation: 'Ảnh AI tạo sản phẩm công nghệ. Mặc dù máy rất đẹp nhưng hàng phím chức năng F1-F12 bị thiếu mất nút Escape.',
    sourceNote: 'Generative AI Tech Render',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00603',
    filename: 'IMG_00603.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'CHALLENGER',
    category: 'Công nghệ',
    difficulty: 'Medium',
    title: 'Phòng Máy Tính Trường Học Giờ Thực Hành',
    explanation: 'Ảnh chụp thực tế phòng lap máy tính. Dây cáp mạng, màn hình và nhãn dán thiết bị đầy đủ thực tế.',
    sourceNote: 'Computer Lab Real Photo',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00604',
    filename: 'IMG_00604.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'CHALLENGER',
    category: 'Công nghệ',
    difficulty: 'Medium',
    title: 'Dòng Mã Lập Trình Trên Màn Hình Máy Tính',
    explanation: 'Ảnh AI tạo code trên màn hình. Các dòng chữ trông mờ ảo như ma trận nhưng các chữ cái bị biến dạng khi soi gần.',
    sourceNote: 'AI Tech Code Concept',
    enabled: true,
    points: 1,
  },
  {
    id: 'IMG_00605',
    filename: 'IMG_00605.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    sourceType: 'real',
    level: 'MASTER',
    category: 'Công nghệ',
    difficulty: 'Hard',
    title: 'Mô Hình Robot Thông Minh Trong Phòng Thử Nghiệm',
    explanation: 'Ảnh chụp thực tế mẫu robot thử nghiệm trong phòng lab khoa học.',
    sourceNote: 'Real Robotics Lab Photography',
    enabled: true,
    points: 2,
  },
  {
    id: 'IMG_00606',
    filename: 'IMG_00606.jpg',
    contentUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    sourceType: 'ai',
    level: 'MASTER',
    category: 'Công nghệ',
    difficulty: 'Hard',
    title: 'Mô Hình Trí Tuệ Nhân Tạo Thiết Kế Tương Lai',
    explanation: 'Ảnh AI chất lượng siêu nét. Độ bóng mịn và ánh sáng neon được render chuyên nghiệp đến từng chi tiết nhỏ.',
    sourceNote: 'AI High Fidelity Tech Render',
    enabled: true,
    points: 2,
  },
];

const LOCAL_STORAGE_KEY = 'ai_quest_game1_dataset_v2';
const LRU_HISTORY_KEY = 'ai_quest_game1_lru_history';

class DatasetManager {
  private dataset: DatasetImage[] = [];

  constructor() {
    this.loadDataset();
  }

  public loadDataset(): DatasetImage[] {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 10) {
          this.dataset = parsed;
          return this.dataset;
        }
      }
    } catch (e) {
      console.warn('Could not load stored dataset, resetting to initial dataset:', e);
    }
    this.dataset = [...INITIAL_DATASET];
    this.saveDataset();
    return this.dataset;
  }

  public saveDataset(): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.dataset));
    } catch (e) {
      console.error('Failed to save dataset to localStorage:', e);
    }
  }

  public getAllImages(): DatasetImage[] {
    return this.dataset;
  }

  public addImage(image: DatasetImage): void {
    this.dataset.unshift(image);
    this.saveDataset();
  }

  public updateImage(id: string, updates: Partial<DatasetImage>): void {
    this.dataset = this.dataset.map((img) => (img.id === id ? { ...img, ...updates } : img));
    this.saveDataset();
  }

  public deleteImage(id: string): void {
    this.dataset = this.dataset.filter((img) => img.id !== id);
    this.saveDataset();
  }

  public resetToDefault(): void {
    this.dataset = [...INITIAL_DATASET];
    this.saveDataset();
    localStorage.removeItem(LRU_HISTORY_KEY);
  }

  // LRU Anti-Repetition tracking
  private getLRUHistory(): string[] {
    try {
      const stored = localStorage.getItem(LRU_HISTORY_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('LRU history load error', e);
    }
    return [];
  }

  private saveLRUHistory(ids: string[]): void {
    try {
      localStorage.setItem(LRU_HISTORY_KEY, JSON.stringify(ids.slice(-30)));
    } catch (e) {
      console.warn('LRU history save error', e);
    }
  }

  // Generate 4-5 balanced questions for Game 1 session
  public getQuestionsForSession(level: 'EXPLORER' | 'CHALLENGER' | 'MASTER' | 'MIXED'): DatasetImage[] {
    const enabledImages = this.dataset.filter((img) => img.enabled);
    const history = this.getLRUHistory();

    let candidatePool = enabledImages;

    if (level !== 'MIXED') {
      candidatePool = enabledImages.filter((img) => img.level === level);
      if (candidatePool.length < 4) {
        candidatePool = enabledImages; // Fallback if filtered pool is too small
      }
    }

    // Filter out recently used images if possible
    let freshPool = candidatePool.filter((img) => !history.includes(img.id));
    if (freshPool.length < 4) {
      freshPool = candidatePool; // Reset if fresh items exhausted
    }

    // Separate Real and AI candidates
    const realCandidates = freshPool.filter((img) => img.sourceType === 'real');
    const aiCandidates = freshPool.filter((img) => img.sourceType === 'ai');

    // Shuffle helper
    const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

    const shuffledReal = shuffle(realCandidates.length > 0 ? realCandidates : enabledImages.filter((i) => i.sourceType === 'real'));
    const shuffledAI = shuffle(aiCandidates.length > 0 ? aiCandidates : enabledImages.filter((i) => i.sourceType === 'ai'));

    // Pick 2 Real and 2 AI for a perfect 4-question balanced session
    const selectedReal = shuffledReal.slice(0, 2);
    const selectedAI = shuffledAI.slice(0, 2);

    let sessionQuestions = shuffle([...selectedReal, ...selectedAI]);

    // In MIXED mode, order questions by difficulty: Easy -> Medium -> Medium -> Hard
    if (level === 'MIXED') {
      const difficultyOrder: Record<string, number> = { Easy: 1, Medium: 2, Hard: 3 };
      sessionQuestions.sort((a, b) => (difficultyOrder[a.difficulty] || 2) - (difficultyOrder[b.difficulty] || 2));
    }

    // Assign 2 points to the last (final decision) question
    sessionQuestions = sessionQuestions.map((q, idx) => ({
      ...q,
      points: idx === sessionQuestions.length - 1 ? 2 : 1,
    }));

    // Update LRU history
    const newHistory = [...history, ...sessionQuestions.map((q) => q.id)];
    this.saveLRUHistory(newHistory);

    return sessionQuestions;
  }
}

export const datasetManager = new DatasetManager();
