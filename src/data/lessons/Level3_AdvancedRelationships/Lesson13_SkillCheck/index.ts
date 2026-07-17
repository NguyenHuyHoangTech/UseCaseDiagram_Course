export const LESSON_DATA = [
  // 1. Màn hình Khởi động
  {
    type: 'splash',
    title: 'Skill check',
    subtitle: 'Kiểm tra Kỹ năng Level 3',
    theme: 'dark',
    icon: 'SplashIconSVG'
  },
  
  // 2. Câu 1: Trận chiến Nét đứt (MCQ)
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 1: Trận chiến Nét đứt',
    question: "Trong hệ thống học tập Cóc Cam Anki, sinh viên đang sử dụng chức năng ( Ôn tập Thẻ ). Thỉnh thoảng, nếu gặp thẻ quá khó, họ sẽ dùng thêm chức năng ( Đánh dấu Thẻ Đỏ ). Mối quan hệ giữa 2 chức năng này là gì?",
    options: [
      { id: 'a', label: 'A. ( Ôn tập Thẻ ) ➔ <<include>> ➔ ( Đánh dấu Thẻ Đỏ )', isCorrect: false },
      { id: 'b', label: 'B. ( Đánh dấu Thẻ Đỏ ) ➔ <<extend>> ➔ ( Ôn tập Thẻ )', isCorrect: true },
      { id: 'c', label: 'C. Hai chức năng này phải giao tiếp bằng nét liền (Association).', isCorrect: false }
    ],
    explanation: [
      { text: "Đánh dấu thẻ khó là một hành động mang tính TÙY CHỌN, chỉ xảy ra ở một số điều kiện nhất định. Do đó, nó phải là <<extend>> và mũi tên phải cắm TỪ tính năng phụ (Đánh dấu) NGƯỢC VỀ tính năng gốc (Ôn tập)." }
    ]
  },

  // 3. Câu 2: Cảnh sát bắt lỗi UML (Visual Select Edge)
  {
    type: 'skill_check',
    interactionType: 'visual_select_edge',
    title: 'Câu 2: Cảnh sát bắt lỗi UML',
    question: 'Một kỹ sư mới vào nghề đã dùng sai mục đích của các đường nối nét đứt. Hãy chạm vào khối đang vi phạm luật UML để xóa nó!',
    edges: [
      { id: 'e1', left: { label: 'Mua hàng', type: 'usecase' }, right: { label: 'Thanh toán', type: 'usecase' }, edgeType: 'include', isCorrect: false },
      { id: 'e2', left: { label: 'Hiển thị lỗi', type: 'usecase' }, right: { label: 'Đăng nhập', type: 'usecase' }, edgeType: 'extend', isCorrect: false },
      { id: 'e3', left: { label: 'Database Oracle', type: 'actor' }, right: { label: 'Truy vấn dữ liệu', type: 'usecase' }, edgeType: 'include', isCorrect: true }
    ],
    explanation: [
      { text: "Các mũi tên nét đứt có chữ <<include>> hoặc <<extend>> CHỈ được dùng để kết nối giữa 2 Use Case với nhau. Tuyệt đối không dùng để kết nối Actor (như Database) với Use Case!" }
    ]
  },

  // 4. Câu 3: Kế thừa Đa hình (Equation Builder - Fill in the blank)
  {
    type: 'skill_check',
    interactionType: 'equation_builder',
    title: 'Câu 3: Kế thừa Đa hình',
    question: 'Thiết lập cấu trúc Kế thừa chuẩn xác để tránh việc phải cấp quyền thủ công lặp đi lặp lại cho các User.',
    slots: 3,
    options: [
      { id: 'admin', label: 'Quản trị viên', type: 'actor' },
      { id: 'user', label: 'Người dùng cơ bản', type: 'actor' },
      { id: 'gen', label: '▷', type: 'operator' }
    ],
    correctOrder: ['admin', 'gen', 'user'],
    explanation: [
      { text: "Mũi tên Kế thừa (tam giác rỗng) luôn chỉ từ Lớp Con lên Lớp Cha. Admin chĩa mũi tên kế thừa lên User để hưởng toàn bộ các tính năng gốc (như Đăng nhập) mà không cần vẽ lại." }
    ]
  },

  // 5. Câu 4: Cú lừa hướng mũi tên (Visual Select Edge)
  {
    type: 'skill_check',
    interactionType: 'visual_select_edge',
    title: 'Câu 4: Cú lừa hướng mũi tên',
    question: 'Radar phát hiện một mũi tên rẽ nhánh đang đâm SAI CHIỀU. Hãy chạm vào nó để cắt đứt mạch lỗi này!',
    edges: [
      { id: 'e1', left: { label: 'Xác thực OTP', type: 'usecase' }, right: { label: 'Đăng nhập', type: 'usecase' }, edgeType: 'extend', isCorrect: false },
      { id: 'e2', left: { label: 'Checkout', type: 'usecase' }, right: { label: 'Xử lý Thanh toán', type: 'usecase' }, edgeType: 'include', isCorrect: false },
      { id: 'e3', left: { label: 'Tải File lên', type: 'usecase' }, right: { label: 'Báo lỗi File quá lớn', type: 'usecase' }, edgeType: 'extend', isCorrect: true }
    ],
    explanation: [
      { text: "Tính năng gốc ( Tải File lên ) không hề biết trước việc file có quá lớn hay không. Khối ( Báo lỗi ) đóng vai trò là Tính năng mở rộng, mũi tên phải xuất phát TỪ nó và CẮM NGƯỢC LẠI vào Tính năng gốc." }
    ]
  }
];
