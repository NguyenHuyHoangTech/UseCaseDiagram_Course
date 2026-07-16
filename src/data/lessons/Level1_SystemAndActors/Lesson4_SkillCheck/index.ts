// Data for Skill Check (Level 1 Review)
export const LESSON_DATA = [
  {
    type: 'theory',
    title: 'Skill Check (Level 1 Review)',
    subtitle: 'Bài tập tổng hợp Level 1.',
    image: null,
    explanation: [
      { text: "Đây là bài học giúp bạn nắm vững kiến thức về phần này. Hãy ấn Continue để chuyển sang phần thực hành nhỏ bên dưới." }
    ]
  },
  {
    type: 'interactive',
    interactionType: 'selection',
    title: 'Thực hành: Skill Check (Level 1 Review)',
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
