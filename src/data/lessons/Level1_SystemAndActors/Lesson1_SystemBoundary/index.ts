// Data for Thế giới trong và ngoài (System Boundary)
export const LESSON_DATA = [
  // Bước 1: Khởi động (Kích thích trực giác)
  {
    type: 'interactive',
    interactionType: 'selection',
    title: 'Giới hạn của Quyền lực',
    subtitle: 'Màn hình Khởi động',
    question: 'Tình huống: Bạn đang thiết kế một phần mềm Quản lý Nhà hàng. Bạn có thể viết code để phần mềm ép khách hàng phải bước vào quán ăn và gọi món. Đúng hay sai?',
    options: [
      { id: 'opt_true', label: 'Đúng', isCorrect: false },
      { id: 'opt_false', label: 'Sai', isCorrect: true },
    ],
    explanation: [
      { text: "Chính xác! Bạn chỉ có thể lập trình phần mềm để 'nhận' order, chứ không thể lập trình hành vi của con người ở thế giới thực." },
      { text: "Khoan đã, trừ khi bạn có siêu năng lực thao túng tâm lý, còn kỹ sư phần mềm thì không thể code ra con người đâu!" } // For incorrect
    ]
  },
  
  // Bước 2: Tương tác 1: Phân loại rạch ròi
  {
    type: 'interactive',
    interactionType: 'drag_to_bins',
    title: 'Trong hay Ngoài?',
    question: 'Hãy kéo thả các thành phần của dự án Nhà hàng vào đúng vị trí của nó.',
    bins: [
      { id: 'inside', label: 'Phần mềm kiểm soát được (Bên Trong)' },
      { id: 'outside', label: 'Không kiểm soát được (Bên Ngoài)' }
    ],
    options: [
      { id: 'opt1', label: 'Lưu trữ hóa đơn', correctBin: 'inside' },
      { id: 'opt2', label: 'Khách hàng đói bụng', correctBin: 'outside' },
      { id: 'opt3', label: 'Thuật toán tính tổng tiền', correctBin: 'inside' },
      { id: 'opt4', label: 'Hệ thống Ngân hàng Momo', correctBin: 'outside' }
    ],
    explanation: [
      { text: "Momo là hệ thống của công ty khác, bạn đâu có quyền sửa code của họ đúng không? Nó phải nằm bên ngoài! Khách hàng cũng vậy, họ là các Actor tương tác với phần mềm từ bên ngoài." }
    ]
  },

  // Bước 3: Tương tác 2: Dựng lên màng chắn
  {
    type: 'interactive',
    interactionType: 'slider_reveal',
    title: 'Vẽ đường Ranh giới',
    question: 'Kéo thanh trượt từ trái sang phải để dựng lên bức tường bảo vệ phần mềm của bạn.',
    systemName: 'System Boundary',
    nodes: [
      { id: 'n1', label: 'Tính tiền', isSystem: true, icon: '💵' },
      { id: 'n2', label: 'In biên lai', isSystem: true, icon: '🖨️' },
      { id: 'n3', label: 'Khách hàng', isSystem: false, icon: '👤' }
    ],
    explanation: [
      { text: "Khung chữ nhật sáng lên chính là System Boundary! Nó bao bọc chặt lấy Tính tiền và In biên lai, đồng thời đẩy khối Khách hàng ra mép ngoài." }
    ]
  },

  // Bước 4: Chốt Kiến Thức (Lý thuyết cô đọng)
  {
    type: 'info_tabs',
    title: 'Ranh giới Hệ thống (System Boundary)',
    tabs: [
      {
        tabTitle: 'Định nghĩa',
        content: 'System Boundary là một chiếc hộp khái niệm, phân định rạch ròi trách nhiệm của đội ngũ phát triển. Mọi thứ nằm BÊN TRONG chiếc hộp là phần mềm bạn phải xây dựng. Mọi thứ nằm BÊN NGOÀI chiếc hộp (Con người, phần cứng, API bên thứ 3) là môi trường tương tác với phần mềm của bạn.',
        image: 'box'
      }
    ]
  },

  // Bước 5: Tương tác 3: Áp dụng thực tế
  {
    type: 'interactive',
    interactionType: 'text_highlight',
    title: 'Tách bạch hệ thống',
    question: 'Trong đoạn mô tả tính năng dưới đây, hãy chạm để highlight cụm từ mô tả một hệ thống BÊN NGOÀI ranh giới phần mềm của chúng ta.',
    text: 'Khi người dùng ấn nút Đặt hàng, phần mềm của chúng ta sẽ lưu thông tin giỏ hàng, sau đó gửi dữ liệu sang [Cổng thanh toán VNPay] để xử lý, và cuối cùng hiển thị thông báo thành công.',
    correctId: 'Cổng thanh toán VNPay',
    explanation: [
      { text: "Chính xác! 'Cổng thanh toán VNPay' là một hệ thống bên thứ 3. Chúng ta chỉ gọi API của họ chứ không thể can thiệp vào code bên trong VNPay." }
    ]
  },

  // Bước 6: Skill Check Transition
  {
    type: 'skill_check_transition',
    title: 'Sẵn sàng cho bài kiểm tra cuối?',
    subtitle: 'Vượt qua bài test 2 câu này để thăng hạng và chứng minh bạn đã hoàn toàn làm chủ khái niệm Ranh giới hệ thống!'
  },

  // Bước 7: Bắt lỗi sơ đồ (Skill Check 1)
  {
    type: 'skill_check',
    interactionType: 'highlight_diagram',
    title: 'Bài Test Kỹ Năng 1: Bắt lỗi sơ đồ',
    question: 'Một thực tập sinh đã vẽ sai Sơ đồ Ranh giới (Boundary) cho ứng dụng Đặt xe. Hãy chạm vào thành phần đang vi phạm quy tắc để ném nó ra ngoài!',
    nodes: [
      { id: 'system', label: 'App Đặt Xe', isSystem: true, icon: '📱', isCorrect: false },
      { id: 'func1', label: 'Tìm tài xế', isSystem: false, icon: '🔍', isCorrect: false },
      { id: 'func2', label: 'Tính cước phí', isSystem: false, icon: '💵', isCorrect: false },
      { id: 'driver', label: 'Tài xế', isSystem: false, icon: '👤', isCorrect: true } // The one to throw out
    ],
    explanation: [
      { text: "Tuyệt vời! Tài xế là con người (Actor), không thể nằm bên trong hộp ranh giới của ứng dụng phần mềm được!" }
    ]
  },

  // Bước 8: MCQ (Skill Check 2)
  {
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Bài Test Kỹ Năng 2: Bản chất Ranh giới',
    question: 'Chức năng cốt lõi nhất của System Boundary (Ranh giới hệ thống) là gì?',
    options: [
      { id: 'o1', label: 'A. Gom nhóm những người dùng (Khách hàng, Admin) lại với nhau cho gọn.', isCorrect: false },
      { id: 'o2', label: 'B. Xác định dung lượng bộ nhớ mà phần mềm được phép sử dụng.', isCorrect: false },
      { id: 'o3', label: 'C. Tách biệt rạch ròi trách nhiệm của phần mềm với môi trường bên ngoài.', isCorrect: true }
    ],
    explanation: [
      { text: "Đúng vậy! Ranh giới hệ thống (System Boundary) giúp đội ngũ phát triển xác định rõ phần mềm của mình bắt đầu và kết thúc ở đâu, tách biệt trách nhiệm với các hệ thống/con người bên ngoài." }
    ]
  }
];
