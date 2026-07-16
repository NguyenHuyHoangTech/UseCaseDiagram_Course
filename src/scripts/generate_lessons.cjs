const fs = require('fs');
const path = require('path');

const lessonsData = [
  // Level 1
  { id: 1, title: 'Thế giới trong và ngoài (System Boundary)', subtitle: 'Kéo thả phần cứng, mã nguồn, người dùng vào trong/ngoài ranh giới.', level: 'Level1_SystemAndActors', slug: 'Lesson1_SystemBoundary' },
  { id: 2, title: 'Ai đang dùng hệ thống? (Primary Actors)', subtitle: 'Chọn đáp án để xác định Actor.', level: 'Level1_SystemAndActors', slug: 'Lesson2_PrimaryActors' },
  { id: 3, title: 'Những vị khách thầm lặng (Secondary/Non-human Actors)', subtitle: 'Xác định Actor ngoại vi.', level: 'Level1_SystemAndActors', slug: 'Lesson3_SecondaryActors' },
  { id: 4, title: 'Skill Check (Level 1 Review)', subtitle: 'Bài tập tổng hợp Level 1.', level: 'Level1_SystemAndActors', slug: 'Lesson4_SkillCheck' },
  
  // Level 2
  { id: 5, title: 'Use Case là gì? (Quy tắc Động từ - Danh từ)', subtitle: 'Chọn nhãn tên chuẩn.', level: 'Level2_CoreUseCases', slug: 'Lesson5_UseCaseNaming' },
  { id: 6, title: 'Sợi dây liên kết (Association)', subtitle: 'Kết nối đúng Actor với đúng Use Case.', level: 'Level2_CoreUseCases', slug: 'Lesson6_Association' },
  { id: 7, title: 'Độ chi tiết (Granularity)', subtitle: 'Tìm lỗi sai và gộp Use Case.', level: 'Level2_CoreUseCases', slug: 'Lesson7_Granularity' },
  { id: 8, title: 'Skill Check (Level 2 Review)', subtitle: 'Chốt kiến thức Level 2.', level: 'Level2_CoreUseCases', slug: 'Lesson8_SkillCheck' },
  
  // Level 3
  { id: 9, title: 'Mắt xích bắt buộc (<<include>>)', subtitle: 'Kịch bản bắt buộc.', level: 'Level3_AdvancedRelationships', slug: 'Lesson9_Include' },
  { id: 10, title: 'Lối rẽ tùy chọn (<<extend>>)', subtitle: 'Mô phỏng kịch bản tùy chọn.', level: 'Level3_AdvancedRelationships', slug: 'Lesson10_Extend' },
  { id: 11, title: 'Cạm bẫy Include vs Extend', subtitle: 'Trắc nghiệm phân loại tình huống.', level: 'Level3_AdvancedRelationships', slug: 'Lesson11_IncludeVsExtend' },
  { id: 12, title: 'Kế thừa (Generalization)', subtitle: 'Sơ đồ phân cấp Actor.', level: 'Level3_AdvancedRelationships', slug: 'Lesson12_Generalization' },
  { id: 13, title: 'Skill Check (Level 3 Review)', subtitle: 'Bài kiểm tra hóc búa về mũi tên.', level: 'Level3_AdvancedRelationships', slug: 'Lesson13_SkillCheck' },
  
  // Level 4
  { id: 14, title: 'Bẫy "CRUD"', subtitle: 'Tối giản hóa sơ đồ, gộp Use Case quản lý.', level: 'Level4_RefiningDiagram', slug: 'Lesson14_CRUDBomb' },
  { id: 15, title: 'Use Case "mồ côi" và Ranh giới lỏng lẻo', subtitle: 'Giao diện gỡ lỗi.', level: 'Level4_RefiningDiagram', slug: 'Lesson15_OrphanUseCases' },
  { id: 16, title: '"Mì Spaghetti" (Tránh chồng chéo)', subtitle: 'Sắp xếp lại đường nối không cắt nhau.', level: 'Level4_RefiningDiagram', slug: 'Lesson16_SpaghettiDiagram' },
  { id: 17, title: 'Skill Check (Level 4 Review)', subtitle: 'Chấm điểm sơ đồ vi phạm quy tắc.', level: 'Level4_RefiningDiagram', slug: 'Lesson17_SkillCheck' },
  
  // Level 5
  { id: 18, title: 'Hệ thống phân quyền (Web MVC2 Context)', subtitle: 'Thiết kế phân quyền phức tạp.', level: 'Level5_RealWorldArchitectures', slug: 'Lesson18_RoleBasedAccess' },
  { id: 19, title: 'Ứng dụng thuật toán học tập (EdTech)', subtitle: 'Hệ thống Flashcard SRS.', level: 'Level5_RealWorldArchitectures', slug: 'Lesson19_EdTechSystem' },
  { id: 20, title: 'Tương tác Phần cứng - Phần mềm (IoT Context)', subtitle: 'Hệ thống hộp thuốc thông minh.', level: 'Level5_RealWorldArchitectures', slug: 'Lesson20_IoTSystem' },
  { id: 21, title: 'Sandbox tự do', subtitle: 'Kéo thả xây dựng sơ đồ tự do.', level: 'Level5_RealWorldArchitectures', slug: 'Lesson21_Sandbox' },
  { id: 22, title: 'Final Mastery (Level 5 Skill Check)', subtitle: 'Bài thi lớn cuối khóa.', level: 'Level5_RealWorldArchitectures', slug: 'Lesson22_FinalMastery' },
];

const basePath = path.join(__dirname, '../data/lessons');

if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath, { recursive: true });
}

lessonsData.forEach(lesson => {
  const levelPath = path.join(basePath, lesson.level);
  if (!fs.existsSync(levelPath)) {
    fs.mkdirSync(levelPath, { recursive: true });
  }
  
  const lessonPath = path.join(levelPath, lesson.slug);
  if (!fs.existsSync(lessonPath)) {
    fs.mkdirSync(lessonPath, { recursive: true });
  }

  // Generate demo data
  const template = `// Data for ${lesson.title}
export const LESSON_DATA = [
  {
    type: 'theory',
    title: '${lesson.title}',
    subtitle: '${lesson.subtitle}',
    image: null,
    explanation: [
      { text: "Đây là bài học giúp bạn nắm vững kiến thức về phần này. Hãy ấn Continue để chuyển sang phần thực hành nhỏ bên dưới." }
    ]
  },
  {
    type: 'interactive',
    interactionType: 'selection',
    title: 'Thực hành: ${lesson.title}',
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
`;

  fs.writeFileSync(path.join(lessonPath, 'index.ts'), template, 'utf8');
});

const indexTemplate = `// Central registry of all lessons
${lessonsData.map(l => `import { LESSON_DATA as Lesson${l.id}Data } from './${l.level}/${l.slug}';`).join('\n')}

export const ALL_LESSONS: Record<string, any[]> = {
${lessonsData.map(l => `  "${l.id}": Lesson${l.id}Data,`).join('\n')}
};

export const LESSON_METADATA = ${JSON.stringify(lessonsData, null, 2)};
`;

fs.writeFileSync(path.join(basePath, 'index.ts'), indexTemplate, 'utf8');

console.log('Successfully generated 22 lessons and index registry.');
