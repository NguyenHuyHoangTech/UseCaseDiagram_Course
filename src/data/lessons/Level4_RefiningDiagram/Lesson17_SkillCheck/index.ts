export const LESSON_DATA = [
  {
    type: 'theory', phase: 'learning',
    title: 'Case Study 1: Hệ thống nhỏ',
    subtitle: 'Rèn luyện qua thực tế.',
    image: null,
    explanation: [
      { text: "Trong bài này, chúng ta sẽ thực hành vẽ sơ đồ cho 2 hệ thống vô cùng quen thuộc: Máy rút tiền tự động (ATM) và Ứng dụng đặt đồ ăn nhanh." },
      { text: "Mục tiêu là giúp bạn quen tay với việc phân tích yêu cầu ngắn, bóc tách Actor và Use Case, đồng thời biết cách áp dụng Include/Extend hợp lý." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: ATM - Xác định Actor',
    question: 'Hệ thống ATM có yêu cầu: "Khách hàng đút thẻ vào để rút tiền, kiểm tra số dư. Hệ thống ngân hàng trung tâm sẽ trừ tiền. Nhân viên bảo trì thỉnh thoảng mở máy để nạp thêm tiền." Ai là các Actor?',
    options: [
      { id: 'opt1', label: 'Khách hàng, Nhân viên bảo trì, Hệ thống ngân hàng trung tâm', isCorrect: true, hint: 'Tuyệt vời! 2 con người và 1 hệ thống bên ngoài.' },
      { id: 'opt2', label: 'Khách hàng, Máy ATM, Nhân viên bảo trì', isCorrect: false, hint: 'Máy ATM chính là hệ thống đang vẽ, không thể là Actor.' }
    ],
    explanation: [ { text: "Actor bao gồm tất cả các bên tác động vào hệ thống." } ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: ATM - Các chức năng (Use Case)',
    question: 'Dựa vào mô tả ATM trên, Use Case nào sau đây KHÔNG HỢP LÝ?',
    options: [
      { id: 'opt1', label: 'Xác thực mã PIN (Authenticate)', isCorrect: false, hint: 'Đây là chức năng bắt buộc (include) phải có.' },
      { id: 'opt2', label: 'Đếm tiền vật lý', isCorrect: true, hint: 'Chính xác! Đếm tiền là cơ chế phần cứng bên trong máy, không mang lại giá trị trực tiếp cho người dùng, và quá chi tiết để làm 1 Use Case.' }
    ],
    explanation: [ { text: "Use Case phải là mục tiêu mà Actor muốn đạt được." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Chốt kiến thức: Biểu đồ ATM',
    subtitle: 'Đáp án chuẩn',
    image: null,
    explanation: [
      { text: "Với ATM, ta có đáp án như sau:" },
      { text: "- **Actor chính:** Khách hàng (Rút tiền, Kiểm tra số dư, Đổi mã PIN); Nhân viên bảo trì (Nạp tiền, Bảo trì máy)." },
      { text: "- **Actor phụ:** Hệ thống ngân hàng trung tâm (Tham gia vào mọi Use Case để đối soát tài khoản)." },
      { text: "- **Quan hệ Include:** Mọi thao tác của Khách hàng đều phải `<<include>>` Use Case 'Xác thực thẻ & PIN'." },
      { text: "- **Quan hệ Extend:** Nếu máy hết giấy in biên lai, Use Case 'In biên lai' sẽ `<<extend>>` vào 'Rút tiền'." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: App đặt đồ ăn',
    question: 'Với App đặt đồ ăn, khách hàng bấm đặt món. Nhà hàng nhận đơn. Shipper giao hàng. Nếu thanh toán bằng ví điện tử Momo thì Momo xử lý. Có bao nhiêu Actor tất cả?',
    options: [
      { id: 'opt1', label: '4 (Khách hàng, Nhà hàng, Shipper, Ví Momo)', isCorrect: true, hint: 'Đúng! Có 3 con người/tổ chức và 1 hệ thống thanh toán ngoài.' },
      { id: 'opt2', label: '3 (Khách hàng, Nhà hàng, Shipper)', isCorrect: false, hint: 'Đừng quên hệ thống thanh toán ngoại vi (Momo).' }
    ],
    explanation: [ { text: "Bất kỳ hệ thống bên thứ 3 nào cung cấp dịch vụ (Thanh toán, SMS, Bản đồ) đều là Actor ngoại vi." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Chốt kiến thức: App Đặt đồ ăn',
    subtitle: 'Mô hình đa Actor',
    image: null,
    explanation: [
      { text: "- **Khách hàng:** Tìm món, Đặt hàng, Đánh giá." },
      { text: "- **Nhà hàng:** Nhận đơn, Hủy đơn." },
      { text: "- **Shipper:** Nhận cuốc xe, Cập nhật trạng thái giao hàng." },
      { text: "- **Cổng thanh toán:** Xử lý thanh toán (`<<include>>` từ Đặt hàng)." }
    ]
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 1/3',
    question: 'Trong sơ đồ ATM, Use Case "Rút tiền" và Use Case "Xác thực mã PIN" nối với nhau bằng loại mũi tên nào?',
    options: [
      { id: 'opt1', label: 'Rút tiền <<include>> Xác thực mã PIN', isCorrect: true },
      { id: 'opt2', label: 'Xác thực mã PIN <<include>> Rút tiền', isCorrect: false }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 2/3',
    question: 'Trong App đặt đồ ăn, Use Case "Đánh giá nhà hàng" có thể được mở rộng bằng Use Case "Đính kèm ảnh". Dùng quan hệ gì?',
    options: [
      { id: 'opt1', label: 'Đính kèm ảnh <<extend>> Đánh giá nhà hàng', isCorrect: true },
      { id: 'opt2', label: 'Đánh giá nhà hàng <<extend>> Đính kèm ảnh', isCorrect: false }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 3/3',
    question: 'Với hệ thống ATM, Actor "Hệ thống ngân hàng trung tâm" thường được vẽ ở đâu?',
    options: [
      { id: 'opt1', label: 'Bên phải của System Boundary, đóng vai trò là Secondary Actor (Cung cấp dịch vụ kiểm tra tài khoản).', isCorrect: true },
      { id: 'opt2', label: 'Bên trái của System Boundary, vì nó là hệ thống lớn nhất.', isCorrect: false }
    ],
    explanation: []
  }
];
