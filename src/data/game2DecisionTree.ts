import { DetectiveCategory, DetectiveAIResponse, DetectiveHistoryItem, GameLevel } from '../types';

export const DETECTIVE_CATEGORIES: DetectiveCategory[] = [
  // Explorer (Tiểu học)
  {
    id: 'animal',
    name: '🐶 Con vật',
    icon: '🐶',
    level: ['EXPLORER', 'MIXED'],
    examples: [
      'Con mèo', 'Con chó', 'Con voi', 'Con đại bàng', 'Con cá heo',
      'Con gấu trúc', 'Con thỏ', 'Con sư tử', 'Con hổ', 'Con hươu cao cổ',
      'Con chim cánh cụt', 'Con khỉ', 'Con sóc', 'Con vịt', 'Con ngựa',
      'Con rùa', 'Con chim bói cá', 'Con ong', 'Con chuồn chuồn', 'Con cá vàng'
    ]
  },
  {
    id: 'food',
    name: '🍎 Đồ ăn / Món ăn',
    icon: '🍎',
    level: ['EXPLORER', 'MIXED'],
    examples: [
      'Phở', 'Bánh mì', 'Kem', 'Pizza', 'Trà sữa',
      'Cơm tấm', 'Bún chả', 'Xôi xéo', 'Bánh cuốn', 'Hủ tiếu',
      'Bánh chưng', 'Bánh rán', 'Chè trôi nước', 'Sữa chua', 'Gà rán',
      'Mì xào', 'Trái cây dầm', 'Bánh mì que', 'Nước mía', 'Xúc xích'
    ]
  },
  {
    id: 'object',
    name: '🎒 Đồ vật học tập',
    icon: '🎒',
    level: ['EXPLORER', 'MIXED'],
    examples: [
      'Cây bút', 'Cuốn sách', 'Thước kẻ', 'Cặp sách', 'Máy tính bỏ túi',
      'Cục tẩy', 'Bút màu', 'Hộp bút', 'Bảng con', 'Băng dính',
      'Kéo thủ công', 'Giấy thủ công', 'Đèn học', 'Hồ dán', 'Phấn viết',
      'Vở ghi bài', 'Bút dạ quang', 'Gọt bút chì', 'Compas', 'Đồng hồ báo thức'
    ]
  },
  {
    id: 'vehicle',
    name: '🚗 Phương tiện',
    icon: '🚗',
    level: ['EXPLORER', 'MIXED'],
    examples: [
      'Xe đạp', 'Xe máy', 'Máy bay', 'Tàu hỏa', 'Tàu vũ trụ',
      'Xe buýt', 'Xe ô tô', 'Tàu thủy', 'Xe đạp điện', 'Xe cứu hỏa',
      'Xe cảnh sát', 'Tàu ngầm', 'Trực thăng', 'Xe trượt scooter', 'Xe cần cẩu',
      'Tàu điện trên cao', 'Cano', 'Khí cầu', 'Xe xích xích', 'Tên lửa'
    ]
  },

  // Challenger (THCS)
  {
    id: 'job',
    name: '👨‍⚕️ Nghề nghiệp',
    icon: '👨‍⚕️',
    level: ['CHALLENGER', 'MIXED'],
    examples: [
      'Bác sĩ', 'Giáo viên', 'Phi hành gia', 'Cảnh sát', 'Lập trình viên',
      'Họa sĩ', 'Nhà khoa học', 'Nhà báo', 'Kiến trúc sư', 'Luật sư',
      'Nhiếp ảnh gia', 'Đầu bếp', 'Nha sĩ', 'Nhà văn', 'Ca sĩ',
      'Phi công', 'Kỹ sư điện', 'Vận động viên', 'Nhà thiết kế', 'Thợ kim hoàn'
    ]
  },
  {
    id: 'game',
    name: '🎮 Trò chơi / Thể thao',
    icon: '🎮',
    level: ['CHALLENGER', 'MIXED'],
    examples: [
      'Bóng đá', 'Cờ vua', 'Minecraft', 'Cầu lông', 'Trốn tìm',
      'Bóng rổ', 'Bơi lội', 'Cờ tướng', 'Roblox', 'Bóng bàn',
      'Bóng chuyền', 'Chạy việt dãn', 'Bắn cung', 'Trượt ván', 'Võ thuật',
      'Lướt sóng', 'Leo núi', 'Nhảy dây', 'Đá cầu', 'Bida'
    ]
  },
  {
    id: 'device',
    name: '💻 Thiết bị công nghệ',
    icon: '💻',
    level: ['CHALLENGER', 'MIXED'],
    examples: [
      'Điện thoại', 'Laptop', 'Kính VR', 'Robot hút bụi', 'Đồng hồ thông minh',
      'Máy chiếu', 'Tai nghe Bluetooth', 'Loa thông minh', 'Máy ảnh cơ', 'Flycam',
      'Máy chơi game Console', 'Máy tính bảng', 'Bàn phím cơ', 'Sạc dự phòng', 'Chuột không dây',
      'Ổ cứng di động', 'Thẻ nhớ SD', 'Kính thiên văn số', 'Máy in 3D', 'Vòng đeo sức khỏe'
    ]
  },
  {
    id: 'character',
    name: '🎬 Nhân vật hoạt hình',
    icon: '🎬',
    level: ['CHALLENGER', 'MIXED'],
    examples: [
      'Doraemon', 'Conan', 'Spider-Man', 'Pikachu', 'Elsa',
      'Naruto', 'Luffy', 'Batman', 'Iron Man', 'Minion',
      'Tom & Jerry', 'SpongeBob', 'Mickey Mouse', 'Shrek', 'Son Goku',
      'Simba', 'Panda Po', 'Baymax', 'Wall-E', 'Stitch'
    ]
  },

  // Master (THPT)
  {
    id: 'tech',
    name: '🤖 Công nghệ AI & Số',
    icon: '🤖',
    level: ['MASTER', 'MIXED'],
    examples: [
      'ChatGPT', 'Trí tuệ nhân tạo', 'Robot', 'Xe tự lái', 'Blockchain',
      'Big Data', 'Điện toán đám mây', 'Cybersecurity', 'Machine Learning', 'Deep Learning',
      'Virtual Reality', 'Augmented Reality', 'DALL-E', 'Gemini AI', 'Metaverse',
      'Internet of Things', 'Dữ liệu lớn', 'Nhận diện khuôn mặt', 'Xử lý ngôn ngữ tự nhiên', 'Mạng thần kinh'
    ]
  },
  {
    id: 'science',
    name: '🔬 Khái niệm Khoa học',
    icon: '🔬',
    level: ['MASTER', 'MIXED'],
    examples: [
      'Hố đen', 'ADN', 'Nguyên tử', 'Trọng lực', 'Quang hợp',
      'Sóng hấp dẫn', 'Lượng tử', 'Tốc độ ánh sáng', 'Bảng tuần hoàn', 'Phản ứng hạt nhân',
      'Gen di truyền', 'Đột biến', 'Thế năng', 'Điện từ trường', 'Sự dãn nở vũ trụ',
      'Nhà kính khí quyển', 'Hằng số Planck', 'Phương trình Einstein', 'Áp suất khí quyển', 'Thủy triều'
    ]
  },
  {
    id: 'concept',
    name: '🧠 Khái niệm Tương lai',
    icon: '🧠',
    level: ['MASTER', 'MIXED'],
    examples: [
      'Du hành thời gian', 'Thành phố thông minh', 'Năng lượng xanh', 'Trạm vũ trụ', 'Thành phố Mars',
      'Động cơ Plasma', 'In sinh học 3D nội tạng', 'Chuyển dịch tức thời', 'Kính thông minh AR', 'Ô tô bay',
      'Robot Y tế', 'Pin Mặt Trời thế hệ mới', 'Thịt nhân tạo', 'Thế giới ảo song song', 'Dấu chân Carbon',
      'Chíp cấy não', 'Nông nghiệp thẳng đứng', 'Du lịch vũ trụ', 'Mạng 6G', 'Cảng hàng không vũ trụ'
    ]
  }
];

export function getCategoriesForLevel(level: GameLevel): DetectiveCategory[] {
  if (level === 'MIXED') return DETECTIVE_CATEGORIES;
  return DETECTIVE_CATEGORIES.filter((c) => c.level.includes(level) || c.level.includes('MIXED'));
}

export function getDemoDetectiveNextStep(
  categoryName: string,
  history: DetectiveHistoryItem[]
): DetectiveAIResponse {
  const qCount = history.length;

  if (qCount === 0) {
    if (categoryName.includes('Con vật')) {
      return { type: 'question', text: 'Đối tượng này có 4 chân và sống trên mặt đất không?' };
    }
    if (categoryName.includes('Đồ ăn')) {
      return { type: 'question', text: 'Đây có phải là món ăn mặn hay món chính trong bữa ăn không?' };
    }
    if (categoryName.includes('Nghề nghiệp')) {
      return { type: 'question', text: 'Nghề này có làm việc trong môi trường bệnh viện hay trường học không?' };
    }
    if (categoryName.includes('Công nghệ') || categoryName.includes('Thiết bị')) {
      return { type: 'question', text: 'Thiết bị hay công nghệ này có thể cầm trên tay được không?' };
    }
    return { type: 'question', text: 'Đối tượng này có kích thước lớn hơn một chiếc cặp sách không?' };
  }

  const lastAns = history[history.length - 1].answer;

  if (qCount === 1) {
    if (lastAns === 'YES') {
      return { type: 'question', text: 'Đối tượng này có rất phổ biến trong đời sống hàng ngày ở Việt Nam không?' };
    } else {
      return { type: 'question', text: 'Đối tượng này có liên quan đến nước, bầu trời hoặc không gian không?' };
    }
  }

  if (qCount === 2) {
    return { type: 'question', text: 'Học sinh thường hay tiếp xúc hoặc nhìn thấy đối tượng này ở trường học không?' };
  }

  if (qCount === 3) {
    return { type: 'question', text: 'Đối tượng này có phát ra tiếng động hoặc sử dụng điện năng / pin không?' };
  }

  if (qCount === 4) {
    return { type: 'question', text: 'Mọi người có thể mua hoặc sở hữu đối tượng này một cách dễ dàng không?' };
  }

  if (qCount === 5) {
    return { type: 'question', text: 'Có phải đối tượng này mang lại niềm vui hoặc giúp ích rất nhiều cho việc học tập/cuộc sống?' };
  }

  // Question 6 or 7 -> Make educated guess
  if (categoryName.includes('Con vật')) {
    return lastAns === 'YES'
      ? { type: 'guess', text: '🐶 Chú Mèo hoặc Chú Chó cưng', confidence: 92 }
      : { type: 'guess', text: '🦅 Chú Chim Đại Bàng hoặc Voi lớn', confidence: 88 };
  }
  if (categoryName.includes('Đồ ăn')) {
    return { type: 'guess', text: '🍜 Món Phở Việt Nam nóng hổi', confidence: 95 };
  }
  if (categoryName.includes('Nghề nghiệp')) {
    return { type: 'guess', text: '👨‍🏫 Bác sĩ hoặc Giáo viên', confidence: 90 };
  }
  if (categoryName.includes('Thiết bị') || categoryName.includes('Công nghệ')) {
    return { type: 'guess', text: '🤖 Robot thông minh / AI Assistant', confidence: 94 };
  }

  return { type: 'guess', text: '🚀 Trí Tuệ Nhân Tạo (AI) hoặc Máy Tính Tương Lai', confidence: 91 };
}
