export const LESSON_DATA = [
  // 1. Màn hình Khởi động
  {
    type: 'intro_anim',
    title: 'Bài 3: Mì Spaghetti',
    subtitle: 'Tránh giao cắt trong Sơ đồ',
    description: 'Sau khi dọn dẹp logic, sơ đồ của bạn đã ĐÚNG. Nhưng nó đã DỄ ĐỌC chưa? Một bản thiết kế rối rắm như tơ vò sẽ phá hỏng hoàn toàn mục đích giao tiếp của nó!'
  },

  // 2. Khởi động (Kích thích trực giác)
  {
    type: 'concept_intro',
    interactionType: 'selection',
    title: 'Ma trận dây điện',
    question: "Bạn bàn giao sơ đồ Use Case cho một bạn lập trình viên khác trong team để bắt đầu code. Sơ đồ này vẽ đúng 100% logic, nhưng các đường nối từ Actor đến Use Case cắt chéo nhau loạn xạ như một nùi dây điện.\n\nHậu quả lớn nhất của một sơ đồ 'Spaghetti' là gì?",
    options: [
      { id: 'a', label: 'A. Code sinh ra từ sơ đồ này sẽ chạy chậm hơn.', isCorrect: false },
      { id: 'b', label: 'B. Trình biên dịch (Compiler) sẽ báo lỗi không đọc được sơ đồ.', isCorrect: false },
      { id: 'c', label: "C. Không ai muốn đọc nó, dẫn đến việc team Dev có thể hiểu sai yêu cầu và code sai tính năng.", isCorrect: true }
    ],
    explanation: [
      { text: "Chính xác! Sơ đồ UML sinh ra là để CON NGƯỜI giao tiếp với nhau. Nếu nó quá rối rắm, giá trị giao tiếp bằng 0. Thẩm mỹ chính là chất lượng!" }
    ]
  },

  // 3. Phase 1: Tương tác 1 - Trả lại vị trí (Drag to Bins)
  {
    type: 'interactive',
    interactionType: 'drag_to_bins',
    title: 'Trật tự thế giới',
    instruction: "Cách nhanh nhất để giảm 50% sự giao cắt là đặt các Actor về đúng phe của nó. Hãy kéo thả các thực thể của hệ thống Cóc Cam Anki vào đúng vị trí Trái - Phải.",
    items: [
      { id: 'sv', label: 'Sinh viên' },
      { id: 'ctt', label: 'Cổng thanh toán' },
      { id: 'email', label: 'Hệ thống gửi Email' },
      { id: 'gv', label: 'Giảng viên' }
    ],
    bins: [
      {
        id: 'trai',
        label: 'Lề Bên TRÁI (Primary Actor)',
        accepts: ['sv', 'gv']
      },
      {
        id: 'phai',
        label: 'Lề Bên PHẢI (Secondary Actor)',
        accepts: ['ctt', 'email']
      }
    ],
    explanation: [
      { text: "Tuyệt vời! Đây là quy tắc vàng: Dòng chảy nghiệp vụ luôn đi từ Trái (Kẻ ra lệnh) sang Phải (Kẻ phục vụ). Giữ quy tắc này, sơ đồ của bạn sẽ tự động thoáng đãng hơn rất nhiều." }
    ]
  },

  // 4. Phase 1: Tương tác 2 - Chỉnh trang đội hình (Ordering)
  {
    type: 'interactive',
    interactionType: 'ordering',
    title: 'Gom nhóm logic',
    instruction: "Khách hàng đứng bên Trái ngang tầm trên cùng. Cổng thanh toán đứng bên Phải ngang tầm dưới cùng. Bên trong hộp đang có 3 Use Case xếp lộn xộn. Hãy sắp xếp chúng lại từ trên xuống dưới để đường nối không bị chéo!",
    steps: [
      { id: 's1', content: '( Chọn Khóa Học )' },
      { id: 's2', content: '( Đổi Mật Khẩu )' },
      { id: 's3', content: '( Thanh toán )' }
    ],
    correctOrder: ['s1', 's2', 's3'], // Changed to match logic layout for this specific flow
    explanation: [
      { text: "Đỉnh cao! Bằng cách nhóm các Use Case lại cho khớp với chiều cao của Actor tương ứng, các đường dây nối sẽ tự động song song và duỗi thẳng." }
    ]
  },

  // 5. Chốt Kiến Thức 1
  {
    type: 'theory',
    title: 'Nghệ thuật Layout (Bố cục)',
    content: `**Quy tắc 1: Dòng chảy Trái - Giữa - Phải**
- **Trái:** Primary Actor (Người chủ động)
- **Giữa:** Hệ thống và các Use Case
- **Phải:** Secondary Actor (Hệ thống hỗ trợ)

**Quy tắc 2: Gom nhóm theo chiều dọc**
Các Use Case phục vụ cùng một Actor nên được xếp gần nhau theo chiều dọc. Tránh việc Actor nằm ở tít trên cùng nhưng Use Case lại nằm ở tận dưới đáy sơ đồ gây giao cắt chéo.`,
    image: 'layout_rules'
  },

  // 6. Phase 2: Tương tác 3 - Thanh trượt ma thuật (Slider Exploratory)
  {
    type: 'interactive',
    interactionType: 'slider_exploratory',
    title: 'Thuật Nhân bản (Duplication)',
    instruction: "Kéo thanh trượt để xem thủ thuật gỡ rối khi có quá nhiều đường nối tập trung vào một Actor duy nhất (Ví dụ: Database Server).",
    leftState: {
      title: 'Spaghetti (Rối tung)',
      description: 'Một khối [ Database ] phải hứng 15 đường nối từ khắp mọi nơi, cắt chéo toàn bộ sơ đồ.'
    },
    rightState: {
      title: 'Nhân bản (Gọn gàng)',
      description: 'Nhân bản [ Database ] thành 2 khối đặt ở trên và dưới. Đường nối tự chia 2 ngả thẳng tắp.'
    },
    explanation: [
      { text: "UML cho phép bạn vẽ một Actor NHIỀU LẦN trên cùng một sơ đồ để tránh giao cắt đường thẳng, miễn là chúng cùng tên!" }
    ]
  },

  // 7. Phase 2: Tương tác 4 - Xóa mờ ranh giới (Highlight Diagram)
  {
    type: 'interactive',
    interactionType: 'highlight_diagram',
    title: 'Quá tải Ranh giới',
    instruction: "Sơ đồ hệ thống quản lý đang nhét 50 Use Case vào một hộp System Boundary duy nhất, đường nối chằng chịt. Hãy chạm vào cái ranh giới khổng lồ này để phá vỡ nó và 'Module hóa'!",
    nodes: [
      { id: 'boundary', label: 'Hệ Thống (50 Use Cases)', isSystem: true, icon: '📦', isCorrect: true },
      { id: 'user', label: 'User', isSystem: false, icon: '👤', isCorrect: false }
    ],
    explanation: [
      { text: "Bùm! Thay vì vẽ 1 bản đồ thế giới khổng lồ, hãy xẻ nó ra thành 3 Module riêng biệt: Quản lý User, Thanh Toán, và Học Tập. Chia để trị!" }
    ]
  },

  // 8. Chốt Kiến Thức 2
  {
    type: 'theory',
    title: 'Xử lý Sơ đồ Khổng lồ',
    content: `Khi hệ thống thực tế quá lớn, việc giao cắt là không thể tránh khỏi nếu cố nhét tất cả vào một bức vẽ.

Hãy dùng 2 kỹ thuật lách luật:
1. **Nhân bản Actor:** Cùng một Actor có thể xuất hiện 2, 3 lần ở các góc khác nhau trên bản vẽ.
2. **Phân rã Module:** Xóa bỏ hộp Hệ Thống lớn, chia nhỏ thành các gói (Package/Module) và vẽ mỗi sơ đồ Use Case cho từng phân hệ riêng biệt.`
  },

  // 9. Boss Cuối: Skill Check Transition
  {
    type: 'skill_check_transition',
    title: 'Skill check',
    subtitle: 'Cảnh Sát Giao Thông'
  },

  // 10. Skill Check 1 (MCQ)
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 1 (Tư duy Kiến trúc)',
    question: "Bạn đang vẽ sơ đồ Use Case cho Web App. Khối [ Khách hàng ] ở bên trái có đường Association cắm chéo tít sang khối ( Cập nhật Avatar ) nằm ở góc dưới cùng bên phải, cắt qua 3 đường khác. Cách giải quyết tốt nhất là gì?",
    options: [
      { id: 'a', label: 'A. Dùng các đường cong hoặc dích dắc để lách qua các đường khác.', isCorrect: false },
      { id: 'b', label: 'B. Xóa bỏ Use Case đó đi cho đỡ rối.', isCorrect: false },
      { id: 'c', label: 'C. Đổi vị trí khối ( Cập nhật Avatar ) sang gần với khối [ Khách hàng ] ở bên trái hơn.', isCorrect: true }
    ],
    explanation: [
      { text: "Ưu tiên hàng đầu luôn là tối ưu Layout (Sắp xếp vị trí) trước. Đừng cố uốn cong đường thẳng, hãy dời cái khối đó lại gần Actor!" }
    ]
  },

  // 11. Skill Check 2 (Highlight Diagram)
  {
    type: 'skill_check',
    interactionType: 'highlight_diagram',
    title: 'Câu 2 (Cảnh sát bắt lỗi UML)',
    instruction: "Hãy chạm vào đường giao cắt KHÔNG THỂ TRÁNH KHỎI và được phép chấp nhận trong thực tế!",
    nodes: [
      { id: 'n1', label: 'Đường cắt chéo giữa 2 Actor', isSystem: false, icon: '❌', isCorrect: false },
      { id: 'n2', label: 'Hai đường Include cắt nhau', isSystem: false, icon: '❌', isCorrect: false },
      { id: 'n3', label: 'Đường Association cắt Ranh Giới (Boundary)', isSystem: false, icon: '✅', isCorrect: true }
    ],
    explanation: [
      { text: "Chính xác! Đường Association NỐI TỪ bên ngoài vào bên trong chắc chắn PHẢI CẮT QUA Ranh giới hệ thống (System Boundary). Đó là giao cắt hợp lý duy nhất!" }
    ]
  },

  // 12. Skill Check 3 (Block Mapping)
  {
    type: 'skill_check',
    interactionType: 'block_mapping',
    title: 'Câu 3 (Giải quyết bài toán)',
    instruction: "Hệ thống TTKPianoCenter quá lớn với 40 chức năng. Hãy thiết lập cấu trúc tài liệu tối ưu nhất thay vì ném tất cả vào 1 sơ đồ.",
    options: [
      { id: 'tong', label: 'Sơ đồ Tổng quan (Actor - Module)' },
      { id: 'kho', label: 'Sơ đồ Module Quản lý Kho' },
      { id: 'ban', label: 'Sơ đồ Module Bán Hàng' }
    ],
    slots: [
      { id: 's1', label: 'Sơ đồ cấp cao (Level 0)' },
      { id: 's2', label: 'Chi tiết phân hệ 1' },
      { id: 's3', label: 'Chi tiết phân hệ 2' }
    ],
    correctMapping: ['tong', 'kho', 'ban'],
    explanation: [
      { text: "Thật chuyên nghiệp! Cấu trúc top-down (từ tổng quan đến chi tiết) chính là bí quyết của các Solution Architect hàng đầu." }
    ]
  }
];
