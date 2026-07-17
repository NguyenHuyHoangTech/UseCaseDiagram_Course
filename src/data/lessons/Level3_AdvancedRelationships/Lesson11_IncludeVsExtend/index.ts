export const LESSON_DATA = [
  {
    type: 'theory', phase: 'learning',
    title: 'Mức độ chi tiết (Granularity)',
    subtitle: 'Khi nào gom, khi nào tách?',
    image: null,
    explanation: [
      { text: "Mức độ chi tiết quyết định biểu đồ của bạn có quá sơ sài hay quá rườm rà hay không. Quy tắc CRUD (Create - Read - Update - Delete) là thước đo phổ biến nhất." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Gom nhóm CRUD',
    question: 'Admin có quyền Thêm, Sửa, Xóa, Xem bài viết. Nên vẽ thế nào?',
    options: [
      { id: 'opt1', label: 'Gom thành Use Case "Quản lý bài viết"', isCorrect: true, hint: 'Đúng! Cùng một Actor nên gom lại cho gọn.' },
      { id: 'opt2', label: 'Tách làm 4 Use Case', isCorrect: false, hint: 'Không cần thiết vì sẽ làm biểu đồ bị rối.' }
    ],
    explanation: [ { text: "Chỉ gom khi các chức năng chia sẻ hoàn toàn chung quyền hạn." } ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Tách rời khi khác quyền',
    question: 'User được Xem, Admin được Xóa bài. Có được gom thành Use Case "Quản lý bài" không?',
    options: [
      { id: 'opt1', label: 'Được, cứ gom lại rồi nối cả 2 Actor vào.', isCorrect: false, hint: 'Sai. Nối User vào "Quản lý bài" nghĩa là User cũng có quyền Xóa.' },
      { id: 'opt2', label: 'Không, phải tách ra "Xem bài" cho User và "Xóa bài" cho Admin.', isCorrect: true, hint: 'Chính xác! Phân quyền khác nhau bắt buộc phải tách rời.' }
    ],
    explanation: [ { text: "Việc nối một Actor vào một Use Case bao hàm ý nghĩa Actor đó có TẤT CẢ quyền hành trong Use Case đó." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Chốt kiến thức: Granularity',
    subtitle: 'Nguyên tắc gom tách',
    image: null,
    explanation: [
      { text: "- GOM: Khi cùng 1 cụm tính năng (CRUD) thuộc về cùng 1 Actor." },
      { text: "- TÁCH: Khi có sự khác biệt về Role (Phân quyền)." }
    ]
  },
  {
    type: 'interactive', phase: 'learning',
    interactionType: 'selection',
    title: 'Thực hành: Mức độ hệ thống con',
    question: 'Hệ thống kế toán có "Tính lương", "Khấu trừ thuế". Giám đốc chỉ muốn nhìn bức tranh tổng quát. Bạn làm gì?',
    options: [
      { id: 'opt1', label: 'Tạo Package (Gói) "Quản lý tài chính" bao bọc các Use Case này.', isCorrect: true, hint: 'Đúng! Cung cấp mức độ High-level cho nhà quản lý.' },
      { id: 'opt2', label: 'Bỏ bớt Use Case đi', isCorrect: false, hint: 'Không được xóa chức năng thực tế của hệ thống.' }
    ],
    explanation: [ { text: "Sử dụng Package/Module để kiểm soát mức độ chi tiết khi trình bày." } ]
  },
  {
    type: 'theory', phase: 'learning',
    title: 'Chuẩn bị Test Skill',
    subtitle: 'Gom tách không còn là vấn đề',
    image: null,
    explanation: [
      { text: "Sẵn sàng kiểm tra khả năng phân định mức độ chi tiết của bạn." }
    ]
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 1/3',
    question: 'Có 3 Use Case: "Cập nhật tên", "Cập nhật avatar", "Đổi mật khẩu". Nên gom lại thành Use Case nào?',
    options: [
      { id: 'opt1', label: 'Quản lý tài khoản (hoặc Cập nhật hồ sơ)', isCorrect: true },
      { id: 'opt2', label: 'Không gom, để rời rạc', isCorrect: false }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 2/3',
    question: 'Nhân viên có quyền Tạo Đơn Hàng. Quản lý có quyền Duyệt Đơn Hàng. Nên gom hay tách?',
    options: [
      { id: 'opt1', label: 'Gom thành "Quản lý đơn hàng"', isCorrect: false },
      { id: 'opt2', label: 'Tách riêng thành "Tạo đơn hàng" và "Duyệt đơn hàng"', isCorrect: true }
    ],
    explanation: []
  },
  {
    type: 'interactive', phase: 'skill_check',
    interactionType: 'selection',
    title: 'Skill Check 3/3',
    question: 'Use Case quá to (VD: "Làm việc với hệ thống") được gọi là lỗi gì?',
    options: [
      { id: 'opt1', label: 'Thiếu chi tiết (Too abstract)', isCorrect: true },
      { id: 'opt2', label: 'Lỗi CRUD', isCorrect: false }
    ],
    explanation: []
  }
];
