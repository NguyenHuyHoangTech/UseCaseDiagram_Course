export const LESSON_DATA = [
  // 1. Khởi động (MCQ)
  {
    type: 'interactive',
    interactionType: 'selection',
    title: 'Quy luật bất biến',
    subtitle: 'Khởi động',
    question: "Bạn đẩy xe hàng đầy ắp đồ ăn trong siêu thị ra quầy thu ngân. Nếu bạn cầm túi đồ đi thẳng ra cửa mà KHÔNG đi qua bước 'Thanh toán', quy trình mua hàng của bạn có được xem là hoàn tất không?",
    options: [
      { id: 'a', label: 'A. Có, mang đồ về là xong.', isCorrect: false },
      { id: 'b', label: 'B. Không, chắc chắn sẽ bị bảo vệ giữ lại!', isCorrect: true }
    ],
    explanation: [
      { text: "Chính xác! Có những bước mang tính chất bắt buộc. Nếu không hoàn thành nó, toàn bộ mục tiêu ban đầu của bạn sẽ thất bại." }
    ]
  },

  // 2. Interactive 1 (Text Highlight)
  {
    type: 'interactive',
    interactionType: 'text_highlight',
    title: 'Truy tìm sự lặp lại (DRY)',
    subtitle: 'Phase 1: Bóc tách Khái niệm',
    question: "Một kỹ sư viết tài liệu mô tả luồng cho nền tảng Flashcard. Hãy chạm để chọn cụm từ bị lặp lại một cách dư thừa!",
    text: "Để Tạo bộ bài mới, sinh viên bắt buộc phải Đăng nhập. Tương tự, nếu muốn Xem lịch sử ôn tập, sinh viên cũng bắt buộc phải Đăng nhập vào hệ thống.",
    tokens: [
      { id: 't1', text: 'Để ' },
      { id: 't2', text: 'Tạo bộ bài mới', isCorrect: false },
      { id: 't3', text: ', sinh viên bắt buộc phải ' },
      { id: 't4', text: 'Đăng nhập', isCorrect: true },
      { id: 't5', text: '. Tương tự, nếu muốn ' },
      { id: 't6', text: 'Xem lịch sử ôn tập', isCorrect: false },
      { id: 't7', text: ', sinh viên cũng bắt buộc phải ' },
      { id: 't8', text: 'Đăng nhập', isCorrect: true },
      { id: 't9', text: ' vào hệ thống.' }
    ],
    explanation: [
      { text: "Khi nhiều tính năng đều dùng chung một bước bắt buộc, ta nên tách nó ra thành một Use Case độc lập để tái sử dụng!" }
    ]
  },

  // 3. Interactive 2 (Equation Builder)
  {
    type: 'interactive',
    interactionType: 'equation_builder',
    title: 'Mắt xích không thể tách rời',
    question: 'Lắp ráp công thức thể hiện sự phụ thuộc hoàn toàn: Chức năng Checkout không thể hoàn tất nếu không qua Process Payment.',
    slots: 3,
    options: [
      { id: 'checkout', label: 'Checkout', type: 'usecase' },
      { id: 'extend', label: '<<extend>>', type: 'operator' },
      { id: 'payment', label: 'Process Payment', type: 'usecase' },
      { id: 'include', label: '<<include>>', type: 'operator' }
    ],
    correctOrder: ['checkout', 'include', 'payment'],
    explanation: [
      { text: "Phương trình hoàn hảo! <<include>> kết dính chặt chẽ chức năng Checkout vào chức năng Payment." }
    ]
  },

  // 4. Theory 1
  {
    type: 'theory',
    title: 'Mối quan hệ Bao hàm (<<include>>)',
    tabs: [
      {
        id: 'include',
        label: 'Khái niệm',
        content: [
          { type: 'text', text: '`<<include>>` dùng để gọi một Use Case **bắt buộc** phải thực hiện thì Use Case gốc mới hoàn thành được.' },
          { type: 'text', text: '**Tác dụng**: Tái sử dụng (Reuse) chức năng. Thay vì vẽ bước Đăng nhập vào 10 chức năng khác nhau, ta chỉ vẽ 1 Use Case `( Đăng nhập )` và cho 10 chức năng kia `<<include>>` nó.' }
        ]
      }
    ]
  },

  // 5. Interactive 3 (ClickConnect with Direction)
  {
    type: 'interactive',
    interactionType: 'click_connect',
    connectionType: 'include',
    title: 'Chọn chiều mũi tên',
    subtitle: 'Phase 2: Định hướng dòng chảy',
    question: 'Chức năng Quản lý cần gọi Xác thực để hoạt động. Hãy chạm khối khởi xướng rồi chạm khối phục vụ để tạo mũi tên <<include>>.',
    left: [
      { id: 'ql', label: 'Quản lý bộ bài', type: 'usecase' },
      { id: 'xt', label: 'Xác thực tài khoản', type: 'usecase' }
    ],
    right: [
      { id: 'ql', label: 'Quản lý bộ bài', type: 'usecase' },
      { id: 'xt', label: 'Xác thực tài khoản', type: 'usecase' }
    ],
    connections: [
      { left: 'ql', right: 'xt' }
    ],
    explanation: [
      { text: "Đúng! Xác thực tài khoản không tự động lôi tính năng Quản lý ra chạy. Mũi tên phải đi từ kẻ cần gọi sang kẻ được gọi!" }
    ]
  },

  // 6. Interactive 4 (Map Runner)
  {
    type: 'interactive',
    interactionType: 'map_runner',
    title: 'Chạy thử luồng (Sandbox)',
    question: "Nhấn RUN để xem hệ thống vận hành. Chuyện gì xảy ra nếu chức năng được gọi bị lỗi?",
    connectionType: 'include',
    nodes: [
      { id: 'n1', label: 'Thêm thẻ', type: 'usecase' },
      { id: 'n2', label: 'Kiểm tra trùng lặp', type: 'usecase' }
    ],
    explanation: [
      { text: "Sụp đổ dây chuyền! Nếu Use Case được include bị lỗi (hoặc ném Exception), Use Case gốc cũng sẽ thất bại. Chúng cùng hội cùng thuyền!" }
    ]
  },

  // 7. Theory 2
  {
    type: 'theory',
    title: 'Luật Mũi tên Nét Đứt',
    tabs: [
      {
        id: 'rules',
        label: 'Luật Include',
        content: [
          { type: 'bullet', text: 'Mũi tên `<<include>>` luôn là **nét đứt**.' },
          { type: 'bullet', text: '**Chiều mũi tên**: Luôn chỉ TỪ Base Case (Kẻ nhờ vả) SANG Included Case (Kẻ phục vụ).' },
          { type: 'bullet', text: 'Nó giống như việc bạn gọi một hàm (function call) dùng chung trong lập trình backend. Nếu hàm đó `throw Exception`, chức năng chính cũng sẽ dừng lại.' }
        ]
      }
    ]
  },

  // 8. Skill Check Transition
  {
    type: 'skill_check_transition',
    title: 'Skill Check',
    subtitle: 'Chứng minh bạn đã nắm vững luật <<include>>'
  },

  // 9. Skill Check 1 (MCQ lừa tư duy)
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 1: Câu hỏi lừa tư duy',
    question: "Một người dùng muốn Xem giỏ hàng. Thỉnh thoảng họ sẽ dùng Mã giảm giá, thỉnh thoảng không. Bạn có nên dùng `<<include>>` để nối (Xem giỏ hàng) tới (Nhập mã giảm giá) không?",
    options: [
      { id: 'a', label: 'A. Có, vì hai chức năng này nằm trên cùng một màn hình UI.', isCorrect: false },
      { id: 'b', label: 'B. Không. Mã giảm giá là tùy chọn (có hoặc không), trong khi <<include>> bắt buộc phải luôn luôn xảy ra.', isCorrect: true }
    ],
    explanation: [
      { text: "Chính xác! Sự ép buộc là bản chất của <<include>>. Đối với các hành vi tùy chọn, chúng ta sẽ có một loại mũi tên riêng biệt mang tên <<extend>>." }
    ]
  },

  // 10. Skill Check 2 (Cut Edge)
  {
    type: 'skill_check',
    interactionType: 'cut_edge',
    title: 'Câu 2: Cảnh sát bắt lỗi UML',
    question: "Hệ thống quản lý điểm thi đang có một lỗi chết người về logic. Chạm vào mũi tên vi phạm để xóa nó!",
    nodes: [
      { id: 'gv', label: 'Giảng viên', type: 'actor' },
      { id: 'nhap', label: 'Nhập điểm thi', type: 'usecase' },
      { id: 'xt', label: 'Xác thực Admin', type: 'usecase' }
    ],
    edges: [
      { id: 'e1', from: 'gv', to: 'nhap', isCorrect: false },
      { id: 'e2', from: 'xt', to: 'nhap', isCorrect: true, type: 'include' } // Sai chiều, từ xt sang nhap
    ],
    explanation: [
      { text: "Mũi tên phải đi từ (Nhập điểm thi) chỉ sang (Xác thực Admin). Chức năng Nhập điểm là nơi cần gọi bước Xác thực để xin phép chạy." }
    ]
  },

  // 11. Skill Check 3 (Equation Builder)
  {
    type: 'skill_check',
    interactionType: 'equation_builder',
    title: 'Câu 3: Hoàn thiện phương trình MVC',
    question: 'Hoàn thiện luồng logic chuẩn cho việc tái sử dụng chức năng bắt buộc.',
    slots: 3,
    options: [
      { id: 'include', label: '<<include>>', type: 'operator' },
      { id: 'dangnhap', label: 'Đăng nhập', type: 'usecase' },
      { id: 'doimk', label: 'Đổi mật khẩu', type: 'usecase' }
    ],
    correctOrder: ['doimk', 'include', 'dangnhap'],
    explanation: [
      { text: "Tuyệt vời! Chức năng Đổi mật khẩu bắt buộc phải <<include>> bước Đăng nhập để đảm bảo an toàn hệ thống." }
    ]
  }
];
