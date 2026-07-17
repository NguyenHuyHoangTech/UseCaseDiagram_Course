// Data for Ai đang dùng hệ thống? (Primary Actors)
export const LESSON_DATA = [
  // 1. Màn hình Khởi động
  {
    type: 'interactive',
    interactionType: 'selection',
    title: 'Ai cần ai?',
    subtitle: 'Màn hình Khởi động',
    question: 'Tình huống: Bạn mở app Shopee, chốt đơn một món hàng, sau đó app tự động gọi sang hệ thống Momo để trừ tiền của bạn. Theo bạn, trong quy trình này, ai là người thực sự CẦN quy trình này diễn ra, và ai chỉ bị gọi tên để HỖ TRỢ?',
    options: [
      { id: 'opt_A', label: 'A. Momo là người cần, Bạn là người hỗ trợ.', isCorrect: false },
      { id: 'opt_B', label: 'B. Bạn là người cần, Momo là hệ thống hỗ trợ.', isCorrect: true },
    ],
    explanation: [
      { text: "Chính xác! Bạn có mục đích (mua hàng), nên bạn phải chủ động bắt đầu. Còn Momo chỉ nằm im chờ app Shopee gọi đến để xử lý thanh toán giúp bạn thôi!" }
    ]
  },
  
  // 2. Màn hình Tương tác 1: Truy tìm kẻ khởi xướng
  {
    type: 'interactive',
    interactionType: 'text_highlight',
    title: 'Kẻ "chủ mưu"',
    question: 'Primary Actor (Tác nhân chính) là người luôn chủ động khởi phát một chức năng. Hãy chạm để highlight Primary Actor trong câu sau:',
    text: 'Để hoàn tất thủ tục, [Sinh viên] sẽ truy cập vào cổng thông tin, chọn môn học, sau đó hệ thống sẽ tự động lưu dữ liệu vào [Máy chủ Database].',
    correctId: 'Sinh viên',
    explanation: [
      { text: "Sinh viên là người chủ động khởi phát Use Case đăng ký môn học. Máy chủ Database không tự dưng tỉnh dậy và lưu dữ liệu. Nó chỉ làm việc khi hệ thống bảo nó làm. Nó không phải là người chủ động!" }
    ]
  },

  // 3. Màn hình Tương tác 2: Phân loại Chủ - Khách
  {
    type: 'interactive',
    interactionType: 'drag_to_bins',
    title: 'Kép Chính và Kép Phụ',
    question: 'Bạn đang thiết kế Hệ thống Rạp chiếu phim. Hãy kéo thả các tác nhân vào đúng vai trò của họ.',
    bins: [
      { id: 'primary', label: 'Khởi xướng (Primary Actor)' },
      { id: 'secondary', label: 'Hỗ trợ (Secondary Actor)' }
    ],
    options: [
      { id: 'opt1', label: 'Khách xem phim', correctBin: 'primary' },
      { id: 'opt2', label: 'Quản lý rạp', correctBin: 'primary' },
      { id: 'opt3', label: 'Hệ thống gửi SMS OTP', correctBin: 'secondary' },
      { id: 'opt4', label: 'Cổng thanh toán ZaloPay', correctBin: 'secondary' }
    ],
    explanation: [
      { text: "Rất chuẩn! Các hệ thống bên thứ 3 (SMS, Thanh toán, Lưu trữ) thường đóng vai trò là Secondary Actor để hỗ trợ hoàn thành Use Case." }
    ]
  },

  // 4. Màn hình Chốt Kiến Thức (Lý thuyết cô đọng)
  {
    type: 'info_tabs',
    title: 'Luật Phân Ngôi trong UML',
    tabs: [
      {
        tabTitle: 'Sơ đồ Vị trí',
        content: 'Primary Actor (Tác nhân chính): Luôn nằm bên TRÁI ranh giới. Là người CHỦ ĐỘNG kích hoạt Use Case để đạt được mục tiêu của mình. Secondary Actor (Tác nhân phụ): Luôn nằm bên PHẢI ranh giới. Là người BỊ ĐỘNG, được hệ thống "gọi đến" để nhờ hỗ trợ (xác thực, lưu trữ, gửi mail).',
        image: 'rule'
      }
    ]
  },

  // 5. Màn hình Tương tác 3: Dàn trận sơ đồ
  {
    type: 'interactive',
    interactionType: 'block_mapping',
    title: 'Bố cục chuyên nghiệp',
    question: 'Hãy sắp xếp các khối sau theo đúng chuẩn bố cục từ Trái qua Phải để mô tả chức năng Đặt vé máy bay.',
    options: [
      { id: 'opt1', label: 'Hãng Hàng Không API' },
      { id: 'opt2', label: 'Khách Du Lịch' },
      { id: 'opt3', label: 'Tìm Chuyến Bay' }
    ],
    slots: [
      { id: 'slot1', label: 'Bên Trái (Primary)' },
      { id: 'slot2', label: 'Ở Giữa (System)' },
      { id: 'slot3', label: 'Bên Phải (Secondary)' }
    ],
    correctMapping: ['opt2', 'opt3', 'opt1'],
    explanation: [
      { text: "Chuẩn không cần chỉnh! Người dùng ở bên trái, Hệ thống trung gian ở bên phải. Sơ đồ của bạn trông cực kỳ chuyên nghiệp (không bị Spaghetti giao cắt rối rắm)!" }
    ]
  },

  // 6. Skill Check Transition
  {
    type: 'skill_check_transition',
    title: 'Thử thách Node 2',
    subtitle: 'Áp dụng kiến thức vừa học vào các ca khó hơn để chứng minh bản lĩnh!'
  },

  // 7. Bắt lỗi sơ đồ (Skill Check 1)
  {
    type: 'skill_check',
    interactionType: 'highlight_diagram',
    title: 'Bài Test Kỹ Năng 1: Bắt lỗi sai vị trí',
    question: 'Một người mới đã sắp xếp sai vị trí các Actor trong bản vẽ sơ đồ. Hãy chạm vào Tác nhân đang ĐỨNG SAI VỊ TRÍ để cảnh báo họ!',
    nodes: [
      { id: 'system', label: 'Đăng ký tài khoản', isSystem: true, icon: '📝', isCorrect: false },
      { id: 'customer', label: 'Khách hàng', isSystem: false, icon: '👤', isCorrect: false },
      { id: 'sms_gateway', label: 'Cổng SMS', isSystem: false, icon: '💬', isCorrect: true } // Should be on the right, but drawn on the left conceptually in the component if we can. (For HighlightDiagram, we just tap it)
    ],
    explanation: [
      { text: "Tuyệt vời! Cổng SMS là một hệ thống hỗ trợ (Secondary Actor), nó phải được đặt ở lề BÊN PHẢI của khung ranh giới!" }
    ]
  },

  // 8. MCQ (Skill Check 2)
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Bài Test Kỹ Năng 2: Cú lừa tư duy',
    question: "Một hệ thống tự động quét và gửi email 'Chúc mừng sinh nhật' cho hàng ngàn khách hàng vào lúc 12:00 đêm mỗi ngày. Khách hàng chỉ việc mở mail ra xem. Theo bạn, ai là Primary Actor khởi tạo chức năng này?",
    options: [
      { id: 'o1', label: 'A. Khách hàng', isCorrect: false },
      { id: 'o2', label: 'B. Hệ thống gửi Email', isCorrect: false },
      { id: 'o3', label: 'C. Bộ đếm thời gian (Time Trigger)', isCorrect: true }
    ],
    explanation: [
      { text: "Đôi khi Primary Actor không phải là con người! Trong các hệ thống tự động (cronjob, batch), chính Thời gian (Time) đóng vai trò là một Actor chủ động đánh thức hệ thống dậy để làm việc. Khách hàng hoàn toàn thụ động chờ nhận mail, và Hệ thống gửi Email chỉ là công cụ được gọi đến." }
    ]
  }
];
