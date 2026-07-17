export const LESSON_DATA = [
  {
    type: 'theory', phase: 'learning',
    title: 'Kỹ thuật trích xuất từ khóa',
    subtitle: 'Nhặt ra đúng các thành phần từ Requirement dài dòng.',
    image: null,
    explanation: [
      { text: "Khách hàng thường viết yêu cầu (Requirement) rất dài, xen lẫn cả cảm xúc, quy trình kinh doanh, và đôi khi cả cách họ muốn giao diện trông như thế nào." },
      { text: "Kỹ thuật gạch chân từ khóa: Danh từ -> Actor. Cụm động từ -> Use Case." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Gạch chân',
    question: 'Câu: "Quản trị viên cần duyệt bài viết mới mỗi ngày". Đâu là Actor và Use Case?',
    options: [
      { id: 'opt1', label: 'Actor: Quản trị viên, Use Case: Duyệt bài viết', isCorrect: true, hint: 'Rất chính xác!' },
      { id: 'opt2', label: 'Actor: Bài viết, Use Case: Mới mỗi ngày', isCorrect: false, hint: 'Bài viết không phải là tác nhân chủ động.' }
    ],
    explanation: [ { text: "Chủ ngữ (người/hệ thống) là Actor, động từ là Use Case." } ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Lọc nhiễu UI',
    question: 'Câu: "Khách hàng click vào nút Đăng ký màu xanh và hệ thống sẽ hiển thị popup". Chọn Use Case đúng:',
    options: [
      { id: 'opt1', label: 'Click nút màu xanh', isCorrect: false, hint: 'Đây là chi tiết giao diện UI, hãy loại bỏ nó.' },
      { id: 'opt2', label: 'Đăng ký', isCorrect: true, hint: 'Đúng! Use Case chỉ tập trung vào mục tiêu kinh doanh.' }
    ],
    explanation: [ { text: "Loại bỏ mọi mô tả về màu sắc, nút bấm, màn hình." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Chốt kiến thức: Trích xuất',
    subtitle: 'Nguyên tắc VÀNG',
    image: null,
    explanation: [
      { text: "Use Case trả lời câu hỏi HỆ THỐNG LÀM GÌ, chứ không phải HỆ THỐNG TRÔNG NHƯ THẾ NÀO." },
      { text: "Danh từ (Người dùng, Admin, Time) -> Actor. Động từ -> Use Case." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Lọc nhiễu Hệ thống',
    question: 'Câu: "Hệ thống sẽ lưu dữ liệu xuống bảng User trong SQL Server". Đây có phải là Use Case không?',
    options: [
      { id: 'opt1', label: 'Có, Use Case là "Lưu dữ liệu xuống SQL"', isCorrect: false, hint: 'Đây là chi tiết database/kỹ thuật, không phải Use Case.' },
      { id: 'opt2', label: 'Không, đây là việc hệ thống tự thực hiện ở phía sau (Backend logic)', isCorrect: true, hint: 'Chính xác! Actor không quan tâm dữ liệu được lưu vào đâu.' }
    ],
    explanation: [ { text: "Bỏ qua các yếu tố về database hay ngôn ngữ lập trình." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Sẵn sàng Test Skill',
    subtitle: 'Ôn tập lại kỹ thuật',
    image: null,
    explanation: [
      { text: "Bây giờ bạn đã biết cách đọc một bản Requirement dài ngoằng và loại bỏ rác để tìm ra Actor, Use Case." },
      { text: "Hãy bắt đầu bài Test Skill." }
    ]
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 1/3',
    question: '"Sinh viên phải có khả năng tải tài liệu môn học dưới dạng PDF". Use Case là gì?',
    options: [
      { id: 'opt1', label: 'Dưới dạng PDF', isCorrect: false },
      { id: 'opt2', label: 'Tải tài liệu', isCorrect: true }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 2/3',
    question: '"Hệ thống ngân hàng đối tác sẽ gửi mã OTP cho khách". Ai là Actor chính trong câu này?',
    options: [
      { id: 'opt1', label: 'Mã OTP', isCorrect: false },
      { id: 'opt2', label: 'Hệ thống ngân hàng đối tác', isCorrect: true }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 3/3',
    question: 'Một chức năng ghi: "Kiểm tra xem mật khẩu có dài hơn 8 ký tự không". Đây có nên là 1 Use Case riêng?',
    options: [
      { id: 'opt1', label: 'Không, nó chỉ là một quy tắc (Business Rule) nằm trong Use Case Đăng ký.', isCorrect: true },
      { id: 'opt2', label: 'Có, vẽ thành Use Case "Kiểm tra mật khẩu"', isCorrect: false }
    ],
    explanation: []
  }
];
