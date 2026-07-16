// Data for Thế giới trong và ngoài (System Boundary)
export const LESSON_DATA = [
  // Bước 1: Intro / True False -> Giữ nguyên để khởi động nhẹ
  {
    type: 'interactive',
    interactionType: 'selection',
    title: 'Khởi động',
    question: 'Theo bạn, ranh giới hệ thống (System Boundary) có nghĩa là gì?',
    options: [
      { id: 'opt1', label: 'Là bức tường vật lý bảo vệ máy chủ', isCorrect: false },
      { id: 'opt2', label: 'Là đường phân chia giữa những gì hệ thống tự làm và những gì bên ngoài tác động vào', isCorrect: true },
      { id: 'opt3', label: 'Là giới hạn dung lượng của cơ sở dữ liệu', isCorrect: false },
    ],
    explanation: [
      { text: "Ranh giới hệ thống giúp ta vạch rõ ranh giới: Cái gì ta xây dựng (bên trong) và Cái gì tương tác với ta (bên ngoài)." }
    ]
  },
  
  // Bước 2: Tương tác lắp ráp 1 (Thay thế cho 3 bước Sorting cũ)
  {
    type: 'interactive',
    interactionType: 'build_diagram',
    title: 'Thử thách: Lắp ráp ATM',
    question: 'Hãy lắp ráp kiến trúc cho hệ thống Máy ATM bằng cách chạm vào các linh kiện bên dưới để phân loại chúng:',
    systemName: 'Hệ thống Máy ATM',
    hint: 'Bạn có chắc máy chủ ngân hàng là thứ nằm trong cái máy ATM không?',
    items: [
      { id: 'customer', label: 'Khách hàng rút tiền', correctZone: 'outside' },
      { id: 'counter', label: 'Bộ đếm & nhả tiền', correctZone: 'inside' },
      { id: 'server', label: 'Máy chủ Ngân hàng', correctZone: 'outside' },
      { id: 'card_reader', label: 'Khe đọc thẻ', correctZone: 'inside' }
    ],
    explanation: [
      { text: "Khách hàng và Máy chủ Ngân hàng là những thực thể độc lập đứng bên ngoài, giao tiếp với máy ATM. Còn bộ đếm tiền và khe đọc thẻ là các bộ phận cấu thành nên chính máy ATM." }
    ]
  },

  // Bước 3: Thẻ chốt kiến thức 1
  {
    type: 'info_tabs',
    title: 'Chốt lại: System Boundary là gì?',
    tabs: [
      {
        tabTitle: 'Định nghĩa',
        content: 'System Boundary (Ranh giới hệ thống) giống như một cái hộp. Mọi phần mềm, tính năng mà bạn PHẢI lập trình sẽ nằm gọn trong chiếc hộp này.',
        image: 'box'
      },
      {
        tabTitle: 'Bên ngoài (Actor)',
        content: 'Những người dùng, hoặc các hệ thống phần mềm khác tương tác với chiếc hộp của bạn sẽ nằm ở ngoài. Ta gọi chúng là Actor.',
        image: 'actor'
      },
      {
        tabTitle: 'Nguyên tắc vàng',
        content: 'Đừng vẽ chi tiết những gì diễn ra BÊN NGOÀI hộp. UML Use Case chỉ quan tâm chiếc hộp của bạn làm được gì cho những người đứng ngoài.',
        image: 'rule'
      }
    ]
  },

  // Bước 4: Tương tác Highlight
  {
    type: 'interactive',
    interactionType: 'highlight_diagram',
    title: 'Tình huống thực tế',
    question: 'Trên bản vẽ kiến trúc của "App Đặt Đồ Ăn" bên dưới, hãy CHẠM VÀO TẤT CẢ các thành phần đóng vai trò là Actor (Tác nhân bên ngoài):',
    hint: 'Chỉ chọn những hệ thống hoặc con người nằm BÊN NGOÀI quyền kiểm soát của App. Google Maps có do bạn lập trình không?',
    nodes: [
      { id: 'app', label: 'App Đặt Đồ Ăn', isSystem: true, icon: '📱', isCorrect: false },
      { id: 'driver', label: 'Tài xế', isSystem: false, icon: '🛵', isCorrect: true },
      { id: 'google', label: 'Google Maps API', isSystem: false, icon: '🗺️', isCorrect: true },
      { id: 'customer', label: 'Khách Hàng', isSystem: false, icon: '👤', isCorrect: true },
      { id: 'restaurant', label: 'Nhà Hàng', isSystem: false, icon: '🏪', isCorrect: true }
    ],
    explanation: [
      { text: "App Đặt Đồ Ăn là hệ thống trung tâm. Tài xế, Khách hàng, Nhà hàng đều là người dùng (User Actor). Còn Google Maps là một hệ thống bên ngoài cung cấp dịch vụ bản đồ (Secondary Actor). Tất cả chúng đều không nằm trong ranh giới hệ thống của bạn!" }
    ]
  },

  // Bước 5: Thẻ chốt kiến thức 2
  {
    type: 'info_tabs',
    title: 'Mở rộng: Giới hạn hệ thống',
    tabs: [
      {
        tabTitle: 'API & Dịch vụ ngoài',
        content: 'Ngày nay các hệ thống hiếm khi đứng độc lập. Việc xác định cái gì là dịch vụ ngoài (Payment Gateway, SMS, Email) rất quan trọng để không ôm đồm việc.',
        image: 'api'
      },
      {
        tabTitle: 'Hậu quả nếu sai',
        content: 'Nếu bạn gom cả Google Maps vào hệ thống của mình, sếp sẽ tưởng bạn dự định tự code lại... Google Maps. Ngân sách sẽ sai bét!',
        image: 'budget'
      }
    ]
  },

  // Bước 6: Transition
  {
    type: 'skill_check_transition',
    title: 'Sẵn sàng cho bài kiểm tra cuối?',
    subtitle: 'Vượt qua bài test này để thăng hạng và chứng minh bạn đã hoàn toàn làm chủ khái niệm Ranh giới hệ thống!'
  },

  // Bước 7: Skill check 1
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Bài Test Kỹ Năng 1',
    question: 'Khi vẽ biểu đồ Use Case, System Boundary được biểu diễn bằng hình gì?',
    options: [
      { id: 'o1', label: 'Một hình tròn nét đứt', isCorrect: false },
      { id: 'o2', label: 'Một hình chữ nhật bao quanh các Use Case', isCorrect: true },
      { id: 'o3', label: 'Không cần vẽ, nó tự được ngầm hiểu', isCorrect: false }
    ],
    explanation: [
      { text: "System Boundary luôn được vẽ như một hình chữ nhật khổng lồ ôm trọn tất cả các tính năng (Use Case) bên trong nó." }
    ]
  },

  // Bước 8: Skill check 2
  {
    type: 'skill_check',
    interactionType: 'build_diagram',
    title: 'Bài Test Kỹ Năng 2',
    question: 'Hãy cấu hình cho "Hệ thống Quản lý Bãi đỗ xe tự động":',
    systemName: 'Quản lý Bãi đỗ xe',
    items: [
      { id: 'camera', label: 'Camera nhận diện biển số', correctZone: 'outside' },
      { id: 'db', label: 'Lưu trữ lịch sử xe ra vào', correctZone: 'inside' },
      { id: 'barie', label: 'Thanh chắn Barie', correctZone: 'outside' }
    ],
    explanation: [
      { text: "Camera và Barie là các thiết bị phần cứng (Hardware). Phần mềm của bạn chỉ gửi/nhận tín hiệu từ chúng, do đó chúng là các Actor bên ngoài." }
    ]
  },

  // Bước 9: Skill check 3
  {
    type: 'skill_check',
    interactionType: 'sorting',
    title: 'Bài Test Cuối',
    question: 'Đối với "Website mua vé xem phim":',
    targetItem: 'Cổng thanh toán VNPay',
    options: [
      { id: 'in', label: 'Nằm TRONG hệ thống', isCorrect: false },
      { id: 'out', label: 'Nằm NGOÀI hệ thống', isCorrect: true }
    ],
    explanation: [
      { text: "VNPay là một hệ thống bên ngoài (Secondary Actor) mà website của bạn kết nối đến để nhờ xử lý thanh toán." }
    ]
  }
];
