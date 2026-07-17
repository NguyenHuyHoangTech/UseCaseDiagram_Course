export const LESSON_DATA = [
  // 1. Khởi động (Kích thích trực giác)
  {
    type: 'concept_intro',
    interactionType: 'selection',
    title: 'Mảnh ghép cuối cùng',
    question: "Bạn đã có tất cả các mảnh ghép rời rạc đúng chuẩn UML. Tại sao chúng ta không nộp luôn danh sách các mảnh ghép này cho đội Dev bắt tay vào code, mà phải tốn công vẽ chúng lên cùng một bức tranh tổng thể?",
    options: [
      { id: 'a', label: 'A. Để bản thiết kế trông thẩm mỹ và giúp hồ sơ dự án dày hơn.', isCorrect: false },
      { id: 'b', label: "B. Vì một hệ thống phần mềm là sự giao tiếp liên tục. Việc ghép lại giúp kỹ sư nhìn thấy 'bức tranh lớn' (Big Picture) và phát hiện xung đột trước khi code.", isCorrect: true }
    ],
    explanation: [
      { text: "Chính xác! Lắp ráp lại là cách duy nhất để kiểm tra xem kiến trúc của chúng ta có thực sự 'chạy' được logic nghiệp vụ hay không!" }
    ]
  },

  // 2. Phase 1: Chuẩn bị Vật tư (Drag to Bins)
  {
    type: 'interactive',
    interactionType: 'drag_to_bins',
    title: 'Điểm danh đội hình',
    instruction: "Hãy sắp xếp toàn bộ thực thể của dự án Bãi gửi xe vào đúng 3 nhóm để chuẩn bị đưa lên bản vẽ.",
    items: [
      { id: 'cu', label: 'Cư dân' },
      { id: 'bql', label: 'Ban quản lý' },
      { id: 'cam', label: 'Camera AI' },
      { id: 'xt', label: '(Xác thực thẻ xe)' },
      { id: 'lt', label: '(Lưu trữ thông tin)' },
      { id: 'cb', label: '(Gửi cảnh báo)' },
      { id: 'db', label: 'Database Server' },
      { id: 'bv', label: 'Bảo vệ' }
    ],
    bins: [
      {
        id: 'left_bin',
        label: 'Giỏ 1 (Primary Actor)',
        accepts: ['cu', 'bql', 'cam']
      },
      {
        id: 'middle_bin',
        label: 'Giỏ 2 (Use Case)',
        accepts: ['xt', 'lt', 'cb']
      },
      {
        id: 'right_bin',
        label: 'Giỏ 3 (Secondary Actor)',
        accepts: ['db', 'bv']
      }
    ],
    explanation: [
      { text: "Tất cả vật tư đã sẵn sàng! Chuyển sang Đấu trường Sandbox ngay bây giờ." }
    ]
  },

  // 3. Phase 2: Đấu trường Sandbox
  {
    type: 'interactive',
    interactionType: 'final_sandbox',
    title: 'Bản vẽ Tối thượng',
    instruction: "Các khối đã được sắp xếp vào đúng vị trí! Nhiệm vụ cuối cùng của bạn là ĐẤU DÂY cho hệ thống. Click vào 2 khối để tạo liên kết (Association, Include, hoặc Extend) đúng như tài liệu mô tả.",
    hint: "Hãy cẩn thận chiều mũi tên của Include và Extend!"
  },

  // 4. Chốt Kiến Thức
  {
    type: 'theory',
    title: 'Tác phẩm của Kiến trúc sư',
    content: `Một sơ đồ Use Case hoàn chỉnh là một tài liệu sống. Nó không chỉ liệt kê tính năng mà còn chỉ rõ mạch máu (luồng dữ liệu) chảy trong hệ thống.

Giữ sơ đồ tuân thủ luật Trái-Phải và quy tắc mũi tên sẽ giúp bất kỳ lập trình viên nào nhìn vào cũng có thể hình dung ra ngay cấu trúc code cần thiết.`,
    image: 'final_architecture'
  },

  // 5. Boss Cuối: Skill Check Transition
  {
    type: 'skill_check_transition',
    title: 'Đỉnh cao Mastery',
    subtitle: 'Trận chiến cuối cùng'
  },

  // 6. Skill Check 1 (MCQ)
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 1 (Tư duy Bảo trì Hệ thống)',
    question: "Một tháng sau, Ban quản lý yêu cầu: 'Chỉ gửi cảnh báo cho Bảo vệ nếu đó là xe ô tô'. Bạn sẽ tối ưu sơ đồ vừa vẽ như thế nào?",
    options: [
      { id: 'a', label: 'A. Đổi mũi tên <<extend>> thành <<include>> cho chắc chắn.', isCorrect: false },
      { id: 'b', label: 'B. Giữ nguyên cấu trúc sơ đồ, chỉ cần cập nhật lại Điều kiện (Extension Condition) tại điểm rẽ nhánh.', isCorrect: true },
      { id: 'c', label: 'C. Xóa Use Case (Gửi cảnh báo) đi và rẽ nhánh bằng Association.', isCorrect: false }
    ],
    explanation: [
      { text: "Sự ưu việt của kiến trúc rẽ nhánh <<extend>> là cô lập được các logic phức tạp. Bạn chỉ cần sửa tham số điều kiện ở điểm rẽ nhánh mà không làm ảnh hưởng đến chức năng cốt lõi!" }
    ]
  },

  // 7. Skill Check 2 (Visual Select Edge/Node - using selection for simplicity here, or block_mapping)
  // The prompt asks to "chạm vào Use Case đóng vai trò trung tâm (Hub)". Since we don't have a visual node selector designed yet, we can use a standard MCQ with images or text.
  // Actually, we can use `selection` with icons.
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 2 (Bắt mạch hệ thống)',
    question: "Nhìn vào sơ đồ Bãi gửi xe, khối Use Case nào đóng vai trò trung tâm (Hub), nơi chứa logic if/else phức tạp nhất để quyết định việc gọi thêm các chức năng phụ trợ khác?",
    options: [
      { id: 'lt', label: '( Lưu trữ thông tin )', isCorrect: false, icon: '💾' },
      { id: 'xt', label: '( Xác thực thẻ xe )', isCorrect: true, icon: '🔑' },
      { id: 'ql', label: '( Quản lý thẻ xe )', isCorrect: false, icon: '⚙️' }
    ],
    explanation: [
      { text: "Khối Xác thực thẻ xe vừa nhận Request từ Cư dân, vừa phải gọi logic Lưu trữ, lại vừa mở cổng chờ xử lý ngoại lệ. Trong MVC2, đây sẽ là một Controller gánh vác luồng logic nghiệp vụ cực kỳ quan trọng!" }
    ]
  },

  // 8. Skill Check 3 (Ordering)
  {
    type: 'skill_check',
    interactionType: 'ordering',
    title: 'Câu 3 (Luật UML cuối cùng)',
    instruction: "Sắp xếp lại checklist 3 bước tối thượng của một Use Case Diagram chuẩn mực.",
    items: [
      { id: 'i1', label: 'Không có Actor nào lọt thỏm bên trong Ranh giới Hệ thống.' },
      { id: 'i2', label: 'Mọi Use Case đều kết nối liền mạch, không tồn tại mã chết (mồ côi).' },
      { id: 'i3', label: 'Mũi tên nét đứt chỉ liên lạc nội bộ giữa Use Case, tuyệt đối không đâm ra ngoài Actor.' }
    ],
    correctOrder: ['i1', 'i2', 'i3'],
    explanation: [
      { text: "Checklist hoàn hảo! Nếu sơ đồ của bạn thỏa mãn 3 điều này, nó đã sẵn sàng để bàn giao cho đội Development." }
    ]
  },

  // 9. Course Complete Transition (Triggers the grand finale)
  {
    type: 'course_complete',
    title: 'Course Mastery',
    subtitle: 'Bạn đã chính thức trở thành Bậc thầy Kiến trúc Use Case!'
  }
];
