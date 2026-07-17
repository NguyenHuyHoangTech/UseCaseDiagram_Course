export const LESSON_DATA = [
  // 1. Màn hình Khởi động
  {
    type: 'intro_anim',
    title: 'Bài 2: Use Case Mồ Côi',
    subtitle: 'Orphaned Use Cases',
    description: 'Nếu bẫy CRUD tạo ra sự thừa thãi, thì "Use Case mồ côi" lại tạo ra những "bóng ma" trong hệ thống. Một chức năng được vẽ ra hoành tráng nhưng không bao giờ được gọi đến.'
  },

  // 2. Khởi động (Kích thích trực giác)
  {
    type: 'concept_intro',
    interactionType: 'selection',
    title: 'Nút bấm tàng hình',
    question: "Bạn dành cả tuần để viết một Controller Servlet cực kỳ xịn xò để xử lý tính năng 'Thống kê Doanh thu'. Code chạy hoàn hảo trên local. Nhưng khi đưa lên môi trường thực tế, không một khách hàng hay sếp nào dùng được tính năng này.\n\nNguyên nhân ngớ ngẩn nhất có thể xảy ra ở đây là gì?",
    options: [
      { id: 'a', label: 'A. Code của bạn chưa được tối ưu hiệu năng.', isCorrect: false },
      { id: 'b', label: "B. Đội UI/UX quên đặt một cái nút 'Xem thống kê' trên màn hình giao diện (View) để gọi xuống Controller đó.", isCorrect: true }
    ],
    explanation: [
      { text: "Chính xác! Dù backend của bạn có xịn đến đâu, nếu không có một 'cầu nối' từ bên ngoài để kích hoạt, tính năng đó coi như vô hình. Trong UML, ta gọi đây là Use Case mồ côi!" }
    ]
  },

  // 3. Phase 1: Tương tác 1 - Khởi động cỗ máy hỏng (Orphan Runner)
  {
    type: 'interactive',
    interactionType: 'orphan_runner',
    title: 'Dòng điện đứt quãng',
    instruction: "B-Bot đang muốn chạy thử tính năng ( Gửi thông báo SMS ) trong sơ đồ. Hãy nhấn RUN để xem hệ thống vận hành!",
    explanation: [
      { text: "Hệ thống không thể chạm tới chức năng này vì không có đường dẫn (Path) nào dẫn đến nó! Mọi Use Case cuối cùng đều phải bắt nguồn từ một Actor." }
    ]
  },

  // 4. Phase 1: Tương tác 2 - Radar rà quét lỗi (Highlight Diagram)
  {
    type: 'interactive',
    interactionType: 'highlight_diagram',
    title: 'Đi tìm bóng ma',
    instruction: "Radar của hệ thống phát hiện một Use Case đang trôi dạt trong không gian mà không có bất kỳ sợi dây liên kết nào. Hãy chạm vào nó để khoanh vùng!",
    nodes: [
      { id: 'n1', label: 'Quản trị viên', isSystem: true, icon: '👤', isCorrect: false },
      { id: 'n2', label: 'Quản lý Người dùng', isSystem: false, icon: '👥', isCorrect: false },
      { id: 'n3', label: 'Bảo trì Hệ thống', isSystem: false, icon: '⚙️', isCorrect: false },
      { id: 'n4', label: 'Tính năng Ẩn (Dead Code)', isSystem: false, icon: '👻', isCorrect: true } // Orphaned node
    ],
    explanation: [
      { text: "Bạn đã tóm được bóng ma! Một khối Oval bơ vơ, xung quanh không có sợi dây nào chính là một mã chết (Dead Code)." }
    ]
  },

  // 5. Chốt Kiến Thức 1
  {
    type: 'theory',
    title: 'Use Case Mồ Côi (Orphaned Use Case)',
    content: `**Định nghĩa:**
Là một Use Case nằm trong hệ thống nhưng KHÔNG ĐƯỢC KẾT NỐI với bất kỳ Actor nào, cũng không có mối quan hệ \`<<include>>\` hay \`<<extend>>\` với Use Case khác.

**Bản chất lập trình:**
Tương đương với một đoạn mã "Dead Code" (Một endpoint API hoặc một Servlet được định nghĩa nhưng không có bất kỳ Client nào gửi Request tới).`,
    image: 'orphan_trap'
  },

  // 6. Phase 2: Giải cứu Use Case - Tìm người nhận nuôi (Click Connect)
  {
    type: 'interactive',
    interactionType: 'click_connect',
    title: 'Tìm kẻ chủ mưu',
    instruction: "Chức năng ( Sao lưu Dữ liệu ) đang bị mồ côi. Theo nghiệp vụ, chức năng này do Hệ thống Tự động chạy mỗi ngày lúc 2h sáng. Hãy nối nó với đúng người kích hoạt!",
    nodes: [
      { id: 'admin', label: 'Quản lý', type: 'actor' },
      { id: 'trigger', label: 'Time Trigger (Hẹn giờ)', type: 'actor' },
      { id: 'backup', label: 'Sao lưu Dữ liệu', type: 'usecase' }
    ],
    correctConnections: [
      { from: 'trigger', to: 'backup', type: 'association' }
    ],
    explanation: [
      { text: "Kết nối thành công! Đôi khi Actor không phải là con người, mà là một hệ thống bên ngoài hoặc một bộ đếm thời gian (Time Trigger)." }
    ]
  },

  // 7. Phase 2: Giải cứu Use Case - Sáp nhập gia đình (Equation Builder)
  {
    type: 'interactive',
    interactionType: 'equation_builder',
    title: 'Tái hòa nhập cộng đồng',
    instruction: "Chức năng ( Cập nhật Điểm Thưởng ) đang bị mồ côi. Thực chất, nó là một bước bắt buộc phải chạy NGẦM mỗi khi khách hàng hoàn tất ( Mua Hàng ). Hãy nối chúng lại!",
    options: [
      { id: 'mua', label: 'Mua Hàng' },
      { id: 'diem', label: 'Cập nhật Điểm Thưởng' },
      { id: 'inc', label: '<<include>>' },
      { id: 'ext', label: '<<extend>>' }
    ],
    slots: [
      { id: 's1', label: 'Use Case gốc' },
      { id: 's2', label: 'Quan hệ' },
      { id: 's3', label: 'Use Case phụ thuộc' }
    ],
    correctMapping: ['mua', 'inc', 'diem'],
    explanation: [
      { text: "Chuẩn xác! Nếu một Use Case không do Actor trực tiếp gọi, nó phải được gọi ngầm bởi một Use Case khác thông qua Include/Extend!" }
    ]
  },

  // 8. Chốt Kiến Thức 2
  {
    type: 'theory',
    title: 'Luật: Không ai bị bỏ lại phía sau',
    content: `Để sửa lỗi Use Case mồ côi, bạn có 2 giải pháp:

1. **Nối trực tiếp với Actor:** Nếu chức năng đó do một tác nhân (người dùng, phần cứng, hệ thống hẹn giờ) chủ động kích hoạt.
2. **Nối với một Use Case khác:** Dùng \`<<include>>\` hoặc \`<<extend>>\` nếu chức năng đó chỉ chạy ngầm như một bước phụ thuộc của một hành trình lớn hơn.

**Luật bất biến:** Mọi chức năng trong hệ thống cuối cùng đều phải truy xuất ngược về được một Primary Actor!`
  },

  // 9. Boss Cuối: Skill Check Transition
  {
    type: 'skill_check_transition',
    title: 'Skill check',
    subtitle: 'Giải cứu Mã Chết'
  },

  // 10. Skill Check 1 (MCQ)
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 1 (Kiểm tra Tư duy Phân tích)',
    question: "Bạn phát hiện một Use Case mồ côi tên là ( Xuất Báo Cáo Excel ). Sau khi hỏi lại khách hàng, họ nói rằng tính năng này chả ai dùng tới nữa vì đã có biểu đồ Dashboard rồi. Bạn nên làm gì?",
    options: [
      { id: 'a', label: 'A. Cố gắng nối nó với Admin bằng một đường Association cho đúng luật UML.', isCorrect: false },
      { id: 'b', label: 'B. Nối nó vào một Use Case bất kỳ bằng <<extend>>.', isCorrect: false },
      { id: 'c', label: 'C. Thẳng tay XÓA BỎ Use Case này khỏi sơ đồ để tránh lãng phí công sức code.', isCorrect: true }
    ],
    explanation: [
      { text: "Đôi khi Use Case mồ côi xuất hiện là do yêu cầu (Requirement) đã lỗi thời. Việc dũng cảm cắt bỏ những tính năng không còn giá trị là tố chất của một kỹ sư giỏi!" }
    ]
  },

  // 11. Skill Check 2 (Highlight Diagram)
  {
    type: 'skill_check',
    interactionType: 'highlight_diagram',
    title: 'Câu 2 (Cảnh sát bắt lỗi UML)',
    question: "Hãy chạm vào Use Case đang trở thành 'Mã chết' (Dead Code) do bị đứt gãy luồng giao tiếp!",
    nodes: [
      { id: 'c1', label: 'Khách hàng', isSystem: true, icon: '👤', isCorrect: false },
      { id: 'c2', label: 'Xem Giỏ Hàng', isSystem: false, icon: '🛒', isCorrect: false },
      { id: 'c3', label: 'Nhập Mã Giảm Giá (extend)', isSystem: false, icon: '🎫', isCorrect: false },
      { id: 'c4', label: 'Xóa Lịch Sử Tìm Kiếm', isSystem: false, icon: '🗑️', isCorrect: true }
    ],
    explanation: [
      { text: "Đúng vậy! Xóa Lịch Sử Tìm Kiếm nằm trơ trọi không ai kích hoạt. Trong code, nó tương đương với một REST endpoint không bao giờ được View gọi tới." }
    ]
  },

  // 12. Skill Check 3 (Ordering)
  {
    type: 'skill_check',
    interactionType: 'ordering',
    title: 'Câu 3 (Thiết kế hoàn chỉnh)',
    question: "Quy trình chuẩn để 'cấp cứu' một Use Case mồ côi khi rà soát sơ đồ là gì?",
    steps: [
      { id: 's1', content: 'Xác minh lại xem khách hàng có thực sự cần tính năng này không.' },
      { id: 's2', content: 'Nếu cần, xác định xem ai (hoặc cái gì) là người khởi phát nó.' },
      { id: 's3', content: 'Nối nó với Actor hoặc một Use Case khác.' }
    ],
    correctOrder: ['s1', 's2', 's3'],
    explanation: [
      { text: "Tuyệt vời! Rất chuyên nghiệp. Đầu tiên phải xác minh tính khả thi, sau đó mới tìm cách nối luồng." }
    ]
  }
];
