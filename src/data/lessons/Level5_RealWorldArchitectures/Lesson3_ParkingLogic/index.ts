export const LESSON_DATA = [
  // 1. Màn hình Khởi động
  {
    type: 'intro_anim',
    title: 'Bài 3: Giải mã Ẩn ý',
    subtitle: 'Xây dựng Logic Include/Extend',
    description: 'Chúng ta đã có Tác nhân (Ai?) và Chức năng (Làm gì?). Bây giờ là lúc dùng "xi măng" để kết dính chúng lại bằng cách giải mã ngôn ngữ tự nhiên của khách hàng.'
  },

  // 2. Khởi động (Kích thích trực giác)
  {
    type: 'concept_intro',
    interactionType: 'selection',
    title: 'Đọc vị khách hàng',
    question: "Khi đọc tài liệu yêu cầu, nếu bạn thấy cụm từ 'Bắt buộc phải' và từ 'Nếu', điều đó ngầm ám chỉ cấu trúc gì trong tư duy thiết kế luồng?",
    options: [
      { id: 'a', label: 'A. Đó chỉ là từ nối cho hay, không có ý nghĩa về mặt thiết kế.', isCorrect: false },
      { id: 'b', label: "B. 'Bắt buộc' là một lời gọi hàm luôn luôn thực thi, còn 'Nếu' là một khối lệnh rẽ nhánh có thể không xảy ra.", isCorrect: true }
    ],
    explanation: [
      { text: "Chính xác! Ngôn ngữ tự nhiên chính là mã giả (Pseudo-code) của UML. Nhiệm vụ của chúng ta là ánh xạ các khối If-Else này lên bản vẽ kiến trúc!" }
    ]
  },

  // 3. Phase 1: Mật mã Ngôn từ (Text Highlight)
  {
    type: 'interactive',
    interactionType: 'text_highlight',
    title: 'Tìm kiếm "Công tắc"',
    instruction: "Sự rẽ nhánh (<<extend>>) không bao giờ tự nhiên xuất hiện. Nó cần một 'Công tắc' (Điều kiện). Hãy chạm để highlight mệnh đề làm công tắc kích hoạt chức năng 'Gửi cảnh báo'.",
    text: "Hệ thống Quản lý Bãi gửi xe giúp kiểm soát xe ra vào tòa nhà. Khi xe đến cổng, Camera AI sẽ nhận diện biển số. Sau đó, Cư dân tiến hành Xác thực thẻ xe. Mọi thông tin xe ra vào đều bắt buộc phải Lưu trữ thông tin vào Database Server. [Nếu thẻ hết hạn hoặc không khớp biển số], hệ thống sẽ Gửi cảnh báo cho Bảo vệ trực chốt. Ở cấp độ quản lý, Ban quản lý có thể đăng nhập để Cấu hình hệ thống và Quản lý thẻ xe.",
    correctIds: ['Nếu thẻ hết hạn hoặc không khớp biển số'],
    explanation: [
      { text: "Chuẩn! Đây chính là Extension Point (Điểm mở rộng). Nếu điều kiện này không thỏa mãn (thẻ hợp lệ), tính năng báo động sẽ ngủ yên vĩnh viễn!" }
    ]
  },

  // 4. Phase 1: Ánh xạ Ký hiệu (Drag to Bins)
  {
    type: 'interactive',
    interactionType: 'drag_to_bins',
    title: 'Dịch thuật UML',
    instruction: "Hãy dịch các từ khóa của khách hàng sang đúng ký hiệu mũi tên chuẩn UML.",
    items: [
      { id: 'i1', label: 'Bắt buộc phải' },
      { id: 'i2', label: 'Bao gồm' },
      { id: 'e1', label: 'Nếu' },
      { id: 'e2', label: 'Trong trường hợp ngoại lệ' }
    ],
    bins: [
      {
        id: 'include_bin',
        label: 'Mũi tên <<include>>',
        accepts: ['i1', 'i2']
      },
      {
        id: 'extend_bin',
        label: 'Mũi tên <<extend>>',
        accepts: ['e1', 'e2']
      }
    ],
    explanation: [
      { text: "Quá tuyệt vời! Bạn đã có một 'Từ điển Dịch thuật UML' cho riêng mình." }
    ]
  },

  // 5. Chốt Kiến Thức 1
  {
    type: 'theory',
    title: 'Từ điển Dịch thuật UML',
    content: `Khi phân tích văn bản, hãy chú ý đến các Trạng từ chỉ mức độ:

**Bắt buộc / Luôn luôn / Phải có**
➔ Biểu diễn bằng \`<<include>>\` (Hành động phụ thuộc hoàn toàn).

**Nếu / Đôi khi / Tùy chọn / Ngoại lệ**
➔ Biểu diễn bằng \`<<extend>>\` (Hành động rẽ nhánh có điều kiện).`,
    image: 'logic_dict'
  },

  // 6. Phase 2: Kỹ sư Lắp ráp - Tương tác 3 (Equation Builder)
  {
    type: 'interactive',
    interactionType: 'equation_builder',
    title: 'Không thể chối từ',
    instruction: "Dựa vào câu: 'Mọi thông tin xe ra vào đều bắt buộc phải lưu trữ thông tin', hãy lắp ráp chuỗi logic UML đúng chuẩn.",
    options: [
      { id: 'xt', label: 'Xác thực thẻ xe', type: 'variable' },
      { id: 'lt', label: 'Lưu trữ thông tin', type: 'variable' },
      { id: 'inc', label: '<<include>>', type: 'operator' },
      { id: 'ext', label: '<<extend>>', type: 'operator' }
    ],
    correctOrder: ['xt', 'inc', 'lt'],
    slots: 3,
    explanation: [
      { text: "Luôn nhớ: Include đi TỪ kẻ nhờ vả (Base Case) SANG kẻ phục vụ (Included Case)! Nó hoạt động y hệt việc Controller gọi một hàm Service." }
    ]
  },

  // 7. Phase 2: Kỹ sư Lắp ráp - Tương tác 4 (Equation Builder)
  {
    type: 'interactive',
    interactionType: 'equation_builder',
    title: 'Xử lý Ngoại lệ (Exception Handling)',
    instruction: "Dựa vào câu: 'Nếu thẻ hết hạn... hệ thống sẽ gửi cảnh báo', hãy lắp ráp luồng UML thể hiện sự mở rộng của chức năng Xác thực thẻ.",
    options: [
      { id: 'xt', label: 'Xác thực thẻ xe', type: 'variable' },
      { id: 'cb', label: 'Gửi cảnh báo', type: 'variable' },
      { id: 'inc', label: '<<include>>', type: 'operator' },
      { id: 'ext', label: '<<extend>>', type: 'operator' }
    ],
    correctOrder: ['cb', 'ext', 'xt'],
    slots: 3,
    explanation: [
      { text: "Đỉnh cao! Mũi tên Extend phải đâm NGƯỢC LẠI vào Base Case. Tính năng phụ đang xin phép 'chèn' thêm hành vi của nó vào tính năng chính khi bắt được lỗi (catch Exception)!" }
    ]
  },

  // 8. Chốt Kiến Thức 2
  {
    type: 'theory',
    title: 'Cặp bài trùng của UML',
    content: `Mũi tên nét đứt luôn tuân theo quy tắc hướng:

**Với \`<<include>>\`**
Chức năng gốc chủ động gọi hàm phụ trợ, nên mũi tên **hướng ra ngoài**.
\`( Gốc ) ➔ <<include>> ➔ ( Phụ trợ )\`

**Với \`<<extend>>\`**
Chức năng gốc không biết gì cả, chức năng rẽ nhánh tự động chèn vào, nên mũi tên **đâm ngược vào trong**.
\`( Ngoại lệ ) ➔ <<extend>> ➔ ( Gốc )\`
`,
    image: 'include_extend_direction'
  },

  // 9. Boss Cuối: Skill Check Transition
  {
    type: 'skill_check_transition',
    title: 'Skill check',
    subtitle: 'Trạm thu hoạch'
  },

  // 10. Skill Check 1 (MCQ)
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 1 (Tư duy Nghiệp vụ)',
    question: "Giả sử quy định đổi thành: 'Việc lưu trữ thông tin xe chỉ thực hiện đối với khách vãng lai, còn cư dân thì không cần lưu để tiết kiệm bộ nhớ'. Mối quan hệ giữa ( Xác thực thẻ xe ) và ( Lưu trữ thông tin ) sẽ thay đổi như thế nào?",
    options: [
      { id: 'a', label: 'A. Nó vẫn là <<include>> vì dữ liệu vẫn cần lưu.', isCorrect: false },
      { id: 'b', label: 'B. Nó biến thành <<extend>> vì bây giờ việc lưu trữ là TÙY CHỌN dựa trên đối tượng quẹt thẻ.', isCorrect: true },
      { id: 'c', label: 'C. Khối Lưu trữ thông tin sẽ biến thành Secondary Actor.', isCorrect: false }
    ],
    explanation: [
      { text: "Logic của UML phản ánh trực tiếp Requirement nghiệp vụ. Cùng một tính năng, nhưng nếu Requirement đổi từ 'Bắt buộc' sang 'Có điều kiện', sơ đồ phải lập tức cập nhật từ Include sang Extend!" }
    ]
  },

  // 11. Skill Check 2 (Visual Select Edge)
  {
    type: 'skill_check',
    interactionType: 'visual_select_edge',
    title: 'Câu 2 (Cảnh sát Bắt lỗi)',
    instruction: "Một lập trình viên cấp dưới đã dịch sai Requirement và vẽ một liên kết lỗi. Hãy chạm vào đường bị sai để hủy nó!",
    edges: [
      {
        id: 'e1',
        left: { id: 'bql', label: 'Ban quản lý', type: 'actor' },
        right: { id: 'ql', label: 'Quản lý thẻ xe', type: 'usecase' },
        edgeType: 'default',
        isCorrect: false
      },
      {
        id: 'e2',
        left: { id: 'ql', label: 'Quản lý thẻ xe', type: 'usecase' },
        right: { id: 'cb', label: 'Gửi cảnh báo', type: 'usecase' },
        edgeType: 'include',
        isCorrect: true // This is the wrong one the user needs to select
      },
      {
        id: 'e3',
        left: { id: 'xt', label: 'Xác thực thẻ xe', type: 'usecase' },
        right: { id: 'lt', label: 'Lưu trữ thông tin', type: 'usecase' },
        edgeType: 'include',
        isCorrect: false
      }
    ],
    explanation: [
      { text: "Đọc kỹ Requirement, tính năng 'Gửi cảnh báo' chỉ xảy ra nếu 'Thẻ hết hạn hoặc sai biển số' (thuộc luồng Xác thực của cư dân). Nó hoàn toàn không dính dáng gì đến luồng 'Quản lý thẻ xe' của Ban quản lý!" }
    ]
  },

  // 12. Skill Check 3 (Block Mapping - Fill-in-the-blank)
  {
    type: 'skill_check',
    interactionType: 'block_mapping',
    title: 'Câu 3 (Trật tự Lắp ráp Luồng)',
    instruction: "Sắp xếp lại luồng hoàn chỉnh nhất cho chức năng Xác thực của Cư dân dựa trên toàn bộ phân tích từ đầu đến giờ.",
    options: [
      { id: 'inc', label: '<<include>>' },
      { id: 'lt', label: '( Lưu trữ thông tin )' },
      { id: 'db', label: '[ Database Server ]' } // decoy
    ],
    slots: [
      { id: 'cudan', label: 'Tác nhân', staticLabel: '[ Cư dân ]', isStatic: true, staticType: 'actor' },
      { id: 'xt', label: 'Base Use Case', staticLabel: '( Xác thực thẻ xe )', isStatic: true, staticType: 'usecase' },
      { id: 's1', label: '[ Chỗ trống 1 ]' },
      { id: 's2', label: '[ Chỗ trống 2 ]' }
    ],
    correctMapping: [null, null, 'inc', 'lt'],
    explanation: [
      { text: "Hoàn hảo! Dòng chảy nghiệp vụ diễn ra đúng thứ tự: Cư dân (Actor) ➔ Xác thực (Base) ➔ Include ➔ Lưu trữ thông tin (Included). Database Server chỉ đứng bên ngoài để nhận dữ liệu, không nằm trong chuỗi gọi hàm này!" }
    ]
  }
];
