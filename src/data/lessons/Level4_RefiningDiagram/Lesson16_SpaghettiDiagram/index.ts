export const LESSON_DATA = [
  {
    type: 'theory', phase: 'learning',
    title: 'Tránh lỗi chồng chéo (Spaghetti Diagram)',
    subtitle: 'Nghệ thuật sắp xếp bố cục sơ đồ.',
    image: null,
    explanation: [
      { text: "Khi dự án lớn lên với hàng chục Use Case và Actor, biểu đồ của bạn rất dễ biến thành một đĩa Spaghetti - các đường thẳng cắt chéo nhau chằng chịt, không thể đọc nổi." },
      { text: "Biểu đồ Use Case sinh ra là để GIAO TIẾP. Nếu không ai đọc hiểu, thì nó thất bại." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Decomposition (Chia để trị)',
    question: 'Hệ thống ERP có 50 module (Kế toán, Nhân sự, Kho...). Cách tốt nhất để vẽ là?',
    options: [
      { id: 'opt1', label: 'Vẽ 1 biểu đồ Tổng quan chứa các Package. Sau đó vẽ các sơ đồ chi tiết riêng lẻ cho từng Module.', isCorrect: true, hint: 'Chính xác! Đừng nhồi nhét tất cả vào 1 hình.' },
      { id: 'opt2', label: 'Dùng màn hình to và vẽ toàn bộ vào 1 sơ đồ khổng lồ.', isCorrect: false, hint: 'Sẽ trở thành một mớ bòng bong không thể đọc.' }
    ],
    explanation: [ { text: "Sử dụng khái niệm Package để đóng gói các Use Case có liên quan." } ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Bố cục (Layouting)',
    question: 'Khi xếp vị trí Actor và Use Case trên hình, chiến lược nào giảm cắt chéo?',
    options: [
      { id: 'opt1', label: 'Đặt các Actor chính ở bên trái, các Use Case tương ứng của họ xếp theo cụm gần họ.', isCorrect: true, hint: 'Đúng! Gom cụm (clustering) không gian vật lý rất quan trọng.' },
      { id: 'opt2', label: 'Sắp xếp Use Case ngẫu nhiên theo thứ tự nghĩ ra.', isCorrect: false, hint: 'Cách này sẽ khiến đường nối đan chéo nhau.' }
    ],
    explanation: [ { text: "Hãy tưởng tượng luồng kéo dài từ Trái sang Phải, đặt Actor gần với nhóm Use Case của họ nhất." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Chốt kiến thức: Spaghetti Diagram',
    subtitle: 'Bí kíp dọn dẹp',
    image: null,
    explanation: [
      { text: "1. Tách sơ đồ theo Module." },
      { text: "2. Kế thừa Actor để giảm đường nối." },
      { text: "3. Sắp xếp vị trí không gian thông minh." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Kế thừa để giảm rối',
    question: '5 loại nhân viên khác nhau đều phải Đăng nhập, Đổi mật khẩu. Biểu đồ đang có 10 đường cắt chéo. Làm sao để dọn dẹp?',
    options: [
      { id: 'opt1', label: 'Tạo Actor cha "Nhân viên", cho 5 loại nhân viên kế thừa. Kéo 1 đường từ Actor cha đến Đăng nhập, 1 đường đến Đổi MK.', isCorrect: true, hint: 'Từ 10 đường nối giảm xuống chỉ còn 2 đường chính! Rất gọn.' },
      { id: 'opt2', label: 'Chỉ vẽ 1 Actor là đủ, xóa 4 loại kia.', isCorrect: false, hint: 'Làm mất đi tính chính xác về phân quyền các chức năng khác.' }
    ],
    explanation: [ { text: "Generalization (Kế thừa) là vũ khí lợi hại nhất để chống lại Spaghetti." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Kết thúc bài học',
    subtitle: 'Sẵn sàng Test Skill',
    image: null,
    explanation: [
      { text: "Cùng làm 3 câu trắc nghiệm cuối cùng về cách dọn dẹp sơ đồ rối rắm." }
    ]
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 1/3',
    question: 'Giải pháp tốt nhất để tránh sơ đồ Use Case mạng nhện cho hệ thống lớn?',
    options: [
      { id: 'opt1', label: 'Chia nhỏ (Decomposition) theo Package/Phân hệ.', isCorrect: true },
      { id: 'opt2', label: 'Sử dụng màu sắc sặc sỡ cho các đường nối để dễ phân biệt.', isCorrect: false }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 2/3',
    question: 'Để tránh chồng chéo đường thẳng, Primary Actor thường đặt ở đâu?',
    options: [
      { id: 'opt1', label: 'Giữa System Boundary (Ranh giới hệ thống).', isCorrect: false },
      { id: 'opt2', label: 'Ngoài cùng bên trái của System Boundary.', isCorrect: true }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 3/3',
    question: 'Mục đích tối thượng của sơ đồ Use Case là gì?',
    options: [
      { id: 'opt1', label: 'Để giao tiếp, giúp mọi bên liên quan (dù không rành kỹ thuật) đều dễ dàng đọc hiểu chức năng hệ thống.', isCorrect: true },
      { id: 'opt2', label: 'Để làm tài liệu thiết kế cơ sở dữ liệu chi tiết cho lập trình viên.', isCorrect: false }
    ],
    explanation: []
  }
];
