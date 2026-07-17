import re

with open('src/data/lessons/index.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Update imports
content = content.replace(
    "import { LESSON_DATA as Lesson18Data } from './Level5_RealWorldArchitectures/Lesson18_RoleBasedAccess';",
    "import { LESSON_DATA as Lesson18Data } from './Level5_RealWorldArchitectures/Lesson1_ParkingActors';"
)
content = content.replace(
    "import { LESSON_DATA as Lesson19Data } from './Level5_RealWorldArchitectures/Lesson19_EdTechSystem';",
    "import { LESSON_DATA as Lesson19Data } from './Level5_RealWorldArchitectures/Lesson2_ParkingUseCases';"
)
content = content.replace(
    "import { LESSON_DATA as Lesson20Data } from './Level5_RealWorldArchitectures/Lesson20_IoTSystem';",
    "import { LESSON_DATA as Lesson20Data } from './Level5_RealWorldArchitectures/Lesson3_ParkingLogic';"
)
content = content.replace(
    "import { LESSON_DATA as Lesson21Data } from './Level5_RealWorldArchitectures/Lesson21_Sandbox';",
    "import { LESSON_DATA as Lesson21Data } from './Level5_RealWorldArchitectures/Lesson4_FinalSandbox';"
)
content = content.replace(
    "import { LESSON_DATA as Lesson22Data } from './Level5_RealWorldArchitectures/Lesson22_FinalMastery';\n",
    ""
)

# Update ALL_LESSONS
content = content.replace('  "22": Lesson22Data,\n', '')

# Replace JSON for 18
content = re.sub(
    r'\{\s*"id": 18,\s*"title": "Phân quyền phức tạp.*?"slug": "Lesson18_RoleBasedAccess"\s*\}',
    '{\n    "id": 18,\n    "title": "Đãi cát tìm vàng",\n    "subtitle": "Nhận diện Tác nhân & Ranh giới Hệ thống.",\n    "level": "Level5_RealWorldArchitectures",\n    "slug": "Lesson1_ParkingActors"\n  }',
    content, flags=re.DOTALL
)

# Replace JSON for 19
content = re.sub(
    r'\{\s*"id": 19,\s*"title": "Ứng dụng thuật toán học tập.*?"slug": "Lesson19_EdTechSystem"\s*\}',
    '{\n    "id": 19,\n    "title": "Vắt kiệt Động từ",\n    "subtitle": "Trích xuất Core Use Case cho bãi gửi xe.",\n    "level": "Level5_RealWorldArchitectures",\n    "slug": "Lesson2_ParkingUseCases"\n  }',
    content, flags=re.DOTALL
)

# Replace JSON for 20
content = re.sub(
    r'\{\s*"id": 20,\s*"title": "Tương tác Phần cứng - Phần mềm.*?"slug": "Lesson20_IoTSystem"\s*\}',
    '{\n    "id": 20,\n    "title": "Giải mã Ẩn ý",\n    "subtitle": "Xây dựng Logic Include/Extend.",\n    "level": "Level5_RealWorldArchitectures",\n    "slug": "Lesson3_ParkingLogic"\n  }',
    content, flags=re.DOTALL
)

# Replace JSON for 21 and 22
content = re.sub(
    r'\{\s*"id": 21,\s*"title": "Sandbox tự do.*?"slug": "Lesson21_Sandbox"\s*\},\s*\{\s*"id": 22,\s*"title": "Final Mastery.*?"slug": "Lesson22_FinalMastery"\s*\}',
    '{\n    "id": 21,\n    "title": "Chế tác Tối thượng",\n    "subtitle": "Bản vẽ hoàn chỉnh (Final Sandbox).",\n    "level": "Level5_RealWorldArchitectures",\n    "slug": "Lesson4_FinalSandbox"\n  }',
    content, flags=re.DOTALL
)

with open('src/data/lessons/index.ts', 'w', encoding='utf-8') as f:
    f.write(content)
