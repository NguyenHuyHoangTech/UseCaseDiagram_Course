export const LESSON_DATA = [
  {
    type: 'theory', phase: 'learning',
    title: 'Tránh lỗi phân mảnh CRUD (CRUD Bomb)',
    subtitle: 'Tối ưu hiển thị bằng cách gom nhóm.',
    image: null,
    explanation: [
      { text: "Trong các dự án thực tế, bạn sẽ thường xuyên gặp các nhóm chức năng xoay quanh thao tác dữ liệu: Thêm (Create), Sửa (Update), Xóa (Delete), Xem (Read). Đây được gọi là CRUD." },
      { text: "**Lỗi CRUD Bomb:** Là khi bạn vẽ 4 Use Case rời rạc (Thêm, Sửa, Xóa, Xem) và kéo 4 đường nối từ 1 Actor vào 4 Use Case đó. Việc này làm biểu đồ phình to không cần thiết." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Gom nhóm CRUD',
    question: 'Nếu Admin làm cả 4 hành động CRUD với "Bài viết", ta nên làm gì?',
    options: [
      { id: 'opt1', label: 'Gom chúng lại thành một Use Case duy nhất tên là "Quản lý bài viết".', isCorrect: true, hint: 'Chính xác! Giúp biểu đồ gọn gàng hơn nhiều.' },
      { id: 'opt2', label: 'Tạo 4 Use Case nối với Admin.', isCorrect: false, hint: 'Đây chính là lỗi CRUD Bomb.' }
    ],
    explanation: [ { text: "Việc gom nhóm giúp biểu đồ không bị rối mắt." } ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Khác quyền hạn',
    question: 'User chỉ được Xem. Admin được Thêm, Sửa, Xóa. Bạn vẽ thế nào?',
    options: [
      { id: 'opt1', label: 'Tách riêng Use Case "Xem bài viết" nối cho User. Admin nối vào "Quản lý bài viết" (hoặc nối cả 2).', isCorrect: true, hint: 'Đúng! Khi khác quyền hạn bắt buộc phải tách.' },
      { id: 'opt2', label: 'Tạo Use Case "Quản lý bài viết" và nối cả User và Admin vào.', isCorrect: false, hint: 'Sai nghiệp vụ, vì nối như vậy User sẽ có quyền Xóa.' }
    ],
    explanation: [ { text: "KHÔNG ĐƯỢC GOM nếu chức năng được thực hiện bởi các Actor khác quyền nhau." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Chốt kiến thức: CRUD Bomb',
    subtitle: 'Nguyên tắc Vàng',
    image: null,
    explanation: [
      { text: "Gom khi CÙNG ACTOR. Tách khi KHÁC ACTOR (Khác quyền)." },
      { text: "Sự phân quyền quan trọng hơn hình thức đẹp." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Tránh lỗi gom sai',
    question: 'Nếu "Cập nhật giá sản phẩm" yêu cầu quy trình duyệt rất phức tạp và quan trọng hơn hẳn các tác vụ khác. Có nên gom chung vào "Quản lý sản phẩm" không?',
    options: [
      { id: 'opt1', label: 'Nên tách riêng để làm nổi bật mức độ quan trọng và quy trình riêng.', isCorrect: true, hint: 'Đúng! Nếu nghiệp vụ quá phức tạp, nó xứng đáng là 1 Use Case riêng.' },
      { id: 'opt2', label: 'Bắt buộc phải gom chung vì nó là chữ U trong CRUD.', isCorrect: false, hint: 'CRUD chỉ là hướng dẫn, không phải luật lệ cứng nhắc.' }
    ],
    explanation: [ { text: "Tính chất phức tạp của luồng sự kiện cũng quyết định việc tách hay gộp." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Sẵn sàng Test Skill',
    subtitle: 'Bài kiểm tra không thử lại',
    image: null,
    explanation: [
      { text: "Bạn đã hiểu cách gỡ mìn CRUD Bomb. Hãy test skill xem sao!" }
    ]
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 1/3',
    question: 'CRUD là viết tắt của gì?',
    options: [
      { id: 'opt1', label: 'Create, Read, Update, Delete', isCorrect: true },
      { id: 'opt2', label: 'Copy, Run, Undo, Destroy', isCorrect: false }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 2/3',
    question: 'CRUD Bomb làm giảm chất lượng biểu đồ như thế nào?',
    options: [
      { id: 'opt1', label: 'Làm tăng số lượng đường nối và Use Case không cần thiết, gây khó đọc.', isCorrect: true },
      { id: 'opt2', label: 'Làm sai lệch luồng nghiệp vụ.', isCorrect: false }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 3/3',
    question: 'Khi nào tuyệt đối KHÔNG ĐƯỢC gom 4 thao tác CRUD thành Use Case "Quản lý..."?',
    options: [
      { id: 'opt1', label: 'Khi hệ thống quá lớn.', isCorrect: false },
      { id: 'opt2', label: 'Khi các thao tác đó được phân quyền cho các Actor khác nhau.', isCorrect: true }
    ],
    explanation: []
  }
];
