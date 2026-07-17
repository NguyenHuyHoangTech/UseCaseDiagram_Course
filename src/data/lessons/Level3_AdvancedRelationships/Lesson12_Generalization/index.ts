export const LESSON_DATA = [
  {
    type: 'theory', phase: 'learning',
    title: 'Các lỗi chết người (Anti-patterns)',
    subtitle: 'Nhận diện và sửa các biểu đồ vẽ sai bét.',
    image: null,
    explanation: [
      { text: "Rất nhiều người mới học vẽ Use Case thường biến nó thành Lưu đồ thuật toán (Flowchart) hoặc Thiết kế giao diện (UI)." },
      { text: "Use Case KHÔNG thể hiện thứ tự thời gian. Nó chỉ thể hiện CHỨC NĂNG." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Lỗi Lưu đồ',
    question: 'Biểu đồ vẽ: Actor -> (Nhập Form) -> (Validate) -> (Lưu DB). Đây là lỗi gì?',
    options: [
      { id: 'opt1', label: 'Biến Use Case thành Flowchart (lưu đồ)', isCorrect: true, hint: 'Đúng! Use Case Diagram không dùng để mô tả luồng các bước.' },
      { id: 'opt2', label: 'Chưa dùng quan hệ extend', isCorrect: false, hint: 'Cơ bản việc tách 3 bước ra làm 3 Use Case đã là sai nghiệp vụ.' }
    ],
    explanation: [ { text: "Chỉ nên gom thành 1 Use Case: 'Thêm dữ liệu'. Trình tự sẽ được viết trong Đặc tả." } ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Lỗi Hệ thống là Actor',
    question: 'Vẽ một hình người (Actor) tên là "Hệ thống". Đúng hay sai?',
    options: [
      { id: 'opt1', label: 'Đúng, vì hệ thống cũng làm việc.', isCorrect: false, hint: 'Sai! Hệ thống đang là ranh giới (Boundary), không thể tự là Actor của chính nó.' },
      { id: 'opt2', label: 'Sai. Actor phải nằm NGOÀI hệ thống đang thiết kế.', isCorrect: true, hint: 'Chính xác.' }
    ],
    explanation: [ { text: "Không bao giờ vẽ hệ thống đang xây dựng làm Actor." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Chốt kiến thức: Anti-patterns',
    subtitle: 'Nhớ kỹ để không bị trừ điểm',
    image: null,
    explanation: [
      { text: "- Không vẽ mũi tên nối tiếp các Use Case (A -> B -> C)." },
      { text: "- Không nhét giao diện (Click nút, mở trang) vào Use Case." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Lỗi CRUD rời rạc',
    question: 'Tạo 4 Use Case riêng biệt cho Thêm, Sửa, Xóa, Xem dù chỉ có 1 Actor sử dụng. Hậu quả là gì?',
    options: [
      { id: 'opt1', label: 'CRUD Bomb: Làm biểu đồ phình to rườm rà một cách vô nghĩa.', isCorrect: true, hint: 'Chính xác!' },
      { id: 'opt2', label: 'Tốt hơn vì càng chi tiết càng dễ hiểu.', isCorrect: false, hint: 'Chi tiết quá sẽ biến nó thành rác.' }
    ],
    explanation: [ { text: "Phải biết cách gom nhóm." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Chuẩn bị Test Skill',
    subtitle: 'Khám phá lỗi sai',
    image: null,
    explanation: [
      { text: "Bây giờ bạn sẽ là người chấm điểm sơ đồ. Hãy tìm ra lỗi!" }
    ]
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 1/3',
    question: 'Dùng mũi tên (Association) nối từ Use Case này sang Use Case khác (không phải include/extend). Đúng hay sai?',
    options: [
      { id: 'opt1', label: 'Sai, Association chỉ dùng để nối Actor với Use Case.', isCorrect: true },
      { id: 'opt2', label: 'Đúng, để chỉ ra thứ tự thực hiện.', isCorrect: false }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 2/3',
    question: 'Có một Use Case tên là "Chuyển hướng sang trang Thanh Toán". Lỗi gì?',
    options: [
      { id: 'opt1', label: 'Nhét thiết kế giao diện/luồng ứng dụng vào Use Case.', isCorrect: true },
      { id: 'opt2', label: 'Tên quá dài.', isCorrect: false }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 3/3',
    question: 'Vẽ một Actor tên là "Database" nằm trong System Boundary. Lỗi gì?',
    options: [
      { id: 'opt1', label: 'Actor luôn phải nằm NGOÀI System Boundary.', isCorrect: true },
      { id: 'opt2', label: 'Database không thể là Actor.', isCorrect: false }
    ],
    explanation: []
  }
];
