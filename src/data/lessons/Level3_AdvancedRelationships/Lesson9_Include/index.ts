export const LESSON_DATA = [
  {
    type: 'theory', phase: 'learning',
    title: 'Quan hệ kế thừa (Generalization)',
    subtitle: 'Gom nhóm để đơn giản hóa biểu đồ.',
    image: null,
    explanation: [
      { text: "Trong thực tế, bạn sẽ thường gặp trường hợp có nhiều Actor chia sẻ chung một số quyền hạn, hoặc nhiều Use Case có cùng một mục đích nhưng cách thực hiện khác nhau." },
      { text: "Để biểu đồ không bị rối mắt, chúng ta sử dụng **Quan hệ kế thừa (Generalization)**, được biểu diễn bằng một đường thẳng với mũi tên rỗng (mũi tên tam giác trắng) chỉ về phía thành phần cha." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Kế thừa Actor',
    question: 'Nếu hệ thống có "Khách hàng VIP" và "Khách thường", cả hai đều được "Xem sản phẩm", bạn nên vẽ thế nào?',
    options: [
      { id: 'opt1', label: 'Tạo Actor cha "Khách hàng" để nối với Xem sản phẩm, hai Actor con kế thừa từ cha.', isCorrect: true, hint: 'Chính xác! Đây là cách tối ưu.' },
      { id: 'opt2', label: 'Vẽ cả 2 Actor và kéo 2 đường thẳng tới Xem sản phẩm.', isCorrect: false, hint: 'Không tối ưu vì làm tăng số lượng đường nối.' }
    ],
    explanation: [ { text: "Kế thừa Actor giúp giảm thiểu đường nối." } ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Kế thừa Use Case',
    question: 'Use Case "Thanh toán" có thể được thực hiện bằng Tiền mặt hoặc Thẻ. Đâu là cách vẽ đúng?',
    options: [
      { id: 'opt1', label: 'Hai Use Case "Thanh toán bằng Tiền mặt" và "Thanh toán bằng Thẻ" kế thừa từ Use Case cha "Thanh toán".', isCorrect: true, hint: 'Đúng! Mũi tên tam giác trắng hướng về Use Case cha.' },
      { id: 'opt2', label: 'Dùng Include để gọi ra Tiền mặt hoặc Thẻ.', isCorrect: false, hint: 'Include là bắt buộc, không phải sự lựa chọn loại hình.' }
    ],
    explanation: [ { text: "Kế thừa Use Case biểu thị mối quan hệ 'is-a' (Là một loại của)." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Chốt lại kiến thức: Kế thừa',
    subtitle: 'Khi nào dùng?',
    image: null,
    explanation: [
      { text: "1. Kế thừa Actor: Gom các Actor có chung quyền truy cập." },
      { text: "2. Kế thừa Use Case: Khi có một chức năng chung nhưng có nhiều biến thể để thực hiện." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Tránh lạm dụng kế thừa',
    question: 'Có nên tạo Use Case cha "Cập nhật dữ liệu" cho mọi chức năng Sửa (Sửa bài, Sửa tên, Sửa tuổi) không?',
    options: [
      { id: 'opt1', label: 'Có, càng gom nhiều càng tốt.', isCorrect: false, hint: 'Như thế sẽ mất đi ý nghĩa nghiệp vụ cụ thể của từng Use Case.' },
      { id: 'opt2', label: 'Không, chỉ kế thừa khi chúng thực sự là biến thể của cùng một hành động.', isCorrect: true, hint: 'Đúng! Đừng lạm dụng kế thừa để gom bừa bãi.' }
    ],
    explanation: [ { text: "Việc lạm dụng kế thừa làm biểu đồ trở nên trừu tượng và khó hiểu." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Tổng kết Generalization',
    subtitle: 'Luôn giữ biểu đồ dễ đọc.',
    image: null,
    explanation: [
      { text: "Sử dụng kế thừa hợp lý giúp bạn tối ưu không gian hiển thị và thể hiện tư duy thiết kế hệ thống tốt." },
      { text: "Bây giờ, hãy chuẩn bị cho bài Test Skill để kiểm tra xem bạn đã nắm chắc chưa nhé! (Lưu ý: Test Skill sẽ không cho thử lại đâu)." }
    ]
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 1/3',
    question: 'Mũi tên của quan hệ Generalization hướng về đâu?',
    options: [
      { id: 'opt1', label: 'Từ Cha trỏ về Con', isCorrect: false },
      { id: 'opt2', label: 'Từ Con trỏ về Cha', isCorrect: true }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 2/3',
    question: 'Kế thừa Actor thường được dùng để làm gì?',
    options: [
      { id: 'opt1', label: 'Giảm bớt Use Case.', isCorrect: false },
      { id: 'opt2', label: 'Gom nhóm các quyền hạn chung để giảm đường nối (Association).', isCorrect: true }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 3/3',
    question: 'Nếu "Xác thực bằng Vân tay" và "Xác thực bằng Mật khẩu" đều là cách để đăng nhập, chúng có thể kế thừa từ Use Case nào?',
    options: [
      { id: 'opt1', label: 'Xác thực (Authenticate)', isCorrect: true },
      { id: 'opt2', label: 'Đăng xuất', isCorrect: false }
    ],
    explanation: []
  }
];
