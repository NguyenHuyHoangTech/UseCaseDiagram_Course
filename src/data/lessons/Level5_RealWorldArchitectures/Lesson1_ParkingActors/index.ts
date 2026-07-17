export const LESSON_DATA = [
  // 1. Màn hình Khởi động
  {
    type: 'intro_anim',
    title: 'LEVEL 5: Real-World Architectures',
    subtitle: 'Đãi cát tìm vàng - Nhận diện Tác nhân',
    description: 'Đến lúc rời khỏi môi trường lý thuyết! Bạn sẽ thiết kế một hệ thống thực tế kết hợp cả phần cứng và phần mềm: Hệ thống Quản lý Bãi gửi xe Tòa nhà.'
  },

  // 2. Khởi động (Kích thích trực giác)
  {
    type: 'concept_intro',
    interactionType: 'selection',
    title: 'Đứng trước một "rừng" chữ',
    question: "Khi nhận được đoạn yêu cầu (Requirement) bãi gửi xe từ chủ đầu tư tòa nhà, bước ĐẦU TIÊN của bạn khi phân tích hệ thống là gì?",
    options: [
      { id: 'a', label: 'A. Thiết kế ngay các bảng trong Database để lưu biển số xe.', isCorrect: false },
      { id: 'b', label: 'B. Lên danh sách các luồng tính năng (Use Case) mà hệ thống cần có.', isCorrect: false },
      { id: 'c', label: "C. Dùng bút dạ quang gạch chân xác định xem có những ai (hoặc thiết bị nào) sẽ tương tác với hệ thống.", isCorrect: true }
    ],
    explanation: [
      { text: "Chính xác! Trước khi xây nhà, phải biết nhà này dành cho ai ở. Bước 1 luôn là xác định Tác nhân (Actor) và Ranh giới (Boundary)!" }
    ]
  },

  // 3. Phase 1: Truy tìm Kép chính (Text Highlight)
  {
    type: 'interactive',
    interactionType: 'text_highlight',
    title: 'Đãi cát tìm "Kép chính"',
    instruction: "Primary Actor là người (hoặc thiết bị) CHỦ ĐỘNG khởi phát dữ liệu hoặc chuỗi hành động. Hãy chạm vào đoạn văn trên để highlight đúng 3 danh từ đóng vai trò là Primary Actor.",
    text: "Hệ thống Quản lý Bãi gửi xe giúp kiểm soát xe ra vào tòa nhà. Khi xe đến cổng, [Camera AI] sẽ nhận diện [biển số]. Sau đó, [Cư dân] tiến hành quẹt [thẻ cư dân] vào máy đọc. Mọi thông tin xe ra vào đều bắt buộc phải lưu trữ vào [Database Server]. Nếu thẻ hết hạn hoặc không khớp biển số, hệ thống sẽ gửi thông báo cảnh báo cho [Bảo vệ] trực chốt. Ở cấp độ quản lý, [Ban quản lý] có thể đăng nhập để cấu hình hệ thống và quản lý thông tin thẻ xe.",
    correctIds: ['Camera AI', 'Cư dân', 'Ban quản lý'],
    explanation: [
      { text: "Xuất sắc! Cư dân (quẹt thẻ), Camera AI (đọc biển số) và Ban quản lý (cấu hình) là những người/thiết bị tự động kích hoạt hệ thống chạy. Lưu ý: Bảo vệ chỉ ngồi chờ hệ thống báo động chứ không chủ động kích hoạt!" }
    ]
  },

  // 4. Phase 2: Phân loại Tác nhân và Rác dữ liệu (Drag to Bins)
  {
    type: 'interactive',
    interactionType: 'drag_to_bins',
    title: 'Đừng nhầm lẫn!',
    instruction: "Hãy kéo thả các danh từ còn lại vào đúng giỏ để tìm ra Kép phụ (Secondary Actor) và loại bỏ những 'dữ liệu' vô tri không phải là Tác nhân.",
    items: [
      { id: 'db', label: 'Database Server' },
      { id: 'bv', label: 'Bảo vệ' },
      { id: 'the', label: 'Thẻ cư dân' },
      { id: 'bien', label: 'Biển số xe' }
    ],
    bins: [
      {
        id: 'secondary',
        label: 'Secondary Actor (Hỗ trợ / Bị động)',
        accepts: ['db', 'bv']
      },
      {
        id: 'data',
        label: 'Không phải Actor (Đồ vật / Dữ liệu)',
        accepts: ['the', 'bien']
      }
    ],
    explanation: [
      { text: "Chính xác! Thẻ cư dân hay biển số chỉ là những món đồ vật hoặc chuỗi text dữ liệu. Chúng không có khả năng tự giao tiếp hay xử lý thông tin! Chúng không phải là Actor!" }
    ]
  },

  // 5. Chốt Kiến Thức
  {
    type: 'theory',
    title: 'Bộ lọc Danh từ (Noun Filtering)',
    content: `Khi đọc Requirement, hãy gạch chân tất cả các Danh từ.

**Actor (Có khả năng giao tiếp/xử lý):**
Danh từ có khả năng *chủ động gửi* hoặc *thụ động nhận* thông tin.
Ví dụ: Người dùng, Cảm biến Camera AI, Database, Server, API.

**Không phải Actor (Vô tri vô giác):**
Danh từ chỉ thông tin vật lý hoặc dữ liệu tĩnh không tự vận hành.
Ví dụ: Thẻ từ, Biển số, Barie, Hóa đơn.`,
    image: 'actor_filter'
  },

  // 6. Phase 3: Dàn trận Kiến trúc (Block Mapping)
  {
    type: 'interactive',
    interactionType: 'block_mapping',
    title: 'Lên khung Ranh giới',
    instruction: "Hãy đưa các Actor bạn vừa tìm được vào đúng vị trí Trái (Primary) và Phải (Secondary) xung quanh chiếc hộp Ranh giới Hệ thống Bãi gửi xe.",
    options: [
      { id: 'cudan', label: 'Cư dân' },
      { id: 'camera', label: 'Camera AI' },
      { id: 'bql', label: 'Ban quản lý' },
      { id: 'db', label: 'Database Server' },
      { id: 'baove', label: 'Bảo vệ' }
    ],
    slots: [
      { id: 's1', label: 'Trái 1' },
      { id: 's2', label: 'Trái 2' },
      { id: 's3', label: 'Trái 3' },
      { id: 'sys', label: 'Hệ thống Bãi gửi xe Tòa nhà', isStatic: true },
      { id: 's4', label: 'Phải 1' },
      { id: 's5', label: 'Phải 2' }
    ],
    // The mapping matches options to slots. Wait, BlockMapping expects N options and N slots.
    // If I have 5 options and 6 slots (1 static), BlockMapping will map option i to slot i.
    // I need to use the exact length. 
    // Options length = 5.
    // Slots length = 6. (index 0,1,2 for left, index 3 is static, index 4,5 for right).
    // Let's restructure slots and options to match indices.
    // Options: cudan, camera, bql, NONE, db, baove. Wait, BlockMapping doesn't support empty options.
    // Actually, `BlockMapping` has `Array(data.slots.length)`. We can have 6 options and one is hidden or dummy.
    // Let's modify this to match BlockMapping's expected input format.
    correctMapping: [
      // Since it's block mapping, we just need the correct IDs in order of slots
      // But multiple combinations of left/right are valid.
      // Wait, `BlockMapping` `expected` supports Arrays!
      ['cudan', 'camera', 'bql'], // s1
      ['cudan', 'camera', 'bql'], // s2
      ['cudan', 'camera', 'bql'], // s3
      null, // sys
      ['db', 'baove'], // s4
      ['db', 'baove'] // s5
    ],
    explanation: [
      { text: "Thật chuyên nghiệp! Cư dân, Camera AI và Ban quản lý chủ động kích hoạt hệ thống (Trái). Database và Bảo vệ đứng chờ nhận dữ liệu/thông báo (Phải)." }
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
    title: 'Câu 1 (Bẫy Tư duy Vai trò)',
    question: "Trong Requirement có nhắc đến Bảo vệ. Hệ thống sẽ chủ động gửi cảnh báo cho Bảo vệ khi thẻ lỗi. Tại sao Bảo vệ lại là Secondary Actor (Bên Phải) mà không phải Primary Actor (Bên Trái)?",
    options: [
      { id: 'a', label: 'A. Vì Bảo vệ không trực tiếp cầm thẻ để quẹt vào máy.', isCorrect: false },
      { id: 'b', label: 'B. Vì Bảo vệ là bên BỊ ĐỘNG nhận thông báo từ hệ thống, họ không chủ động khởi phát chuỗi hành động kiểm tra thẻ này.', isCorrect: true },
      { id: 'c', label: 'C. Vì gửi cảnh báo là một chức năng phụ, ít quan trọng hơn.', isCorrect: false }
    ],
    explanation: [
      { text: "Bảo vệ đứng chờ hệ thống báo động. Họ là bên nhận dữ liệu, không phải khởi phát dữ liệu. Do đó, họ là Secondary Actor." }
    ]
  },

  // 9. Skill Check 2 (Visual Select / Highlight Diagram)
  {
    type: 'skill_check',
    interactionType: 'highlight_diagram',
    title: 'Câu 2 (Đọc hiểu Ẩn ý)',
    instruction: "Một kỹ sư thiết kế phần mềm đã vẽ thừa một Actor không thực sự tồn tại (hoặc đã nằm sẵn trong ranh giới) dựa trên Requirement. Hãy chạm để loại bỏ nó!",
    nodes: [
      { id: 'n1', label: 'Camera AI', isSystem: false, icon: '📷', isCorrect: false },
      { id: 'n2', label: 'Database Server', isSystem: false, icon: '💽', isCorrect: false },
      { id: 'n3', label: 'Barie Chắn Cổng', isSystem: false, icon: '🚧', isCorrect: true },
      { id: 'n4', label: 'Cư dân', isSystem: false, icon: '👤', isCorrect: false }
    ],
    explanation: [
      { text: "Chính xác! Chiếc Barie chắn cổng thực chất chỉ là một thiết bị đầu cuối nhận lệnh phần cứng. Trong sơ đồ Use Case nghiệp vụ phần mềm, chúng ta không vẽ các thiết bị cơ học vô tri, trừ khi nó có bộ vi xử lý độc lập!" }
    ]
  }
];
