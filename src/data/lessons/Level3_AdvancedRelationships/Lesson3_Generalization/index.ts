export const LESSON_DATA = [
  // 1. Khởi động (MCQ)
  {
    type: 'interactive',
    interactionType: 'selection',
    title: 'Đặc quyền của VIP',
    subtitle: 'Khởi động',
    question: "Bạn có 'Khách hàng Thường' với 5 chức năng cơ bản. Bạn vừa tạo 'Khách hàng VIP' làm được mọi thứ khách thường làm + 'Tích điểm x2'. Để vẽ sơ đồ, cách nào thông minh nhất của kỹ sư lười biếng?",
    options: [
      { id: 'a', label: 'A. Vẽ lại 5 đường từ VIP đến 5 chức năng cơ bản, cộng thêm 1 đường Tích điểm x2. (Tổng 6 đường).', isCorrect: false },
      { id: 'b', label: 'B. Vẽ 1 đường nối VIP với Tích điểm x2, và 1 đường báo hệ thống "VIP cũng là Khách hàng".', isCorrect: true }
    ],
    explanation: [
      { text: "Chính xác! Trong lập trình, nguyên tắc DRY (Don't Repeat Yourself) là tối thượng. Thừa kế giúp ta không phải vẽ lại những đường nối mớ bòng bong!" }
    ]
  },

  // 2. Interactive 1 (Text Highlight)
  {
    type: 'interactive',
    interactionType: 'text_highlight',
    title: 'Tìm kiếm Lớp Cha',
    subtitle: 'Phase 1: Cha truyền Con nối',
    question: "Một Tác nhân con (Child) sẽ kế thừa toàn bộ quyền hạn của Tác nhân cha (Parent). Hãy highlight đối tượng đóng vai trò LỚP CHA:",
    text: "Quản trị viên Hệ thống có mọi quyền hạn của một Nhân viên CSKH. Ngoài ra, họ có quyền xóa tài khoản của khách hàng.",
    tokens: [
      { id: 't1', text: 'Quản trị viên Hệ thống', isCorrect: false },
      { id: 't2', text: ' có mọi quyền hạn của một ' },
      { id: 't3', text: 'Nhân viên CSKH', isCorrect: true },
      { id: 't4', text: '. Ngoài ra, họ có quyền ' },
      { id: 't5', text: 'xóa tài khoản', isCorrect: false },
      { id: 't6', text: ' của khách hàng.' }
    ],
    explanation: [
      { text: "Đúng vậy! 'Nhân viên CSKH' là lớp nền tảng. 'Quản trị viên' là một phiên bản mở rộng, xịn xò hơn của Nhân viên CSKH." }
    ]
  },

  // 3. Interactive 2 (Click Connect)
  {
    type: 'interactive',
    interactionType: 'click_connect',
    connectionType: 'generalization',
    title: 'Nối dây Phả hệ',
    question: 'Chạm từ Tác nhân CẤP DƯỚI rồi chạm Tác nhân CẤP TRÊN để thiết lập đường Kế thừa (VIP kế thừa Đã Đăng nhập).',
    left: [
      { id: 'vip', label: 'Khách Hàng VIP', type: 'actor' },
      { id: 'guest', label: 'Khách Vãng Lai', type: 'actor' }
    ],
    right: [
      { id: 'user', label: 'Đã Đăng nhập', type: 'actor' }
    ],
    connections: [
      { left: 'vip', right: 'user' }
    ],
    explanation: [
      { text: "Tuyệt vời! Mũi tên tam giác rỗng chỉ từ Con (VIP) lên Cha (Đã Đăng nhập)." }
    ]
  },

  // 4. Theory 1
  {
    type: 'theory',
    title: 'Kế thừa Tác nhân (Actor Generalization)',
    tabs: [
      {
        id: 'actor_gen',
        label: 'Khái niệm',
        content: [
          { type: 'text', text: 'Dùng để mô tả mối quan hệ **"is-a"** (VIP *là một* Khách hàng).' },
          { type: 'bullet', text: '**Ký hiệu**: Mũi tên nét liền, đầu mũi tên là một **tam giác rỗng**.' },
          { type: 'bullet', text: '**Chiều mũi tên**: Luôn luôn chỉ từ Con (Người thừa kế) lên Cha (Người trao quyền).' }
        ]
      }
    ]
  },

  // 5. Interactive 3 (Drag to Bins)
  {
    type: 'interactive',
    interactionType: 'drag_to_bins',
    title: 'Tính Trừu tượng',
    subtitle: 'Phase 2: Đa hình trong Chức năng',
    question: "Trong tính năng Thanh toán, đâu là khái niệm Trừu tượng (Abstract Parent) và đâu là các triển khai Cụ thể (Concrete Children)?",
    options: [
      { id: 'opt1', label: 'Thanh toán bằng thẻ Visa' },
      { id: 'opt2', label: 'Thanh toán Đơn hàng' },
      { id: 'opt3', label: 'Thanh toán qua Momo' }
    ],
    bins: [
      { id: 'bin1', label: 'Lớp Cha (Chung chung)', correctIds: ['opt2'] },
      { id: 'bin2', label: 'Lớp Con (Cụ thể)', correctIds: ['opt1', 'opt3'] }
    ],
    explanation: [
      { text: "Chính xác! Thanh toán chung là lớp cha trừu tượng. Visa và Momo là những cách cụ thể để thực hiện." }
    ]
  },

  // 6. Interactive 4 (Tree Mapping)
  {
    type: 'interactive',
    interactionType: 'tree_mapping',
    title: 'Mô phỏng Đa hình',
    question: 'Lắp ráp sơ đồ thể hiện việc Khách hàng thanh toán, nhưng có quyền chọn 1 trong 2 phương thức. Khách hàng nối vào Cha, 2 nhánh Con trỏ lên Cha.',
    options: [
      { id: 'opt1', label: 'Thanh toán Visa' },
      { id: 'opt2', label: 'Thanh toán chung' },
      { id: 'opt3', label: 'Thanh toán Momo' }
    ],
    parentSlot: { id: 's1', correctId: 'opt2' },
    childSlots: [
      { id: 's2', correctIds: ['opt1', 'opt3'] },
      { id: 's3', correctIds: ['opt1', 'opt3'] }
    ],
    explanation: [
      { text: "Đây chính là Interface trong Java! Khách hàng chỉ cần gọi hàm ThanhToan(), còn việc chạy logic của Visa hay Momo thì hệ thống tự lo." }
    ]
  },

  // 7. Theory 2
  {
    type: 'theory',
    title: 'Kế thừa Chức năng',
    tabs: [
      {
        id: 'uc_gen',
        label: 'Use Case Generalization',
        content: [
          { type: 'bullet', text: 'Kế thừa Use Case giúp làm gọn sơ đồ khi một chức năng chung chung có nhiều cách thức thực hiện chi tiết khác nhau.' },
          { type: 'bullet', text: 'Ký hiệu vẫn giống hệt Kế thừa Actor: **Mũi tên nét liền, tam giác rỗng, chỉ từ Con lên Cha.**' }
        ]
      }
    ]
  },

  // 8. Skill Check Transition
  {
    type: 'skill_check_transition',
    title: 'Skill Check',
    subtitle: 'Nắm vững Đa hình & Kế thừa'
  },

  // 9. Skill Check 1 (Cut Edge)
  {
    type: 'skill_check',
    interactionType: 'cut_edge',
    title: 'Câu 1: Câu hỏi lừa quy tắc',
    question: "Một lập trình viên Backend vừa vẽ sơ đồ quyền hạn. Mũi tên Kế thừa nào đang cắm SAI CHIỀU?",
    nodes: [
      { id: 'vip', label: 'Khách VIP', type: 'actor' },
      { id: 'admin', label: 'Admin Thường', type: 'actor' },
      { id: 'sadmin', label: 'Super Admin', type: 'actor' }
    ],
    edges: [
      { id: 'e1', from: 'sadmin', to: 'admin', isCorrect: false, type: 'generalization' },
      { id: 'e2', from: 'vip', to: 'admin', isCorrect: true, type: 'generalization' } // Invalid: VIP cannot inherit from Admin
    ],
    explanation: [
      { text: "Kế thừa là 'is-a'. Khách VIP 'là một' Khách hàng, chứ không thể 'là một' Admin được! Lỗ hổng bảo mật chết người!" }
    ]
  },

  // 10. Skill Check 2 (MCQ)
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 2: Phân biệt các mũi tên',
    question: "Làm sao để phân biệt bằng mắt thường giữa mũi tên Association (giao tiếp cơ bản) và Generalization (kế thừa)?",
    options: [
      { id: 'a', label: 'A. Association là nét đứt, Generalization là nét liền.', isCorrect: false },
      { id: 'b', label: 'B. Generalization có phần đầu là một hình tam giác rỗng (màu trắng).', isCorrect: true },
      { id: 'c', label: 'C. Cả hai mũi tên đều hoàn toàn giống nhau.', isCorrect: false }
    ],
    explanation: [
      { text: "Chuẩn xác! Mũi tên tam giác rỗng là ký hiệu đặc trưng của Generalization trong toàn bộ chuẩn UML." }
    ]
  },

  // 11. Skill Check 3 (Equation Builder)
  {
    type: 'skill_check',
    interactionType: 'equation_builder',
    title: 'Câu 3: Hoàn thiện phương trình kế thừa',
    question: 'Thiết lập cấu trúc OOP chuẩn mực cho chức năng Gửi Thông Báo.',
    slots: 3,
    options: [
      { id: 'sms', label: 'Gửi SMS', type: 'usecase' },
      { id: 'gen', label: '▷', type: 'operator' },
      { id: 'noti', label: 'Gửi Thông Báo (Chung)', type: 'usecase' }
    ],
    correctOrder: ['sms', 'gen', 'noti'],
    explanation: [
      { text: "Hoàn hảo! Gửi SMS kế thừa từ Gửi Thông Báo. Con trỏ lên Cha." }
    ]
  }
];
