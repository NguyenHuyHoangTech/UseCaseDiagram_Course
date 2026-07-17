export const LESSON_DATA = [
  {
    type: 'theory', phase: 'learning',
    title: 'Tránh lỗi Use Case mồ côi (Orphan Use Cases)',
    subtitle: 'Đảm bảo mọi Use Case đều có chủ.',
    image: null,
    explanation: [
      { text: "Một lỗi thiết kế phổ biến là **Use Case mồ côi (Orphan Use Cases)**. Đó là Use Case nằm trơ trọi trong ranh giới hệ thống nhưng KHÔNG CÓ BẤT KỲ đường nối nào tới một Actor bên ngoài." },
      { text: "Trừ những Use Case đóng vai trò là `<<include>>` hoặc `<<extend>>`, mọi Use Case độc lập BẮT BUỘC phải do một Actor kích hoạt." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Chức năng ẩn',
    question: 'Có chức năng "Gửi email báo cáo hàng tuần vào thứ Hai". Trên sơ đồ nó đứng 1 mình vì chẳng có nhân viên nào bấm nút gửi. Khắc phục thế nào?',
    options: [
      { id: 'opt1', label: 'Tạo Secondary Actor là "Hệ thống Thời gian (Scheduler/Timer)" và nối vào nó.', isCorrect: true, hint: 'Đúng! Tiến trình tự động luôn được kích hoạt bởi thời gian.' },
      { id: 'opt2', label: 'Xóa Use Case này đi vì không có Actor thì không cần vẽ.', isCorrect: false, hint: 'Đây là chức năng quan trọng mang lại giá trị, không thể xóa.' }
    ],
    explanation: [ { text: "Hệ thống thời gian được xem là một Non-human Actor ngoại vi." } ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Secondary Actor kích hoạt',
    question: 'Nếu chức năng "Cập nhật tỷ giá" được kích hoạt tự động do một "Hệ thống Ngân Hàng" bên ngoài gửi API Sang. Ai là Actor?',
    options: [
      { id: 'opt1', label: 'Hệ thống Ngân hàng (nằm ngoài Boundary).', isCorrect: true, hint: 'Chính xác! Hệ thống bên ngoài đẩy dữ liệu sang thì nó chính là Actor kích hoạt.' },
      { id: 'opt2', label: 'Hệ thống của chúng ta tự làm.', isCorrect: false, hint: 'Hệ thống đang xét không thể là Actor.' }
    ],
    explanation: [ { text: "Sự kiện kích hoạt (Trigger) có thể đến từ Con người, Thời gian, hoặc Hệ thống ngoại vi." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Chốt kiến thức: Orphan Use Case',
    subtitle: 'Tìm ra kẻ chủ mưu',
    image: null,
    explanation: [
      { text: "Bất cứ khi nào bạn thấy một Use Case đứng độc lập không nối với ai, hãy tự hỏi: 'Ai hoặc cái gì kích hoạt nó?'." },
      { text: "Nếu là tự động, hãy tạo Actor Timer/Scheduler." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Mồ côi do thiết kế sai',
    question: 'Một bạn vẽ Use Case "Xác thực OTP" trơ trọi một mình, không nối với Actor, cũng không có mũi tên đứt nét nào trỏ tới. Lỗi gì?',
    options: [
      { id: 'opt1', label: 'Thiếu quan hệ include từ Use Case "Đăng nhập" hoặc "Thanh toán".', isCorrect: true, hint: 'Chuẩn! Xác thực OTP là một chức năng phụ trợ, phải được gọi bằng include/extend.' },
      { id: 'opt2', label: 'Thiếu Actor "Tổng đài SMS".', isCorrect: false, hint: 'Tổng đài SMS là nơi gửi đi, người dùng mới là người kích hoạt gián tiếp thông qua luồng Đăng nhập.' }
    ],
    explanation: [ { text: "Use case mồ côi cũng có thể là do bạn quên vẽ mũi tên include/extend." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Chuẩn bị Test Skill',
    subtitle: 'Cứu rỗi các Use Case',
    image: null,
    explanation: [
      { text: "Hãy xem bạn đã thành thạo việc gán chủ cho các Use Case chưa nhé." }
    ]
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 1/3',
    question: 'Một Use Case "Tự động sao lưu Database vào nửa đêm" do ai kích hoạt?',
    options: [
      { id: 'opt1', label: 'Database', isCorrect: false },
      { id: 'opt2', label: 'Time Scheduler', isCorrect: true }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 2/3',
    question: 'Tại sao Use Case không được phép đứng mồ côi?',
    options: [
      { id: 'opt1', label: 'Vì mọi hệ thống phần mềm đều phải phản hồi lại một sự kiện từ bên ngoài.', isCorrect: true },
      { id: 'opt2', label: 'Vì hình vẽ trông không đẹp mắt.', isCorrect: false }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 3/3',
    question: 'Nếu Use Case A <<include>> Use Case B, và A đã nối với Actor. Use Case B có được coi là mồ côi không nếu không nối Actor?',
    options: [
      { id: 'opt1', label: 'Không, vì B đã được liên kết thông qua A.', isCorrect: true },
      { id: 'opt2', label: 'Có, B vẫn mồ côi và bắt buộc phải kéo đường nối từ Actor tới B.', isCorrect: false }
    ],
    explanation: []
  }
];
