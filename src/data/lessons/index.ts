// Central registry of all lessons
import { LESSON_DATA as Lesson1Data } from './Level1_SystemAndActors/Lesson1_SystemBoundary';
import { LESSON_DATA as Lesson2Data } from './Level1_SystemAndActors/Lesson2_PrimaryActors';
import { LESSON_DATA as Lesson3Data } from './Level1_SystemAndActors/Lesson3_SecondaryActors';
import { LESSON_DATA as Lesson4Data } from './Level1_SystemAndActors/Lesson4_SkillCheck';
import { LESSON_DATA as Lesson5Data } from './Level2_CoreUseCases/Lesson5_UseCaseNaming';
import { LESSON_DATA as Lesson6Data } from './Level2_CoreUseCases/Lesson6_Association';
import { LESSON_DATA as Lesson7Data } from './Level2_CoreUseCases/Lesson7_Granularity';
import { LESSON_DATA as Lesson8Data } from './Level2_CoreUseCases/Lesson8_SkillCheck';
import { LESSON_DATA as Lesson9Data } from './Level3_AdvancedRelationships/Lesson9_Include';
import { LESSON_DATA as Lesson10Data } from './Level3_AdvancedRelationships/Lesson10_Extend';
import { LESSON_DATA as Lesson11Data } from './Level3_AdvancedRelationships/Lesson11_IncludeVsExtend';
import { LESSON_DATA as Lesson12Data } from './Level3_AdvancedRelationships/Lesson12_Generalization';
import { LESSON_DATA as Lesson13Data } from './Level3_AdvancedRelationships/Lesson13_SkillCheck';
import { LESSON_DATA as Lesson14Data } from './Level4_RefiningDiagram/Lesson14_CRUDBomb';
import { LESSON_DATA as Lesson15Data } from './Level4_RefiningDiagram/Lesson15_OrphanUseCases';
import { LESSON_DATA as Lesson16Data } from './Level4_RefiningDiagram/Lesson16_SpaghettiDiagram';
import { LESSON_DATA as Lesson17Data } from './Level4_RefiningDiagram/Lesson17_SkillCheck';
import { LESSON_DATA as Lesson18Data } from './Level5_RealWorldArchitectures/Lesson18_RoleBasedAccess';
import { LESSON_DATA as Lesson19Data } from './Level5_RealWorldArchitectures/Lesson19_EdTechSystem';
import { LESSON_DATA as Lesson20Data } from './Level5_RealWorldArchitectures/Lesson20_IoTSystem';
import { LESSON_DATA as Lesson21Data } from './Level5_RealWorldArchitectures/Lesson21_Sandbox';
import { LESSON_DATA as Lesson22Data } from './Level5_RealWorldArchitectures/Lesson22_FinalMastery';

export const ALL_LESSONS: Record<string, any[]> = {
  "1": Lesson1Data,
  "2": Lesson2Data,
  "3": Lesson3Data,
  "4": Lesson4Data,
  "5": Lesson5Data,
  "6": Lesson6Data,
  "7": Lesson7Data,
  "8": Lesson8Data,
  "9": Lesson9Data,
  "10": Lesson10Data,
  "11": Lesson11Data,
  "12": Lesson12Data,
  "13": Lesson13Data,
  "14": Lesson14Data,
  "15": Lesson15Data,
  "16": Lesson16Data,
  "17": Lesson17Data,
  "18": Lesson18Data,
  "19": Lesson19Data,
  "20": Lesson20Data,
  "21": Lesson21Data,
  "22": Lesson22Data,
};

export const LESSON_METADATA = [
  {
    "id": 1,
    "title": "Thế giới trong và ngoài (System Boundary)",
    "subtitle": "Kéo thả phần cứng, mã nguồn, người dùng vào trong/ngoài ranh giới.",
    "level": "Level1_SystemAndActors",
    "slug": "Lesson1_SystemBoundary"
  },
  {
    "id": 2,
    "title": "Ai đang dùng hệ thống? (Primary Actors)",
    "subtitle": "Chọn đáp án để xác định Actor.",
    "level": "Level1_SystemAndActors",
    "slug": "Lesson2_PrimaryActors"
  },
  {
    "id": 3,
    "title": "Những vị khách thầm lặng (Secondary/Non-human Actors)",
    "subtitle": "Xác định Actor ngoại vi.",
    "level": "Level1_SystemAndActors",
    "slug": "Lesson3_SecondaryActors"
  },
  {
    "id": 4,
    "title": "Skill Check (Level 1 Review)",
    "subtitle": "Bài tập tổng hợp Level 1.",
    "level": "Level1_SystemAndActors",
    "slug": "Lesson4_SkillCheck"
  },
  {
    "id": 5,
    "title": "Use Case là gì? (Quy tắc Động từ - Danh từ)",
    "subtitle": "Chọn nhãn tên chuẩn.",
    "level": "Level2_CoreUseCases",
    "slug": "Lesson5_UseCaseNaming"
  },
  {
    "id": 6,
    "title": "Sợi dây liên kết (Association)",
    "subtitle": "Kết nối đúng Actor với đúng Use Case.",
    "level": "Level2_CoreUseCases",
    "slug": "Lesson6_Association"
  },
  {
    "id": 7,
    "title": "Độ chi tiết (Granularity)",
    "subtitle": "Tìm lỗi sai và gộp Use Case.",
    "level": "Level2_CoreUseCases",
    "slug": "Lesson7_Granularity"
  },
  {
    "id": 8,
    "title": "Skill Check (Level 2 Review)",
    "subtitle": "Chốt kiến thức Level 2.",
    "level": "Level2_CoreUseCases",
    "slug": "Lesson8_SkillCheck"
  },
  {
    "id": 9,
    "title": "Quan hệ kế thừa (Generalization)",
    "subtitle": "Gom nhóm Actor hoặc Use Case có chung bản chất.",
    "level": "Level3_AdvancedRelationships",
    "slug": "Lesson9_Include"
  },
  {
    "id": 10,
    "title": "Kỹ thuật trích xuất từ khóa",
    "subtitle": "Phương pháp gạch chân: Danh từ -> Actor, Cụm động từ -> Use Case.",
    "level": "Level3_AdvancedRelationships",
    "slug": "Lesson10_Extend"
  },
  {
    "id": 11,
    "title": "Mức độ chi tiết (Granularity - Khi nào gom, khi nào tách)",
    "subtitle": "Quy tắc CRUD và phân quyền Actor.",
    "level": "Level3_AdvancedRelationships",
    "slug": "Lesson11_IncludeVsExtend"
  },
  {
    "id": 12,
    "title": "Các lỗi chết người (Anti-patterns)",
    "subtitle": "Nhận diện và sửa các biểu đồ vẽ sai bét.",
    "level": "Level3_AdvancedRelationships",
    "slug": "Lesson12_Generalization"
  },
  {
    "id": 13,
    "title": "Cấu trúc tài liệu Đặc tả Use Case",
    "subtitle": "Template chuẩn, Tiền điều kiện & Hậu điều kiện.",
    "level": "Level3_AdvancedRelationships",
    "slug": "Lesson13_SkillCheck"
  },
  {
    "id": 14,
    "title": "Tránh lỗi phân mảnh CRUD (CRUD Bomb)",
    "subtitle": "Gom nhóm 4 hành động cơ bản để tối ưu hiển thị.",
    "level": "Level4_RefiningDiagram",
    "slug": "Lesson14_CRUDBomb"
  },
  {
    "id": 15,
    "title": "Tránh lỗi Use Case mồ côi (Orphan Use Cases)",
    "subtitle": "Kết nối Use Case vô chủ với Actor phù hợp.",
    "level": "Level4_RefiningDiagram",
    "slug": "Lesson15_OrphanUseCases"
  },
  {
    "id": 16,
    "title": "Tránh lỗi chồng chéo (Spaghetti Diagram)",
    "subtitle": "Bố trí lại biểu đồ để giảm bớt giao cắt.",
    "level": "Level4_RefiningDiagram",
    "slug": "Lesson16_SpaghettiDiagram"
  },
  {
    "id": 17,
    "title": "Case Study 1: Hệ thống nhỏ",
    "subtitle": "Thực hành vẽ Máy ATM và App đặt đồ ăn.",
    "level": "Level4_RefiningDiagram",
    "slug": "Lesson17_SkillCheck"
  },
  {
    "id": 18,
    "title": "Hệ thống phân quyền (Web MVC2 Context)",
    "subtitle": "Thiết kế phân quyền phức tạp.",
    "level": "Level5_RealWorldArchitectures",
    "slug": "Lesson18_RoleBasedAccess"
  },
  {
    "id": 19,
    "title": "Ứng dụng thuật toán học tập (EdTech)",
    "subtitle": "Hệ thống Flashcard SRS.",
    "level": "Level5_RealWorldArchitectures",
    "slug": "Lesson19_EdTechSystem"
  },
  {
    "id": 20,
    "title": "Tương tác Phần cứng - Phần mềm (IoT Context)",
    "subtitle": "Hệ thống hộp thuốc thông minh.",
    "level": "Level5_RealWorldArchitectures",
    "slug": "Lesson20_IoTSystem"
  },
  {
    "id": 21,
    "title": "Sandbox tự do",
    "subtitle": "Kéo thả xây dựng sơ đồ tự do.",
    "level": "Level5_RealWorldArchitectures",
    "slug": "Lesson21_Sandbox"
  },
  {
    "id": 22,
    "title": "Final Mastery (Level 5 Skill Check)",
    "subtitle": "Bài thi lớn cuối khóa.",
    "level": "Level5_RealWorldArchitectures",
    "slug": "Lesson22_FinalMastery"
  }
];
