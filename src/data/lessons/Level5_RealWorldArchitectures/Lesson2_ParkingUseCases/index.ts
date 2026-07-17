export const LESSON_DATA = [
  // 1. Màn hình Khởi động
  {
    type: 'intro_anim',
    title: 'Bài 2: Vắt kiệt Động từ',
    subtitle: 'Trích xuất Core Use Case',
    description: 'Chúng ta đã có Tác nhân (Actor). Bây giờ, hãy lấp đầy Ranh giới Hệ thống bằng cách "săn tìm" các Chức năng cốt lõi (Use Case) ẩn giấu trong đoạn yêu cầu.'
  },

  // 2. Khởi động (Kích thích trực giác)
  {
    type: 'concept_intro',
    interactionType: 'selection',
    title: 'Cái bẫy của Hành vi vật lý',
    question: "Một kỹ sư đọc câu 'Cư dân tiến hành quẹt thẻ vào máy đọc' và lập tức vẽ ra một khối Use Case tên là ( Quẹt thẻ ). Theo bạn, cách đặt tên này có vấn đề gì không?",
    options: [
      { id: 'a', label: 'A. Không vấn đề gì, nó mô tả chính xác hành động của cư dân.', isCorrect: false },
      { id: 'b', label: "B. Có vấn đề. 'Quẹt thẻ' là thao tác cơ học. Phần mềm bên trong máy đọc thực chất đang làm nhiệm vụ ( Xác thực thẻ xe ).", isCorrect: true }
    ],
    explanation: [
      { text: "Chính xác! Sơ đồ Use Case mô tả NHỮNG GÌ PHẦN MỀM LÀM, chứ không mô tả tay chân người dùng chuyển động ra sao. Hãy dịch thao tác vật lý thành nghiệp vụ phần mềm!" }
    ]
  },

  // 3. Phase 1: Màng lọc Động từ (Text Highlight)
  {
    type: 'interactive',
    interactionType: 'text_highlight',
    title: 'Săn tìm Nghiệp vụ cốt lõi',
    instruction: "Hãy chạm để highlight đúng 3 hành động cốt lõi mà phần mềm tự động xử lý khi có xe ra vào.",
    text: "Hệ thống Quản lý Bãi gửi xe giúp kiểm soát xe ra vào tòa nhà. Khi xe đến cổng, Camera AI sẽ [nhận diện biển số]. Sau đó, Cư dân tiến hành quẹt thẻ vào máy đọc. Mọi thông tin xe ra vào đều bắt buộc phải [lưu trữ thông tin] vào Database Server. Nếu thẻ hết hạn hoặc không khớp biển số, hệ thống sẽ [gửi cảnh báo] cho Bảo vệ trực chốt. Ở cấp độ quản lý, Ban quản lý có thể đăng nhập để cấu hình hệ thống và thêm, sửa thông tin thẻ xe.",
    correctIds: ['nhận diện biển số', 'lưu trữ thông tin', 'gửi cảnh báo'],
    explanation: [
      { text: "Tuyệt vời! Đây chính là 3 Use Case chạy ngầm đằng sau các thiết bị phần cứng. (Nhận diện biển số, Lưu trữ thông tin, Gửi cảnh báo). Lưu ý: 'Tiến hành' hay 'giúp kiểm soát' chỉ là từ nối, không phải chức năng cụ thể." }
    ]
  },

  // 4. Phase 1: Tương tác 2 - Trị tận gốc căn bệnh CRUD (CRUDSmash)
  {
    type: 'interactive',
    interactionType: 'crud_smash',
    title: 'Lời nói dối của Ban quản lý',
    instruction: "Ở câu cuối cùng: 'Ban quản lý có thể đăng nhập để cấu hình hệ thống và thêm, sửa thông tin thẻ xe' đang chứa một cái bẫy CRUD. Hãy chạm vào các thao tác lẻ tẻ để gộp chúng lại!",
    actorName: 'Ban quản lý',
    targetLabel: 'Quản lý thẻ xe',
    crudNodes: [
      { id: 'c', label: 'Thêm thông tin thẻ xe', color: 'border-green-500 text-green-400', pos: 'top-16 left-16' },
      { id: 'u', label: 'Sửa thông tin thẻ xe', color: 'border-yellow-500 text-yellow-400', pos: 'top-16 right-16' }
    ],
    explanation: [
      { text: "Chuẩn! Đừng băm nát sơ đồ bằng các hàm Thêm/Sửa/Xóa. Hãy dùng từ khóa 'Quản lý' để gom nhóm các thao tác dữ liệu!" }
    ]
  },

  // 5. Chốt Kiến Thức
  {
    type: 'theory',
    title: 'Nguyên tắc 3 Màng lọc Động từ',
    content: `Khi biến văn bản thành Use Case, hãy đưa động từ qua 3 màng lọc:

1. **Lọc thao tác vật lý/UI:** 
Biến các từ *bấm nút, quẹt thẻ, nhìn màn hình* thành giá trị phần mềm *(Xác thực, Truy xuất)*.

2. **Lọc bẫy CRUD:** 
Gộp các cụm *thêm, sửa, xóa* thành **"Quản lý [Đối tượng]"**.

3. **Lọc từ sáo rỗng:** 
Bỏ qua các từ *giúp, tiến hành, làm cho, có thể*... vì chúng không chứa business logic cụ thể.`,
    image: 'verb_filter'
  },

  // 6. Phase 2: Ánh xạ vào Kiến trúc (Click Connect)
  {
    type: 'interactive',
    interactionType: 'click_connect',
    title: 'Ráp nối bức tranh',
    instruction: "Bạn đã có đủ nguyên liệu. Hãy nối Tác nhân (Primary Actor - Lề Trái) với đúng Chức năng (Use Case - Ở Giữa) dựa trên đoạn văn bản Requirement.",
    nodes: [
      // Actors
      { id: 'cam', label: 'Camera AI', type: 'actor' },
      { id: 'cu', label: 'Cư dân', type: 'actor' },
      { id: 'bql', label: 'Ban quản lý', type: 'actor' },
      // Use Cases
      { id: 'xt', label: 'Xác thực thẻ xe', type: 'usecase' },
      { id: 'nd', label: 'Nhận diện biển số', type: 'usecase' },
      { id: 'ql', label: 'Quản lý thẻ xe', type: 'usecase' }
    ],
    correctConnections: [
      { from: 'cam', to: 'nd', type: 'association' },
      { from: 'cu', to: 'xt', type: 'association' },
      { from: 'bql', to: 'ql', type: 'association' }
    ],
    explanation: [
      { text: "Bức tranh kiến trúc đã dần hình thành! Các Primary Actor đã được kết nối với đúng chức năng khởi phát của họ." }
    ]
  },

  // 7. Boss Cuối: Skill Check Transition
  {
    type: 'skill_check_transition',
    title: 'Skill check',
    subtitle: 'Trạm thu hoạch'
  },

  // 8. Skill Check 1 (MCQ)
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 1 (Tư duy Phân quyền)',
    question: "Tại sao chúng ta vẽ [ Ban quản lý ] nối với ( Cấu hình hệ thống ), nhưng lại KHÔNG vẽ [ Bảo vệ ] nối với chức năng này, dù họ cũng là nhân viên tòa nhà?",
    options: [
      { id: 'a', label: 'A. Vì vẽ thêm đường nối sẽ làm sơ đồ bị rối (Spaghetti).', isCorrect: false },
      { id: 'b', label: 'B. Vì theo nghiệp vụ thực tế, Bảo vệ không có quyền (Authorization) thay đổi cấu hình hệ thống. Đường nối trong UML cũng chính là mô tả phân quyền!', isCorrect: true },
      { id: 'c', label: 'C. Vì Bảo vệ đã đứng ở lề bên Phải rồi nên không được nối vào các chức năng bên trong nữa.', isCorrect: false }
    ],
    explanation: [
      { text: "Bất kỳ một sợi dây Association nào nối từ Actor đến Use Case đều đồng nghĩa với việc: 'Tác nhân này có QUYỀN thực thi chức năng này'. Nếu bạn nối sai, hệ thống thực tế sẽ bị hổng bảo mật!" }
    ]
  },

  // 9. Skill Check 2 (Visual Select / Highlight Diagram)
  {
    type: 'skill_check',
    interactionType: 'highlight_diagram',
    title: 'Câu 2 (Bắt lỗi Chuyển đổi Văn bản)',
    instruction: "Một lập trình viên đọc dòng 'Nếu thẻ... hệ thống sẽ gửi thông báo' và vẽ ra 3 Use Case dưới đây. Hãy chạm vào khối VÔ LÝ NHẤT (mô tả logic code chứ không phải nghiệp vụ) để xóa nó!",
    nodes: [
      { id: 'n1', label: 'Gửi cảnh báo', isSystem: false, icon: '⚠️', isCorrect: false },
      { id: 'n2', label: 'So sánh ngày hết hạn của thẻ', isSystem: false, icon: '📅', isCorrect: true },
      { id: 'n3', label: 'Xác thực thẻ xe', isSystem: false, icon: '✅', isCorrect: false }
    ],
    explanation: [
      { text: "Chính xác! Việc 'So sánh ngày hết hạn' chỉ là một lệnh if-else nhỏ nằm ẩn bên trong chức năng Xác thực thẻ xe. Nó không đủ lớn và độc lập để đứng thành một Use Case riêng biệt trên sơ đồ tổng thể!" }
    ]
  }
];
