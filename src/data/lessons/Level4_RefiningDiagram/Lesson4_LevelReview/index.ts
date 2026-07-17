export const LESSON_DATA = [
  // 1. Màn hình Khởi động
  {
    type: 'intro_anim',
    title: 'Skill check',
    subtitle: 'Kiểm tra kỹ năng Level 4',
    description: 'Trạm bảo dưỡng kiến trúc hệ thống: Dọn dẹp bẫy CRUD, xóa bỏ mã chết và gỡ rối Spaghetti Diagram.'
  },

  // 2. Câu 1: Ma trận Phân quyền (CRUDSmash)
  {
    type: 'skill_check',
    interactionType: 'crud_smash',
    title: 'Câu 1 (Ma trận Phân quyền)',
    instruction: "Trong dự án TTKPianoCenter, sơ đồ đang rải rác các Use Case nhỏ lẻ làm rối rắm ma trận phân quyền (Role-based security access matrix). Hãy chạm vào các khối dư thừa để gộp chúng lại cho sạch sẽ!",
    actorName: 'Quản trị viên',
    targetLabel: 'Quản lý Quyền Truy cập',
    crudNodes: [
      { id: 'c', label: 'Thêm Quyền Mới', color: 'border-green-500 text-green-400', pos: 'top-4 left-4' },
      { id: 'u', label: 'Chỉnh sửa Quyền', color: 'border-yellow-500 text-yellow-400', pos: 'top-32 left-4' },
      { id: 'd', label: 'Xóa Quyền', color: 'border-red-500 text-red-400', pos: 'top-32 right-4' }
    ],
    explanation: [
      { text: "Sơ đồ Use Case cần bám sát giá trị nghiệp vụ thay vì liệt kê chi tiết các hàm backend. Gộp chung các thao tác cơ bản thành một Use Case 'Quản lý...' giúp bản vẽ kiến trúc mạch lạc hơn." }
    ]
  },

  // 3. Câu 2: Dọn dẹp Mã thừa (MCQ)
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 2 (Dọn dẹp Mã thừa)',
    question: "Trong quá trình rà soát và loại bỏ các đoạn code kiểm tra dư thừa (strip redundant validation code) ở tầng Controller, bạn phát hiện Use Case ( Xác thực Dữ liệu Cũ ) không còn được nối với bất kỳ Actor hay luồng nào. Cách xử lý chuẩn UML nhất là gì?",
    options: [
      { id: 'a', label: 'A. Nối tạm nó với một Actor bất kỳ bằng đường Association để sơ đồ không báo lỗi.', isCorrect: false },
      { id: 'b', label: 'B. Thẳng tay xóa bỏ khối Use Case này khỏi sơ đồ kiến trúc.', isCorrect: true },
      { id: 'c', label: 'C. Biến nó thành một hệ thống bên ngoài (Secondary Actor).', isCorrect: false }
    ],
    explanation: [
      { text: "Một Use Case không có kết nối chính là 'mã chết' (Dead Code) không bao giờ được gọi tới trong hệ thống. Việc dũng cảm cắt bỏ các tính năng thừa thãi là kỹ năng bắt buộc của một kỹ sư tối ưu kiến trúc." }
    ]
  },

  // 4. Câu 3: Trật tự Data Controllers (Block Mapping)
  {
    type: 'skill_check',
    interactionType: 'block_mapping',
    title: 'Câu 3 (Trật tự Data Controllers)',
    instruction: "Sắp xếp lại các thực thể trong luồng Data Controllers để đường truyền dữ liệu không bị cắt chéo nhau.",
    options: [
      { id: 'admin', label: 'Quản trị viên' },
      { id: 'db', label: 'Database Server' }
    ],
    slots: [
      { id: 's1', label: '[ Chỗ trống 1 ]' },
      { id: 's2', label: 'Trích xuất Báo cáo (Cố định)', isStatic: true },
      { id: 's3', label: '[ Chỗ trống 2 ]' }
    ],
    correctMapping: ['admin', null, 'db'],
    explanation: [
      { text: "Dòng chảy thị giác chuẩn mực luôn đi từ Kẻ ra lệnh (Trái) sang Kẻ phục vụ (Phải). Việc sắp xếp sai lề sẽ khiến các đường Association cắt chéo qua trục giữa của hệ thống, tạo ra một mớ bòng bong khó đọc." }
    ]
  },

  // 5. Câu 4: Lách luật Giao cắt (Visual Select / Highlight Diagram)
  {
    type: 'skill_check',
    interactionType: 'highlight_diagram',
    title: 'Câu 4 (Lách luật Giao cắt)',
    instruction: "Một Actor [ API Gửi Mail ] đang phải gánh 15 đường nối từ khắp các Use Case trên màn hình, tạo ra một ma trận giao cắt tồi tệ. Hãy chạm vào thủ thuật HỢP LỆ nhất để cứu vãn sơ đồ này!",
    nodes: [
      { id: 'n1', label: 'Vẽ đường ziczac lách qua các khối', isSystem: false, icon: '〰️', isCorrect: false },
      { id: 'n2', label: 'Xóa bớt đường nối cho đỡ rối', isSystem: false, icon: '✂️', isCorrect: false },
      { id: 'n3', label: 'Nhân bản Actor thành 2 khối giống nhau', isSystem: false, icon: '👯', isCorrect: true }
    ],
    explanation: [
      { text: "UML hoàn toàn cho phép bạn vẽ một Actor nhiều lần ở nhiều góc khác nhau trên cùng một bản vẽ (chỉ cần giữ nguyên tên gốc). Đây là thủ thuật 'chia để trị' tuyệt vời để các đường liên kết ngắn lại và không còn đâm chéo vào nhau." }
    ]
  }
];
