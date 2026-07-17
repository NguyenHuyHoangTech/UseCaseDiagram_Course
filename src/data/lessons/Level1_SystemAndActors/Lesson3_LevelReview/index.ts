export const LESSON_DATA = [
  // 1. Màn hình Khởi động
  {
    type: 'splash',
    title: 'Skill check',
    subtitle: 'Kiểm tra kỹ năng tổng hợp',
    theme: 'dark',
    icon: 'SplashIconSVG'
  },
  
  // 2. Câu 1: Nhận diện Kẻ ngoại đạo
  {
    type: 'skill_check',
    interactionType: 'highlight_diagram',
    title: 'Câu 1: Nhận diện "Kẻ ngoại đạo"',
    question: 'Chạm để chọn thực thể bắt buộc phải nằm NGOÀI ranh giới của Hệ thống Quản lý Thư viện.',
    nodes: [
      { id: 'actor', label: 'Máy quét mã vạch', isSystem: false, icon: '👤', isCorrect: true },
      { id: 'algorithm', label: 'Thuật toán tìm sách', isSystem: true, icon: '⚙️', isCorrect: false },
      { id: 'usecase', label: 'Mượn sách', isSystem: true, icon: '📝', isCorrect: false }
    ],
    explanation: [
      { text: "Tác nhân (Actor) luôn nằm ngoài Ranh giới hệ thống, bất kể đó là con người hay thiết bị phần cứng như Máy quét mã vạch. Thuật toán hay Chức năng là thứ bạn phải code, nên nó nằm bên trong." }
    ]
  },

  // 3. Câu 2: Sắp xếp Đội hình (Luật Trái - Phải)
  {
    type: 'skill_check',
    interactionType: 'block_mapping',
    title: 'Câu 2: Sắp xếp Đội hình',
    question: "Thiết lập đúng vị trí Trái - Phải cho sơ đồ chức năng 'Thanh toán Đơn hàng'.",
    options: [
      { id: 'opt1', label: 'Khách hàng mua sắm' },
      { id: 'opt2', label: 'Hệ thống VNPay' }
    ],
    slots: [
      { id: 'slot1', label: 'Bên Trái' },
      { id: 'slot2', label: 'Ở Giữa', isStatic: true, staticLabel: 'Thanh toán Đơn hàng', staticType: 'usecase' },
      { id: 'slot3', label: 'Bên Phải' }
    ],
    correctMapping: ['opt1', null, 'opt2'], // null means it's a static slot
    explanation: [
      { text: "Khách hàng là người CHỦ ĐỘNG khởi xướng việc mua hàng nên phải đứng bên Trái (Primary Actor). VNPay là hệ thống BỊ ĐỘNG được gọi đến để hỗ trợ trừ tiền, nên phải đứng bên Phải (Secondary Actor)." }
    ]
  },

  // 4. Câu 3: Bản chất của Ranh giới (Cú lừa tư duy)
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Câu 3: Bản chất của Ranh giới',
    question: "Nếu một sinh viên vẽ hình người (Khách hàng) nằm chễm chệ BÊN TRONG hình chữ nhật System Boundary, điều này ám chỉ sai lầm logic gì?",
    options: [
      { id: 'o1', label: 'A. Khách hàng này là nhân viên nội bộ của công ty.', isCorrect: false },
      { id: 'o2', label: 'B. Phần mềm này có thể lập trình và điều khiển được hành vi vật lý của người đó ngoài đời thực.', isCorrect: true },
      { id: 'o3', label: 'C. Khách hàng này có quyền quản trị viên cao nhất.', isCorrect: false }
    ],
    explanation: [
      { text: "System Boundary định nghĩa giới hạn những gì phần mềm của bạn có thể kiểm soát. Bạn không thể viết code để ép một người phải đói bụng hay phải thao tác bằng tay, nên con người không bao giờ nằm bên trong hệ thống!" }
    ]
  },

  // 5. Câu 4: Cảnh sát bắt lỗi UML
  {
    type: 'skill_check',
    interactionType: 'highlight_diagram',
    title: 'Câu 4: Cảnh sát bắt lỗi UML',
    question: 'Sơ đồ Ứng dụng Thời Tiết này có một Tác nhân đang đứng sai chỗ, phá vỡ quy tắc UML. Hãy chạm để cảnh báo!',
    nodes: [
      { id: 'sensor', label: 'Cảm biến nhiệt độ', isSystem: false, icon: '🌡️', isCorrect: false }, // Should be left (primary)
      { id: 'cloud', label: 'Máy chủ lưu trữ Cloud', isSystem: false, icon: '☁️', isCorrect: true }, // Should be right (secondary) but is placed wrong conceptually. We just tap it to flag it.
      { id: 'system', label: 'Cập nhật thời tiết', isSystem: true, icon: '⛅', isCorrect: false }
    ],
    explanation: [
      { text: "Cloud Storage chỉ là một công cụ hỗ trợ cất giữ dữ liệu thụ động. Nó là Secondary Actor, do đó bắt buộc phải xếp ở lề bên Phải của hệ thống." }
    ]
  }
];
