export const LESSON_DATA = [
  // 1. Màn hình Khởi động (Splash Screen)
  {
    type: 'skill_check_transition',
    title: 'Skill check',
    subtitle: 'Level 2: Core Use Cases'
  },

  // 2. Câu 1: Nghệ thuật đặt tên (MCQ)
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 1: Nghệ thuật đặt tên',
    question: 'Bạn đang thiết kế sơ đồ chức năng cho ứng dụng Cóc Cam Anki. Tên Use Case nào sau đây đúng chuẩn mực nhất và mang lại giá trị trọn vẹn cho người học?',
    options: [
      { id: 'a', label: 'A. Click nút lật mặt sau', isCorrect: false },
      { id: 'b', label: 'B. Cơ sở dữ liệu bộ bài', isCorrect: false },
      { id: 'c', label: 'C. Ôn tập thẻ flashcard', isCorrect: true }
    ],
    explanation: [
      { text: "Use Case không phải là tài liệu hướng dẫn sử dụng UI hay mô tả cấu trúc dữ liệu. Nó phải bắt đầu bằng một Động từ mạnh để trả lời câu hỏi: 'Người dùng thao tác với hệ thống này để làm gì?'." }
    ]
  },

  // 3. Câu 2: Tránh bẫy kỹ thuật (Visual Select using highlight_diagram but configured for nodes)
  // Our highlight_diagram component highlights nodes if we give it nodes
  {
    type: 'skill_check',
    interactionType: 'highlight_diagram',
    title: 'Câu 2: Tránh bẫy kỹ thuật',
    question: "Khách hàng của bạn không hiểu code! Hãy chạm vào khối Use Case mang nặng tính 'kỹ thuật hệ thống' để phá hủy nó và giữ cho sơ đồ luôn thuần nghiệp vụ.",
    nodes: [
      { id: 'doi_mk', label: 'Đổi mật khẩu', isSystem: true, icon: '🔑', isCorrect: false },
      { id: 'filter', label: 'Xác thực qua AuthenFilter', isSystem: true, icon: '⚙️', isCorrect: true }, // The trap
      { id: 'xem_ls', label: 'Xem lịch sử mua hàng', isSystem: true, icon: '📜', isCorrect: false }
    ],
    explanation: [
      { text: "Sơ đồ Use Case là tài liệu dùng để chốt yêu cầu với khách hàng. Các khái niệm như Filter, Controller, hay Servlet thuộc về giai đoạn thiết kế kiến trúc hệ thống (System Design), tuyệt đối không được đưa vào sơ đồ Use Case." }
    ]
  },

  // 4. Câu 3: Định hướng dòng chảy (BlockMapping)
  {
    type: 'skill_check',
    interactionType: 'block_mapping',
    title: 'Câu 3: Định hướng dòng chảy',
    question: 'Lắp ráp đúng trình tự để tạo thành một luồng giao tiếp hợp lệ bằng đường Association.',
    options: [
      { id: 'assoc', label: 'Đường thẳng Association' },
      { id: 'admin', label: 'Quản trị viên' },
      { id: 'update', label: 'Cập nhật học phí' }
    ],
    slots: [
      { id: 's1', label: 'Vị trí 1' },
      { id: 's2', label: 'Vị trí 2' },
      { id: 's3', label: 'Vị trí 3' }
    ],
    correctMapping: ['admin', 'assoc', 'update'],
    explanation: [
      { text: "Đường Association cơ bản được dùng để nối giữa Tác nhân (Actor) và Chức năng (Use Case). Không bao giờ dùng nó để nối 2 Actor với nhau hoặc 2 Use Case với nhau." }
    ]
  },

  // 5. Câu 4: Cảnh sát bắt lỗi UML (CutEdge)
  {
    type: 'skill_check',
    interactionType: 'cut_edge',
    title: 'Câu 4: Cảnh sát bắt lỗi UML',
    question: "Radar phát hiện một liên kết Association vi phạm quy tắc '3 KHÔNG'. Hãy chạm để cắt đứt cáp nối sai trái này!",
    nodes: [
      { id: 'kh', label: 'Khách hàng', type: 'actor' },
      { id: 'checkout', label: 'Checkout Giỏ Hàng', type: 'usecase' },
      { id: 'email', label: 'Gửi Email Biên Lai', type: 'usecase' }
    ],
    edges: [
      { id: 'e1', from: 'kh', to: 'checkout', isCorrect: false },
      { id: 'e2', from: 'checkout', to: 'email', isCorrect: true } // Vi phạm: Nối UC với UC bằng Association thường
    ],
    explanation: [
      { text: "Bạn KHÔNG THỂ dùng một đường Association trơn tru để nối 2 chức năng (Use Case) với nhau. Để các chức năng giao tiếp nội bộ, chúng ta cần dùng đến những mũi tên có định hướng rẽ nhánh như <<include>> hoặc <<extend>>." }
    ]
  }
];
