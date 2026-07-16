// Data for Sợi dây liên kết (Association)
export const LESSON_DATA = [
  {
    type: 'theory',
    title: 'Sợi dây liên kết (Association)',
    subtitle: 'Kết nối đúng Actor với đúng Use Case.',
    image: null,
    explanation: [
      { text: "Đây là bài học giúp bạn nắm vững kiến thức về phần này. Hãy ấn Continue để chuyển sang phần thực hành nhỏ bên dưới." }
    ]
  },
  {
    type: 'interactive',
    interactionType: 'selection',
    title: 'Thực hành: Sợi dây liên kết (Association)',
    question: 'Hãy chọn đáp án đúng để hoàn thành đoạn học nhỏ này.',
    options: [
      { id: 'opt1', label: 'Đáp án A (Sai)', isCorrect: false },
      { id: 'opt2', label: 'Đáp án B (Đúng)', isCorrect: true, hint: 'Tuyệt vời, đây là lựa chọn chính xác!' },
      { id: 'opt3', label: 'Đáp án C (Sai)', isCorrect: false },
    ],
    explanation: [
      { text: "Đáp án B là chính xác vì nó phản ánh đúng tính chất của bài học này." }
    ]
  }
];
