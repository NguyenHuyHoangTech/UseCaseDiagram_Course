export const LESSON_DATA = [
  // 1. Khởi động (MCQ)
  {
    type: 'interactive',
    interactionType: 'selection',
    title: 'Thần giao cách cảm?',
    subtitle: 'Khởi động',
    question: 'Sinh viên muốn sử dụng tính năng "Ôn tập Flashcard" trên ứng dụng học tập. Làm thế nào để hệ thống biết sinh viên đang muốn bắt đầu ôn tập?',
    options: [
      { id: 'a', label: 'A. Hệ thống tự động đoán được suy nghĩ của sinh viên.', isCorrect: false },
      { id: 'b', label: 'B. Chức năng tự động chạy liên tục 24/7.', isCorrect: false },
      { id: 'c', label: 'C. Sinh viên phải có một hành động (Click/Tap) gửi tín hiệu yêu cầu vào hệ thống.', isCorrect: true }
    ],
    explanation: [
      { text: "Tuyệt vời! Hệ thống phần mềm chỉ là những đoạn code vô tri cho đến khi có ai đó (hoặc thứ gì đó) 'kích hoạt' nó qua một kênh giao tiếp." }
    ]
  },

  // 2. Interactive 1 (ClickConnect)
  {
    type: 'interactive',
    interactionType: 'click_connect',
    title: 'Nối đúng thẩm quyền',
    subtitle: 'Phase 1: Bóc tách Khái niệm',
    question: 'Ai có quyền thực hiện chức năng nào? Hãy chạm để nối Tác nhân (Actor) với Chức năng (Use Case) tương ứng.',
    left: [
      { id: 'sv', label: 'Sinh viên', type: 'actor' },
      { id: 'admin', label: 'Quản trị viên', type: 'actor' }
    ],
    right: [
      { id: 'quanly', label: 'Quản lý bộ bài Anki', type: 'usecase' },
      { id: 'ontap', label: 'Ôn tập thẻ từ vựng', type: 'usecase' }
    ],
    connections: [
      { left: 'sv', right: 'ontap' },
      { left: 'admin', right: 'quanly' }
    ],
    explanation: [
      { text: "Đường thẳng sáng lên như một sợi dây cáp quang đang truyền dữ liệu! Bạn đã cấp đúng quyền cho đúng người." }
    ]
  },

  // 3. Interactive 2 (CutEdge)
  {
    type: 'interactive',
    interactionType: 'cut_edge',
    title: 'Cáp nối lỗi',
    question: "Sơ đồ Use Case KHÔNG dùng để mô tả việc con người nói chuyện với nhau ở ngoài đời. Hãy chạm để cắt đứt liên kết sai trái này!",
    nodes: [
      { id: 'sv', label: 'Sinh viên', type: 'actor' },
      { id: 'gv', label: 'Giảng viên', type: 'actor' },
      { id: 'xem', label: 'Xem bảng điểm', type: 'usecase' }
    ],
    edges: [
      { id: 'e1', from: 'sv', to: 'gv', isCorrect: true }, // Should be cut
      { id: 'e2', from: 'gv', to: 'xem', isCorrect: false }
    ],
    explanation: [
      { text: "Chúng ta đang vẽ sơ đồ phần mềm, không phải vẽ sơ đồ tổ chức công ty! Actor chỉ nói chuyện với Hệ thống thôi." }
    ]
  },

  // 4. Theory 1
  {
    type: 'theory',
    title: 'Sợi dây liên kết (Association)',
    tabs: [
      {
        id: 'assoc',
        label: 'Khái niệm',
        content: [
          { type: 'text', text: '**Association** là đường thẳng thể hiện sự giao tiếp giữa Tác nhân (Actor) và Chức năng (Use Case).' },
          { type: 'text', text: 'Dưới góc nhìn lập trình (như mô hình MVC), đường nối này chính là lúc người dùng gửi một **Request** từ giao diện web (View) gọi vào hệ thống (Controller) để xử lý dữ liệu.' }
        ]
      }
    ]
  },

  // 5. Interactive 3 (CableSelect)
  {
    type: 'interactive',
    interactionType: 'cable_select',
    title: 'Cổng kết nối phù hợp',
    subtitle: 'Phase 2: Những vùng "Cấm địa"',
    question: "Hãy chọn đúng loại dây cáp để nối Khách hàng với chức năng Đăng nhập.",
    leftNode: { label: 'Khách hàng', type: 'actor' },
    rightNode: { label: 'Đăng nhập', type: 'usecase' },
    options: [
      { id: 'assoc', label: 'Đường thẳng (Association)', isCorrect: true },
      { id: 'include', label: '<<include>>', isCorrect: false },
      { id: 'extend', label: '<<extend>>', isCorrect: false }
    ],
    explanation: [
      { text: "Chính xác! Các cáp có chữ <<include>> hoặc <<extend>> CHỈ được dùng để nối 2 Use Case với nhau, tuyệt đối không dùng cho Actor!" }
    ]
  },

  // 6. Interactive 4 (SliderExploratory)
  {
    type: 'interactive',
    interactionType: 'slider_exploratory',
    title: 'Request & Response',
    question: 'Kéo thanh trượt để xem luồng dữ liệu chạy bên trong một sợi dây Association.',
    leftNode: { label: 'Khách hàng', type: 'actor' },
    rightNode: { label: 'Tìm kiếm', type: 'usecase' },
    explanation: [
      { text: "Đó là lý do dây Association cơ bản thường KHÔNG CÓ mũi tên, vì giao tiếp luôn là 2 chiều (Gửi yêu cầu - Nhận kết quả)!" }
    ]
  },

  // 7. Theory 2
  {
    type: 'theory',
    title: 'Quy tắc 3 KHÔNG của Association',
    tabs: [
      {
        id: 'rules',
        label: '3 KHÔNG',
        content: [
          { type: 'bullet', text: '**KHÔNG** nối Actor với Actor. (Phần mềm không quản lý việc người này nói chuyện với người kia ngoài đời).' },
          { type: 'bullet', text: '**KHÔNG** dùng Association để nối Use Case với Use Case. (Giữa các chức năng sẽ có các loại cáp đặc biệt riêng - học ở Level 3).' },
          { type: 'bullet', text: '**KHÔNG** lạm dụng mũi tên. Hãy để một đường thẳng trơn tru đại diện cho một vòng lặp Request-Response.' }
        ]
      }
    ]
  },

  // 8. Skill Check Transition
  {
    type: 'skill_check_transition',
    title: 'Boss Cuối: Skill Check',
    subtitle: 'Áp dụng kiến thức để bắt lỗi hệ thống'
  },

  // 9. Skill Check 1
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 1: Đọc vị sơ đồ',
    question: 'Một sợi dây Association nối từ Use Case `( Xác thực Đăng nhập )` ra Actor `[ Database MySQL ]` ở bên phải ranh giới mang ý nghĩa gì?',
    options: [
      { id: 'sc1_a', label: 'A. Database đang ra lệnh cho hệ thống bắt người dùng đăng nhập.', isCorrect: false },
      { id: 'sc1_b', label: 'B. Hệ thống đang chủ động gọi truy vấn xuống Database để kiểm tra thông tin.', isCorrect: true },
      { id: 'sc1_c', label: 'C. Người dùng đang trực tiếp sửa code của Database.', isCorrect: false }
    ],
    explanation: [
      { text: "Đúng! Hệ thống (Use Case) đóng vai trò chủ động gọi ra Secondary Actor (Database) để hoàn thành nhiệm vụ." }
    ]
  },

  // 10. Skill Check 2
  {
    type: 'skill_check',
    interactionType: 'cut_edge',
    title: 'Câu 2: Cảnh sát bắt lỗi',
    question: "Radar phát hiện một cáp nối vi phạm nghiêm trọng luật '3 KHÔNG'. Hãy chạm để cắt đứt nó ngay lập tức!",
    nodes: [
      { id: 'admin', label: 'Admin', type: 'actor' },
      { id: 'them', label: 'Thêm Món Ăn', type: 'usecase' },
      { id: 'tinh', label: 'Tính lại Menu', type: 'usecase' }
    ],
    edges: [
      { id: 'e1', from: 'admin', to: 'them', isCorrect: false },
      { id: 'e2', from: 'them', to: 'tinh', isCorrect: true } // Vi phạm: nối UC với UC bằng Association thường
    ],
    explanation: [
      { text: "Bạn không thể dùng một đường Association cơ bản để nối 2 chức năng với nhau. Chúng ta sẽ cần những loại cáp đặc biệt ở Level 3!" }
    ]
  },

  // 11. Skill Check 3 (BlockMapping)
  {
    type: 'skill_check',
    interactionType: 'block_mapping',
    title: 'Câu 3: Thiết kế hoàn chỉnh',
    question: 'Lắp ráp sơ đồ tư duy chuẩn xác nhất cho một luồng tương tác cơ bản.',
    options: [
      { id: 'a1', label: 'Primary Actor' },
      { id: 'u1', label: 'Use Case' },
      { id: 'a2', label: 'Secondary Actor' },
      { id: 'as1', label: 'Association' },
      { id: 'as2', label: 'Association' }
    ],
    slots: [
      { id: 's1', label: 'Nguồn phát' },
      { id: 's2', label: 'Cáp' },
      { id: 's3', label: 'Xử lý' },
      { id: 's4', label: 'Cáp' },
      { id: 's5', label: 'Hỗ trợ' }
    ],
    correctMapping: ['a1', ['as1', 'as2'], 'u1', ['as1', 'as2'], 'a2'],
    explanation: [
      { text: "Hoàn hảo! Primary Actor kích hoạt Use Case qua Association, sau đó Use Case nhờ Secondary Actor hỗ trợ cũng qua một Association khác." }
    ]
  }
];
