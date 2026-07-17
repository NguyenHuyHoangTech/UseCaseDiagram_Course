// Central registry of all lessons
import { LESSON_DATA as Lesson1Data } from './Level1_SystemAndActors/Lesson1_SystemBoundary';
import { LESSON_DATA as Lesson2Data } from './Level1_SystemAndActors/Lesson2_PrimaryActors';
import { LESSON_DATA as Lesson3Data } from './Level1_SystemAndActors/Lesson3_SecondaryActors';
import { LESSON_DATA as Lesson4Data } from './Level1_SystemAndActors/Lesson4_SkillCheck';
import { LESSON_DATA as Lesson5Data } from './Level2_CoreUseCases/Lesson1_VerbNoun';
import { LESSON_DATA as Lesson6Data } from './Level2_CoreUseCases/Lesson2_Association';
import { LESSON_DATA as Lesson7Data } from './Level2_CoreUseCases/Lesson3_LevelReview';
import { LESSON_DATA as Lesson8Data } from './Level3_AdvancedRelationships/Lesson1_Include';
import { LESSON_DATA as Lesson9Data } from './Level3_AdvancedRelationships/Lesson2_Extend';
import { LESSON_DATA as Lesson10Data } from './Level3_AdvancedRelationships/Lesson3_Generalization';
import { LESSON_DATA as Lesson11Data } from './Level4_RefiningDiagram/Lesson1_CRUDTrap';
import { LESSON_DATA as Lesson12Data } from './Level4_RefiningDiagram/Lesson2_OrphanUseCases';
import { LESSON_DATA as Lesson13Data } from './Level4_RefiningDiagram/Lesson3_SpaghettiDiagram';
import { LESSON_DATA as Lesson14Data } from './Level4_RefiningDiagram/Lesson4_LevelReview';
import { LESSON_DATA as Lesson15Data } from './Level5_RealWorldArchitectures/Lesson1_ParkingActors';
import { LESSON_DATA as Lesson16Data } from './Level5_RealWorldArchitectures/Lesson2_ParkingUseCases';
import { LESSON_DATA as Lesson17Data } from './Level5_RealWorldArchitectures/Lesson3_ParkingLogic';
import { LESSON_DATA as Lesson18Data } from './Level5_RealWorldArchitectures/Lesson4_FinalSandbox';

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
};

export const LESSON_METADATA = [
  {
    "id": 1,
    "title": "Giới hạn của Quyền lực",
    "subtitle": "Màn hình Khởi động",
    "level": "Level1_SystemAndActors",
    "slug": "Lesson1_SystemBoundary"
  },
  {
    "id": 2,
    "title": "Ai cần ai?",
    "subtitle": "Màn hình Khởi động",
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
    "title": "Thông điệp mã hóa",
    "subtitle": "Khởi động",
    "level": "Level2_CoreUseCases",
    "slug": "Lesson1_VerbNoun"
  },
  {
    "id": 6,
    "title": "Thần giao cách cảm?",
    "subtitle": "Khởi động",
    "level": "Level2_CoreUseCases",
    "slug": "Lesson2_Association"
  },
  {
    "id": 7,
    "title": "Skill check",
    "subtitle": "Level 2: Core Use Cases",
    "level": "Level2_CoreUseCases",
    "slug": "Lesson3_LevelReview"
  },
  {
    "id": 8,
    "title": "Quy luật bất biến",
    "subtitle": "Khởi động",
    "level": "Level3_AdvancedRelationships",
    "slug": "Lesson1_Include"
  },
  {
    "id": 9,
    "title": "Thêm Topping hay Không?",
    "subtitle": "Khởi động",
    "level": "Level3_AdvancedRelationships",
    "slug": "Lesson2_Extend"
  },
  {
    "id": 10,
    "title": "Đặc quyền của VIP",
    "subtitle": "Khởi động",
    "level": "Level3_AdvancedRelationships",
    "slug": "Lesson3_Generalization"
  },
  {
    "id": 11,
    "title": "LEVEL 4: Refining the Diagram",
    "subtitle": "Tối ưu Sơ đồ - Bẫy CRUD",
    "level": "Level4_RefiningDiagram",
    "slug": "Lesson1_CRUDTrap"
  },
  {
    "id": 12,
    "title": "Bài 2: Use Case Mồ Côi",
    "subtitle": "Orphaned Use Cases",
    "level": "Level4_RefiningDiagram",
    "slug": "Lesson2_OrphanUseCases"
  },
  {
    "id": 13,
    "title": "Bài 3: Mì Spaghetti",
    "subtitle": "Tránh giao cắt trong Sơ đồ",
    "level": "Level4_RefiningDiagram",
    "slug": "Lesson3_SpaghettiDiagram"
  },
  {
    "id": 14,
    "title": "Skill check",
    "subtitle": "Kiểm tra kỹ năng Level 4",
    "level": "Level4_RefiningDiagram",
    "slug": "Lesson4_LevelReview"
  },
  {
    "id": 15,
    "title": "LEVEL 5: Real-World Architectures",
    "subtitle": "Đãi cát tìm vàng - Nhận diện Tác nhân",
    "level": "Level5_RealWorldArchitectures",
    "slug": "Lesson1_ParkingActors"
  },
  {
    "id": 16,
    "title": "Bài 2: Vắt kiệt Động từ",
    "subtitle": "Trích xuất Core Use Case",
    "level": "Level5_RealWorldArchitectures",
    "slug": "Lesson2_ParkingUseCases"
  },
  {
    "id": 17,
    "title": "Bài 3: Giải mã Ẩn ý",
    "subtitle": "Xây dựng Logic Include/Extend",
    "level": "Level5_RealWorldArchitectures",
    "slug": "Lesson3_ParkingLogic"
  },
  {
    "id": 18,
    "title": "Mảnh ghép cuối cùng",
    "subtitle": "Trận chiến cuối cùng",
    "level": "Level5_RealWorldArchitectures",
    "slug": "Lesson4_FinalSandbox"
  }
];
