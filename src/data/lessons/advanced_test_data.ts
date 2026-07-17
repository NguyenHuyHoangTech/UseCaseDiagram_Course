export const ADVANCED_TEST_LESSON = [
  // 1. Drag to Bins
  {
    phase: 'learning',
    type: 'interactive',
    interactionType: 'drag_to_bins',
    title: 'Phân loại tính năng',
    question: 'Hãy phân loại các tính năng sau vào đúng nhóm:',
    bins: [
      { id: 'b1', label: 'Bên trong hệ thống (System)' },
      { id: 'b2', label: 'Bên ngoài hệ thống (Actor)' }
    ],
    options: [
      { id: 'opt1', label: 'Lưu trữ CSDL', correctBin: 'b1' },
      { id: 'opt2', label: 'Khách hàng', correctBin: 'b2' },
      { id: 'opt3', label: 'Tính tiền', correctBin: 'b1' },
      { id: 'opt4', label: 'API Thanh toán MoMo', correctBin: 'b2' }
    ],
    explanation: [
      { text: 'CSDL và Tính tiền là tính năng nội tại của hệ thống. Khách hàng và API MoMo là các thực thể bên ngoài tương tác với hệ thống.' }
    ]
  },
  // 2. Server Load
  {
    phase: 'learning',
    type: 'interactive',
    interactionType: 'slider_exploratory',
    title: 'Mô phỏng quá tải hệ thống',
    question: 'Hãy kéo thanh trượt để tăng tải máy chủ lên mức Quá Tải (> 80%) và xem hệ thống phản ứng thế nào.',
    normalNodes: [
      { id: 'n1', label: 'Server 1', isSystem: true, icon: '🖥️', x: 50, y: 50 },
      { id: 'n2', label: 'User', isSystem: false, icon: '👤', x: 20, y: 50 },
      { id: 'n3', label: 'Database', isSystem: true, icon: '🗄️', x: 80, y: 50 }
    ],
    normalEdges: [
      { id: 'e1', source: 'n2', target: 'n1', label: 'Request' },
      { id: 'e2', source: 'n1', target: 'n3', label: 'Query' }
    ],
    overloadNodes: [
      { id: 'n1', label: 'Server 1 (🔥 CRASH)', isSystem: true, icon: '💥', x: 50, y: 50 },
      { id: 'n2', label: 'User (Waiting)', isSystem: false, icon: '⌛', x: 20, y: 50 },
      { id: 'n3', label: 'Database (Locked)', isSystem: true, icon: '🔒', x: 80, y: 50 }
    ],
    overloadEdges: [
      { id: 'e1', source: 'n2', target: 'n1', label: 'Timeout' },
      { id: 'e2', source: 'n1', target: 'n3', label: 'Deadlock' }
    ],
    explanation: [
      { text: 'Khi tải quá cao, hệ thống sẽ gặp hiệu ứng domino: Server crash dẫn đến kết nối CSDL bị treo, và người dùng bị timeout.' }
    ]
  },
  // 3. Ordering
  {
    phase: 'learning',
    type: 'interactive',
    interactionType: 'ordering',
    title: 'Sắp xếp quy trình',
    question: 'Sắp xếp các bước thực hiện thanh toán trực tuyến:',
    options: [
      { id: 'o1', label: 'Khách hàng chọn Mua hàng', correctOrder: 1 },
      { id: 'o2', label: 'Hệ thống gọi API Cổng thanh toán', correctOrder: 2 },
      { id: 'o3', label: 'Cổng thanh toán trả về kết quả', correctOrder: 3 },
      { id: 'o4', label: 'Hệ thống cập nhật trạng thái Đơn hàng', correctOrder: 4 }
    ],
    explanation: [
      { text: 'Quy trình chuẩn: User Trigger -> Call API -> Receive Webhook -> Update DB.' }
    ]
  },
  // 4. Block Mapping
  {
    phase: 'learning',
    type: 'interactive',
    interactionType: 'block_mapping',
    title: 'Lắp ráp mô hình',
    question: 'Hoàn thành các bước đăng nhập:',
    options: [
      { id: 'opt1', label: 'Nhập User/Pass' },
      { id: 'opt2', label: 'Xác thực OTP' },
      { id: 'opt3', label: 'Cấp Token' },
      { id: 'opt4', label: 'Gửi Email Spam' }
    ],
    correctMapping: ['opt1', 'opt2', 'opt3'],
    explanation: [
      { text: 'Đăng nhập bảo mật 2 lớp: Nhập User/Pass -> Xác thực OTP -> Cấp Token.' }
    ]
  },
  // 5. Skill check splash
  {
    phase: 'skill_check',
    type: 'skill_check_transition',
    title: 'Sẵn sàng Test Kỹ Năng?',
    subtitle: 'Thử thách cuối cùng: Equation Builder'
  },
  // 6. Equation Builder
  {
    phase: 'skill_check',
    type: 'interactive',
    interactionType: 'equation_builder',
    title: 'Xây dựng phương trình',
    question: 'Lắp ráp công thức tính Tổng doanh thu:',
    options: [
      { id: 'o1', label: 'Đơn giá' },
      { id: 'o2', label: 'x' },
      { id: 'o3', label: 'Số lượng' },
      { id: 'o4', label: '+' },
      { id: 'o5', label: 'Giảm giá' }
    ],
    correctSequence: ['o1', 'o2', 'o3'],
    explanation: [
      { text: 'Tổng doanh thu cơ bản nhất là bằng Đơn giá nhân với Số lượng.' }
    ]
  }
];
