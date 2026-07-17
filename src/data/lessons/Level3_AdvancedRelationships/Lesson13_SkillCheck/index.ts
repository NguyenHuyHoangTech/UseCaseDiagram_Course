export const LESSON_DATA = [
  {
    type: 'theory', phase: 'skill_check',
    title: 'Lesson Review (Level 3)',
    subtitle: 'Đánh giá tổng hợp năng lực.',
    image: null,
    explanation: [
      { text: "Đây là bài Review tổng hợp kiến thức Level 3 gồm 10 câu hỏi. Bạn không được phép thử lại (No Retry). Hãy tập trung tối đa!" }
    ]
  },
  { type: 'interactive', phase: 'skill_check', interactionType: 'selection', title: 'Câu 1/10', question: 'Mũi tên <<include>> trỏ từ đâu đến đâu?', options: [{ id: '1', label: 'Từ Use Case cha tới Use Case được gọi (bắt buộc).', isCorrect: true }, { id: '2', label: 'Từ Use Case được gọi tới Use Case cha.', isCorrect: false }], explanation: [] },
  { type: 'interactive', phase: 'skill_check', interactionType: 'selection', title: 'Câu 2/10', question: 'Mũi tên <<extend>> trỏ từ đâu đến đâu?', options: [{ id: '1', label: 'Từ Use Case mở rộng (phụ) về Use Case cơ sở (chính).', isCorrect: true }, { id: '2', label: 'Từ Use Case chính tới Use Case phụ.', isCorrect: false }], explanation: [] },
  { type: 'interactive', phase: 'skill_check', interactionType: 'selection', title: 'Câu 3/10', question: 'Khi gộp Khách hàng VIP và Khách thường thành Khách hàng, ta dùng quan hệ gì?', options: [{ id: '1', label: 'Generalization (Kế thừa).', isCorrect: true }, { id: '2', label: 'Association (Liên kết).', isCorrect: false }], explanation: [] },
  { type: 'interactive', phase: 'skill_check', interactionType: 'selection', title: 'Câu 4/10', question: 'Cụm từ "Hệ thống hiển thị popup" có phải là Use Case không?', options: [{ id: '1', label: 'Không, đây là mô tả UI giao diện.', isCorrect: true }, { id: '2', label: 'Có, vì đó là hành động.', isCorrect: false }], explanation: [] },
  { type: 'interactive', phase: 'skill_check', interactionType: 'selection', title: 'Câu 5/10', question: 'Admin và User đều xem bài viết, nhưng Admin có thể xóa bài. Có nên gộp Xóa bài vào "Quản lý bài" và nối cả 2 Actor vào không?', options: [{ id: '1', label: 'Không, phải tách ra vì phân quyền khác nhau.', isCorrect: true }, { id: '2', label: 'Có, cho gọn.', isCorrect: false }], explanation: [] },
  { type: 'interactive', phase: 'skill_check', interactionType: 'selection', title: 'Câu 6/10', question: 'Anti-pattern nào mô tả việc vẽ Use Case như các bước nối tiếp nhau?', options: [{ id: '1', label: 'Use Case như Lưu đồ (Flowchart).', isCorrect: true }, { id: '2', label: 'CRUD Bomb.', isCorrect: false }], explanation: [] },
  { type: 'interactive', phase: 'skill_check', interactionType: 'selection', title: 'Câu 7/10', question: '"Thanh toán" là bắt buộc khi "Mua hàng". Dùng quan hệ gì?', options: [{ id: '1', label: '<<include>>', isCorrect: true }, { id: '2', label: '<<extend>>', isCorrect: false }], explanation: [] },
  { type: 'interactive', phase: 'skill_check', interactionType: 'selection', title: 'Câu 8/10', question: '"Dùng voucher" là tùy chọn khi "Thanh toán". Dùng quan hệ gì?', options: [{ id: '1', label: '<<extend>>', isCorrect: true }, { id: '2', label: '<<include>>', isCorrect: false }], explanation: [] },
  { type: 'interactive', phase: 'skill_check', interactionType: 'selection', title: 'Câu 9/10', question: 'Actor nào sau đây hợp lệ?', options: [{ id: '1', label: 'Timer (Bộ đếm thời gian kích hoạt hệ thống ngầm).', isCorrect: true }, { id: '2', label: 'Chính bản thân hệ thống đang thiết kế.', isCorrect: false }], explanation: [] },
  { type: 'interactive', phase: 'skill_check', interactionType: 'selection', title: 'Câu 10/10', question: 'Mục đích chính của Kế thừa (Generalization) trong Use Case Diagram là gì?', options: [{ id: '1', label: 'Gom nhóm các yếu tố có chung đặc điểm để tối ưu hiển thị, tránh rối rắm.', isCorrect: true }, { id: '2', label: 'Tăng cường số lượng Use Case.', isCorrect: false }], explanation: [] }
];
