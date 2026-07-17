export const LESSON_DATA = [
  // 1. Khởi động (MCQ)
  {
    type: 'interactive',
    interactionType: 'selection',
    title: 'Thêm Topping hay Không?',
    subtitle: 'Khởi động',
    question: "Bạn đang mua một ly cà phê mang đi. Việc mua cà phê là hành động cốt lõi. Tuy nhiên, thỉnh thoảng bạn muốn thêm một chút topping sầu riêng xay nhuyễn. Hành động 'Thêm Topping' có mang tính chất BẮT BUỘC để bạn có thể mua được ly cà phê không?",
    options: [
      { id: 'a', label: 'A. Có, không có topping thì không gọi là cà phê.', isCorrect: false },
      { id: 'b', label: 'B. Không, nó chỉ là một tuỳ chọn làm phong phú thêm.', isCorrect: true }
    ],
    explanation: [
      { text: "Hoàn toàn chính xác! Ly cà phê đen cơ bản vẫn tồn tại và hoàn thiện dù không có topping. 'Thêm Topping' chỉ là một hành vi MỞ RỘNG (Extend) tùy chọn!" }
    ]
  },

  // 2. Interactive 1 (Text Highlight)
  {
    type: 'interactive',
    interactionType: 'text_highlight',
    title: 'Khi nào lối rẽ xuất hiện?',
    subtitle: 'Phase 1: Bóc tách Khái niệm',
    question: "Một hành vi mở rộng (<<extend>>) CHỈ xảy ra khi có một điều kiện cụ thể. Hãy chạm để highlight (chọn) ĐIỀU KIỆN trong tài liệu nghiệp vụ sau:",
    text: "Sinh viên tiến hành Đăng ký môn học. Nếu lớp học đã đạt sĩ số tối đa, hệ thống sẽ kích hoạt tính năng Thêm vào danh sách chờ.",
    tokens: [
      { id: 't1', text: 'Sinh viên tiến hành ' },
      { id: 't2', text: 'Đăng ký môn học', isCorrect: false },
      { id: 't3', text: '. ' },
      { id: 't4', text: 'Nếu lớp học đã đạt sĩ số tối đa', isCorrect: true },
      { id: 't5', text: ', hệ thống sẽ kích hoạt tính năng ' },
      { id: 't6', text: 'Thêm vào danh sách chờ', isCorrect: false },
      { id: 't7', text: '.' }
    ],
    explanation: [
      { text: "Đúng vậy! Lối rẽ 'Thêm vào danh sách chờ' sẽ nằm im bất động nếu điều kiện này chưa xảy ra." }
    ]
  },

  // 3. Interactive 2 (Drag to Bins)
  {
    type: 'interactive',
    interactionType: 'drag_to_bins',
    title: 'Trận chiến Include vs Extend',
    question: "Hãy kéo thả các tính năng sau vào đúng bản chất của nó đối với chức năng gốc là ( Mua Hàng ).",
    options: [
      { id: 'opt1', label: 'Kiểm tra số dư thẻ' },
      { id: 'opt2', label: 'Nhập mã giảm giá' },
      { id: 'opt3', label: 'Trừ tiền trong thẻ' },
      { id: 'opt4', label: 'Xuất hóa đơn VAT (Nếu yêu cầu)' }
    ],
    bins: [
      { id: 'bin1', label: 'BẮT BUỘC (<<include>>)', correctIds: ['opt1', 'opt3'] },
      { id: 'bin2', label: 'TÙY CHỌN (<<extend>>)', correctIds: ['opt2', 'opt4'] }
    ],
    explanation: [
      { text: "Tuyệt vời! Những thứ liên quan đến tiền bạc cốt lõi luôn là bắt buộc, còn giảm giá hay hóa đơn VAT chỉ là phần mở rộng (tùy chọn)." }
    ]
  },

  // 4. Interactive 3 (Slider Extend)
  {
    type: 'interactive',
    interactionType: 'slider_extend',
    title: 'Rẽ nhánh khi quá tải',
    question: "Kéo thanh tải trọng server. Quan sát khi nào chức năng ngoại lệ được kích hoạt.",
    baseNode: { label: 'Checkout' },
    extendNode: { label: 'Hiển thị Lỗi Server' },
    explanation: [
      { text: "Bùm! Trong lập trình, đây chính là lúc khối `catch (Exception e)` của bạn bắt đầu hoạt động để xử lý ngoại lệ!" }
    ]
  },

  // 5. Theory 1
  {
    type: 'theory',
    title: 'Mối quan hệ Mở Rộng (<<extend>>)',
    tabs: [
      {
        id: 'extend',
        label: 'Định nghĩa',
        content: [
          { type: 'text', text: '`<<extend>>` được dùng cho các luồng rẽ nhánh, luồng lỗi, hoặc hành vi tùy chọn chỉ xảy ra trong những **điều kiện cụ thể**.' },
          { type: 'bullet', text: '**Base Case (Use Case Gốc)**: Có thể tự mình chạy độc lập mà không cần biết đến sự tồn tại của Use Case mở rộng.' },
          { type: 'bullet', text: 'Tương đương với các lệnh `if/else` hoặc khối `try-catch` trong mã nguồn.' }
        ]
      }
    ]
  },

  // 6. Interactive 4 (Flip Edge)
  {
    type: 'interactive',
    interactionType: 'flip_edge',
    title: 'Ai đâm vào ai?',
    subtitle: 'Phase 2: Cú lừa hướng mũi tên',
    question: 'Mũi tên này đang bị cắm SAI chiều! Chức năng gốc không hề biết bao giờ người dùng sẽ quên mật khẩu. Hãy chạm vào mũi tên để đổi chiều nó!',
    nodes: [
      { id: 'base', label: 'Đăng nhập', type: 'usecase' },
      { id: 'extend', label: 'Quên mật khẩu', type: 'usecase' }
    ],
    initialDirection: 'left-to-right',
    correctDirection: 'right-to-left',
    edgeLabel: '<<extend>>',
    explanation: [
      { text: "Hãy nhớ: Kẻ đến sau (Tính năng mở rộng) phải chủ động xin phép 'cắm' vào Tính năng gốc. Tính năng gốc đứng yên!" }
    ]
  },

  // 7. Interactive 5 (Equation Builder)
  {
    type: 'interactive',
    interactionType: 'equation_builder',
    title: 'Điểm nối (Extension Point)',
    question: 'Để Use Case mở rộng biết chỗ nào mà cắm vào, Use Case gốc phải khai báo một Điểm Mở Rộng (Extension Point). Lắp ráp cấu trúc đúng của khối lệnh này.',
    slots: 3,
    options: [
      { id: 'base', label: 'Tên Use Case Gốc', type: 'usecase' },
      { id: 'assoc', label: 'Association', type: 'operator' },
      { id: 'point', label: 'Extension Point', type: 'operator' },
      { id: 'ext', label: 'Tên Use Case Mở Rộng', type: 'usecase' }
    ],
    correctOrder: ['base', 'point', 'ext'],
    explanation: [
      { text: "Đúng vậy! Base Case khai báo 'Extension Point', sau đó Extend Case sẽ lấy đó làm tọa độ để chèn logic vào." }
    ]
  },

  // 8. Theory 2
  {
    type: 'theory',
    title: 'Luật Mũi tên Ngược',
    tabs: [
      {
        id: 'rules',
        label: 'Luật Extend',
        content: [
          { type: 'bullet', text: '**Chiều mũi tên `<<extend>>`**: Luôn chỉ TỪ Use Case Mở Rộng (Extender) CẮM VÀO Use Case Gốc (Base Case).' },
          { type: 'bullet', text: 'Nó mang ý nghĩa: "Tôi (Tính năng phụ) sẽ bổ sung thêm luồng cho bạn (Tính năng chính) tại cái điểm mà bạn đã mở sẵn (Extension Point)."' }
        ]
      }
    ]
  },

  // 9. Skill Check Transition
  {
    type: 'skill_check_transition',
    title: 'Skill Check',
    subtitle: 'Nắm vững nghệ thuật Rẽ nhánh'
  },

  // 10. Skill Check 1
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 1: Bản chất của sự phụ thuộc',
    question: "Nếu bạn xóa Use Case `( Nhập mã Voucher )` khỏi hệ thống, thì Use Case gốc `( Thanh toán Giỏ hàng )` có bị sụp đổ theo không?",
    options: [
      { id: 'a', label: 'A. Có, vì hai chức năng này nằm cùng một luồng.', isCorrect: false },
      { id: 'b', label: "B. Không. Vì 'Nhập Voucher' chỉ là một <<extend>>. Thanh toán vẫn chạy bình thường.", isCorrect: true }
    ],
    explanation: [
      { text: "Chính xác! Tính năng gốc hoàn toàn độc lập và không phụ thuộc vào tính năng mở rộng." }
    ]
  },

  // 11. Skill Check 2
  {
    type: 'skill_check',
    interactionType: 'equation_builder',
    title: 'Câu 2: Ràng buộc quy tắc',
    question: 'Lắp ráp công thức chuẩn UML mô tả: Khi đang Thanh toán, nếu thẻ bị từ chối, hệ thống sẽ Báo lỗi Ngân hàng.',
    slots: 3,
    options: [
      { id: 'error', label: 'Báo lỗi Ngân hàng', type: 'usecase' },
      { id: 'ext', label: '<<extend>>', type: 'operator' },
      { id: 'pay', label: 'Thanh toán', type: 'usecase' },
      { id: 'inc', label: '<<include>>', type: 'operator' }
    ],
    correctOrder: ['error', 'ext', 'pay'],
    explanation: [
      { text: "Tuyệt đỉnh! Khối Báo lỗi đóng vai trò là Tính năng mở rộng, mũi tên phải xuất phát từ nó và cắm ngược về Tính năng gốc là Thanh toán." }
    ]
  },

  // 12. Skill Check 3 (Cut Edge)
  {
    type: 'skill_check',
    interactionType: 'cut_edge',
    title: 'Câu 3: Bắt lỗi thiết kế MVC',
    question: "Kỹ sư Backend vẽ sơ đồ Use Case cho một Web App. Hãy chạm vào khối đang sử dụng SAI mũi tên <<extend>>!",
    nodes: [
      { id: 'xoa', label: 'Xóa Bài Viết', type: 'usecase' },
      { id: 'quyen', label: 'Kiểm tra Admin', type: 'usecase' },
      { id: 'popup', label: 'Hiển thị Popup', type: 'usecase' }
    ],
    edges: [
      { id: 'e1', from: 'xoa', to: 'quyen', isCorrect: false, type: 'include' }, // Valid
      { id: 'e2', from: 'xoa', to: 'popup', isCorrect: true, type: 'extend' } // Invalid extend direction
    ],
    explanation: [
      { text: "Đúng! Popup Xác nhận là tính năng phụ (mở rộng luồng Xóa), nên mũi tên phải chỉ từ Popup CẮM VÀO Xóa Bài Viết, không phải ngược lại!" }
    ]
  }
];
