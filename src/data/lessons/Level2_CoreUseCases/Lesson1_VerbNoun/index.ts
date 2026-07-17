export const LESSON_DATA = [
  // 1. Khởi động (MCQ)
  {
    type: 'interactive',
    interactionType: 'selection',
    title: 'Thông điệp mã hóa',
    subtitle: 'Khởi động',
    question: 'Bạn dán một tờ giấy note lên bảng để giao việc cho đồng nghiệp xây dựng tính năng Flashcard. Tờ note nào dưới đây giúp họ hiểu ngay việc cần làm?',
    options: [
      { id: 'a', label: 'A. Dữ liệu bộ bài Anki', isCorrect: false, hint: 'Chỉ có danh từ, không có hành động để thực thi.' },
      { id: 'b', label: 'B. Nút màu xanh góc phải', isCorrect: false, hint: 'Đây là chi tiết giao diện UI, không phải giá trị nghiệp vụ.' },
      { id: 'c', label: 'C. Tạo bộ bài mới', isCorrect: true }
    ],
    explanation: [
      { text: "Chính xác! Để một hệ thống hoạt động, nó cần những HÀNH ĐỘNG cụ thể. 'Dữ liệu' chỉ là thứ nằm im lìm nếu không có ai tác động vào nó!" }
    ]
  },

  // 2. Interactive 1 (Text Highlight)
  {
    type: 'interactive',
    interactionType: 'text_highlight',
    title: 'Truy tìm động từ',
    subtitle: 'Phase 1: Bóc tách Khái niệm',
    question: 'Một Use Case luôn bắt đầu bằng một hành động. Hãy chạm để chọn ĐỘNG TỪ trong tính năng sau:',
    text: "Để chuẩn bị cho kỳ thi chuyên ngành, sinh viên cần [Ôn tập] thẻ từ vựng mỗi ngày trên hệ thống.",
    correctTokens: ["Ôn tập"],
    explanation: [
      { text: "Tuyệt! 'Ôn tập' là Động từ, 'thẻ từ vựng' là Danh từ. Đây chính là cấu trúc chuẩn mực của mọi Use Case." }
    ]
  },

  // 3. Interactive 2 (Drag To Bins)
  {
    type: 'interactive',
    interactionType: 'drag_to_bins',
    title: 'Dọn dẹp sơ đồ',
    question: "Hãy kéo thả các thẻ tên sau vào đúng giỏ để giữ cho sơ đồ kiến trúc của bạn luôn 'sạch sẽ'.",
    options: [
      { id: 'del', label: 'Xóa tài khoản' },
      { id: 'db', label: 'Bảng Database Chứa User' },
      { id: 'ui', label: 'Giao diện Đăng nhập' },
      { id: 'add', label: 'Thêm Flashcard' }
    ],
    bins: [
      { id: 'correct', label: 'Chuẩn Use Case', correctOptionIds: ['del', 'add'] },
      { id: 'wrong', label: 'Không phải Use Case', correctOptionIds: ['db', 'ui'] }
    ],
    explanation: [
      { text: "Use Case phải diễn tả một nghiệp vụ (Xóa, Thêm). Các thành phần kỹ thuật như Database hay Giao diện (UI) không được phép nằm trong Use Case Diagram." }
    ]
  },

  // 4. Theory 1
  {
    type: 'theory',
    title: 'Công thức Vàng: [Động Từ] + [Danh Từ]',
    image: null,
    tabs: [
      {
        id: 'rule',
        label: 'Quy tắc',
        content: [
          { type: 'text', text: 'Use Case thể hiện một **Mục đích** hoặc **Hành động** mang lại giá trị cho Actor.' },
          { type: 'text', text: 'Luôn đặt tên bằng cấu trúc: **Động từ + Danh từ**.' },
          { type: 'bullet', text: 'Ví dụ đúng: Đặt hàng, Xóa bài viết, Thanh toán giỏ hàng.' },
          { type: 'bullet', text: 'Ví dụ sai: Hóa đơn (thiếu hành động), Quản lý (quá chung chung).' }
        ]
      }
    ]
  },

  // 5. Interactive 3 (Visual Select)
  {
    type: 'interactive',
    interactionType: 'highlight_diagram',
    title: 'Góc nhìn của ai?',
    subtitle: 'Phase 2: Tránh Bẫy "Lập trình viên"',
    question: "Use Case phải mô tả góc nhìn của người dùng, không phải góc nhìn của code. Hãy chạm vào khối đang bị đặt tên sặc mùi 'kỹ thuật' để phá hủy nó!",
    nodes: [
      { id: 'view', label: 'Xem danh sách sản phẩm', isSystem: true, icon: '📋', isCorrect: false },
      { id: 'add', label: 'Thêm vào giỏ hàng', isSystem: true, icon: '🛒', isCorrect: false },
      { id: 'filter', label: 'Gọi AuthenFilter xác thực', isSystem: true, icon: '⚙️', isCorrect: true } // Sẽ bị chạm nổ
    ],
    explanation: [
      { text: "Khách hàng không biết AuthenFilter hay Servlet là cái gì cả! Họ chỉ biết hành động 'Đăng nhập' thôi." }
    ]
  },

  // 6. Interactive 4 (Block Mapping)
  {
    type: 'interactive',
    interactionType: 'block_mapping',
    title: 'Lắp ráp tên chuẩn',
    question: "Kéo thả các mảnh ghép để tạo thành một Use Case chuẩn chỉnh cho chức năng xử lý thanh toán.",
    options: [
      { id: 'hang', label: 'Hàng' },
      { id: 'don', label: 'Đơn' },
      { id: 'thanh', label: 'Thanh' },
      { id: 'toan', label: 'Toán' }
    ],
    slots: [
      { id: 'slot1', label: 'Từ 1' },
      { id: 'slot2', label: 'Từ 2' },
      { id: 'slot3', label: 'Từ 3' },
      { id: 'slot4', label: 'Từ 4' }
    ],
    correctMapping: ['thanh', 'toan', 'don', 'hang'],
    explanation: [
      { text: "Chuẩn xác! Động từ (Thanh Toán) + Danh từ (Đơn Hàng). Đó là tất cả những gì Use Case cần." }
    ]
  },

  // 7. Theory 2
  {
    type: 'theory',
    title: 'Hãy nói ngôn ngữ của Khách hàng',
    tabs: [
      {
        id: 'client_lang',
        label: 'Ngôn ngữ',
        content: [
          { type: 'text', text: 'Tránh tuyệt đối việc đưa các thuật ngữ lập trình (như *API, Database, Filter, Click button, Chuyển trang*) vào tên Use Case.' },
          { type: 'text', text: 'Sơ đồ Use Case là tài liệu để chốt yêu cầu với khách hàng. Nếu khách hàng (người không biết code) đọc không hiểu, sơ đồ đó thất bại!' }
        ]
      }
    ]
  },

  // 8. Skill Check Transition
  {
    type: 'skill_check_transition',
    title: 'Boss Cuối: Skill Check',
    subtitle: 'Vượt qua 3 thử thách để hoàn thành bài học'
  },

  // 9. Skill Check 1
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 1: Cạm bẫy từ ngữ',
    question: 'Bạn đang vẽ sơ đồ cho nền tảng xem phim trực tuyến. Cách đặt tên Use Case nào dưới đây là hoàn hảo nhất?',
    options: [
      { id: 'sc1_a', label: 'A. Quản lý phim', isCorrect: false },
      { id: 'sc1_b', label: 'B. Click nút Play Video', isCorrect: false },
      { id: 'sc1_c', label: 'C. Xem phim', isCorrect: true }
    ],
    explanation: [
      { text: "'Xem phim' là hành động rất rõ ràng và mang lại giá trị trực tiếp. 'Quản lý' quá chung chung, 'Click nút' là thao tác giao diện." }
    ]
  },

  // 10. Skill Check 2
  {
    type: 'skill_check',
    interactionType: 'highlight_diagram',
    title: 'Câu 2: Bắt lỗi sơ đồ',
    question: "Nhìn vào sơ đồ hệ thống quản lý học tập dưới đây. Hãy chạm vào Use Case đang bị vi phạm quy tắc 'Tránh bẫy kỹ thuật'!",
    nodes: [
      { id: 'nop', label: 'Nộp bài tập', isSystem: true, icon: '📄', isCorrect: false },
      { id: 'xem', label: 'Xem điểm số', isSystem: true, icon: '📊', isCorrect: false },
      { id: 'db', label: 'Lưu data vào MySQL', isSystem: true, icon: '💾', isCorrect: true }
    ],
    explanation: [
      { text: "'Lưu data vào MySQL' là một chi tiết lập trình. Khách hàng không quan tâm bạn dùng MySQL hay MongoDB. Hành động nghiệp vụ thực sự là 'Nộp bài tập'." }
    ]
  },

  // 11. Skill Check 3 (Ordering)
  {
    type: 'skill_check',
    interactionType: 'ordering',
    title: 'Câu 3: Thiết kế hoàn chỉnh',
    question: 'Đâu là chuỗi tư duy đúng nhất khi bạn muốn chuyển đổi yêu cầu của khách hàng thành Use Case?',
    options: [
      { id: 's1', label: 'Xác định Khách hàng muốn đạt được giá trị gì.' },
      { id: 's2', label: 'Gạn lọc bỏ các chi tiết thừa về giao diện và code.' },
      { id: 's3', label: 'Đặt tên bắt đầu bằng một Động từ mạnh.' }
    ],
    correctOrder: ['s1', 's2', 's3'],
    explanation: [
      { text: "Chính xác! Luôn bắt đầu bằng việc hiểu GIÁ TRỊ cốt lõi, sau đó LOẠI BỎ nhiễu kỹ thuật, và cuối cùng CHUẨN HÓA tên gọi bằng cấu trúc Động-Danh." }
    ]
  }
];
