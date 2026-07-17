export const LESSON_DATA = [
  // 1. Màn hình Khởi động
  {
    type: 'intro_anim',
    title: 'LEVEL 4: Refining the Diagram',
    subtitle: 'Tối ưu Sơ đồ - Bẫy CRUD',
    description: 'Một sơ đồ Use Case tốt không chỉ ĐÚNG mà còn phải ĐẸP, GỌN GÀNG và CHUYÊN NGHIỆP. Hãy cùng loại bỏ những "bóng ma" của code backend ra khỏi bản vẽ thiết kế!'
  },

  // 2. Khởi động (Kích thích trực giác)
  {
    type: 'concept_intro',
    interactionType: 'selection',
    title: 'Băm nhỏ hay Gộp chung?',
    question: "Bạn đang thiết kế tính năng quản lý thẻ từ vựng cho ứng dụng Cóc Cam Anki. Để thao tác với dữ liệu thẻ, bản chất bên dưới code Java bạn phải viết 4 hàm JDBC: insert(), select(), update(), và delete().\n\nKhi vẽ sơ đồ Use Case để nộp cho khách hàng xem, bạn có nên vẽ 4 khối Oval riêng biệt cho 4 hàm này không?",
    options: [
      { id: 'a', label: 'A. Có, vẽ càng chi tiết từng hàm thì khách hàng càng dễ hiểu logic code.', isCorrect: false },
      { id: 'b', label: "B. Không, khách hàng chỉ quan tâm đến việc 'Quản lý thẻ', hãy gộp chúng lại thành 1 khối duy nhất.", isCorrect: true }
    ],
    explanation: [
      { text: "Hoàn toàn chính xác! Khách hàng không cần biết bạn dùng câu lệnh SQL UPDATE hay DELETE thế nào. Việc vẽ 4 khối riêng biệt chỉ làm sơ đồ thêm rối rắm rác rưởi!" }
    ]
  },

  // 3. Phase 1: Tương tác 1 - Căn bệnh "Spaghetti" (CRUD Smash)
  {
    type: 'interactive',
    interactionType: 'crud_smash',
    title: 'Giải cứu sơ đồ',
    instruction: "Một kỹ sư Backend quen tay đã băm nát tính năng của Giảng viên thành 4 Use Case riêng lẻ, khiến các đường nối chéo nhau như mạng nhện. Hãy chạm vào các khối CRUD thừa thãi để gộp chúng lại!",
    explanation: [
      { text: "Gọn gàng, sạch sẽ và cực kỳ chuyên nghiệp! Bạn vừa dọn dẹp xong căn bệnh 'Spaghetti' kinh điển của sinh viên IT." }
    ]
  },

  // 4. Phase 1: Tương tác 2 - Phân loại rạch ròi (Drag to Bins)
  {
    type: 'interactive',
    interactionType: 'drag_to_bins',
    title: 'Code vs. Nghiệp vụ',
    instruction: "Kéo thả các cụm từ sau vào đúng thế giới của nó: Thế giới của Code (CRUD) và Thế giới của Sơ đồ (Use Case).",
    items: [
      { id: 'insert', label: 'INSERT INTO Users' },
      { id: 'quan_ly', label: 'Quản lý Tài khoản' },
      { id: 'update', label: 'Cập nhật (Update) mật khẩu' },
      { id: 'thiet_lap', label: 'Thiết lập Hệ thống' }
    ],
    bins: [
      {
        id: 'code',
        label: 'Bẫy CRUD (Thuộc về Code)',
        accepts: ['insert', 'update']
      },
      {
        id: 'usecase',
        label: 'Chuẩn Use Case (Gộp nhóm)',
        accepts: ['quan_ly', 'thiet_lap']
      }
    ],
    explanation: [
      { text: "Dấu hiệu nhận biết Bẫy CRUD là các động từ quá mang tính chất thao tác cơ sở dữ liệu (Insert, Update, Delete). Hãy thay thế chúng bằng các từ khóa cấp cao hơn như Quản lý, Thiết lập, Cấu hình." }
    ]
  },

  // 5. Chốt Kiến Thức 1
  {
    type: 'theory',
    title: 'Bẫy CRUD (CRUD Trap)',
    content: `**Lỗi thường gặp:**
Liệt kê chi tiết các thao tác Create, Read, Update, Delete thành các Use Case riêng biệt. Điều này khiến sơ đồ bị phình to, rối mắt và mang nặng tính kỹ thuật.

**Giải pháp:**
Hãy gộp chúng lại thành một Use Case duy nhất đại diện cho giá trị tổng thể.
Ví dụ: Dùng từ khóa **"Quản lý..."**, **"Thiết lập..."**, hoặc **"Cấu hình..."**.`,
    image: 'crud_trap'
  },

  // 6. Phase 2: Áp dụng vào Kiến trúc MVC (Block Mapping)
  {
    type: 'interactive',
    interactionType: 'block_mapping',
    title: 'Lớp vỏ bọc hoàn hảo',
    instruction: "Lắp ráp sơ đồ tư duy để thấy cách một Use Case duy nhất bao bọc toàn bộ các thao tác backend phức tạp bên trong.",
    options: [
      { id: 'uc', label: 'Quản lý Flashcard' },
      { id: 'db', label: 'Bảng dữ liệu (Table)' },
      { id: 'logic', label: 'Xử lý if/else (Thêm, Sửa, Xóa)' }
    ],
    slots: [
      { id: 's1', label: 'Sơ đồ Use Case' },
      { id: 's2', label: 'Controller/Servlet' },
      { id: 's3', label: 'Tầng Database' }
    ],
    correctMapping: ['uc', 'logic', 'db'],
    explanation: [
      { text: "Đúng vậy! 'Quản lý Flashcard' chỉ là cái vỏ bọc trên bản vẽ. Còn khi bắt tay vào code, cái Controller của bạn mới là nơi chứa logic Thêm/Sửa/Xóa dựa trên các parameter gửi lên từ View!" }
    ]
  },

  // 7. Chốt Kiến Thức 2
  {
    type: 'theory',
    title: 'Giữ Sơ đồ sạch sẽ',
    content: `**Tầng Phân tích (Sơ đồ Use Case):**
Chỉ cần trả lời câu hỏi: Hệ thống làm được gì? (What)

**Tầng Thiết kế Chi tiết (Sơ đồ Lớp / Tuần tự):**
Mới là nơi bạn vẽ ra các hàm CRUD để giao tiếp với Database thông qua JDBC. (How)

**Nghệ thuật của kỹ sư:** Biết cái gì nên vẽ ra, cái gì nên giấu đi!`
  },

  // 8. Boss Cuối: Skill Check (Question 1)
  {
    type: 'skill_check_transition',
    title: 'Skill check',
    subtitle: 'Thanh lọc Sơ đồ Rác'
  },
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 1 (Phân tích Logic)',
    question: "Khi nào thì việc tách riêng chức năng 'Xóa' ra thành một Use Case độc lập là HỢP LÝ và KHÔNG dính bẫy CRUD?",
    options: [
      { id: 'a', label: 'A. Khi hàm Delete trong code quá dài và phức tạp.', isCorrect: false },
      { id: 'b', label: "B. Khi 'Xóa' là một luồng nghiệp vụ đặc thù có sự tham gia của một Actor khác (Ví dụ: Chỉ Admin mới được Xóa).", isCorrect: true },
      { id: 'c', label: "C. Không bao giờ được tách, luôn luôn phải gộp vào chữ 'Quản lý'.", isCorrect: false }
    ],
    explanation: [
      { text: "Mọi quy tắc đều có ngoại lệ. Nếu quyền hạn (Actor) đối với các thao tác CRUD là giống hệt nhau, ta sẽ gộp chung. Nhưng nếu một thao tác có Actor riêng biệt hoặc luồng phê duyệt phức tạp, ta bắt buộc phải tách nó ra!" }
    ]
  },

  // 9. Boss Cuối: Skill Check 2 (Highlight Diagram)
  {
    type: 'skill_check',
    interactionType: 'highlight_diagram',
    title: 'Câu 2 (Cảnh sát bắt lỗi UML)',
    question: "Sơ đồ quản lý hàng hóa này đang bị dính bẫy CRUD nặng nề. Hãy chạm vào Use Case nên ĐƯỢC GIỮ LẠI làm vỏ bọc, thay vì các thao tác lẻ tẻ!",
    nodes: [
      { id: 'quan_ly', label: 'Quản lý Danh mục hàng', isSystem: false, icon: '📦', isCorrect: true },
      { id: 'them', label: 'Thêm Hàng hóa', isSystem: false, icon: '➕', isCorrect: false },
      { id: 'doc', label: 'Đọc dữ liệu Hàng hóa', isSystem: false, icon: '👁️', isCorrect: false }
    ],
    explanation: [
      { text: "Chính xác! Bạn chỉ cần giữ lại 'Quản lý Danh mục hàng'. Các thao tác 'Thêm' hay 'Đọc' sẽ được ngầm hiểu là nằm gọn trong từ khóa 'Quản lý'." }
    ]
  },

  // 10. Boss Cuối: Skill Check 3 (Ordering)
  {
    type: 'skill_check',
    interactionType: 'ordering',
    title: 'Câu 3 (Sắp xếp Tư duy)',
    question: "Bạn nhận được một tài liệu yêu cầu (Requirements) chi chít các gạch đầu dòng từ khách hàng. Hãy sắp xếp các bước tối ưu hóa sơ đồ Use Case.",
    steps: [
      { id: 's1', content: 'Gom nhóm các yêu cầu có cùng đối tượng tác động (VD: User).' },
      { id: 's2', content: 'Gộp các thao tác Thêm/Sửa/Xóa đơn thuần thành Use Case "Quản lý...".' },
      { id: 's3', content: 'Tách riêng các thao tác có phân quyền đặc biệt ra thành Use Case độc lập.' }
    ],
    correctOrder: ['s1', 's2', 's3'],
    explanation: [
      { text: "Tuyệt vời! Đây chính là quy trình chuẩn mực của một kỹ sư thiết kế hệ thống chuyên nghiệp." }
    ]
  }
];
