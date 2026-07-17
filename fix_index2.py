import re

with open('src/data/lessons/index.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "import { LESSON_DATA as Lesson14Data } from './Level4_RefiningDiagram/Lesson14_CRUDBomb';",
    "import { LESSON_DATA as Lesson14Data } from './Level4_RefiningDiagram/Lesson1_CRUDTrap';"
)
content = content.replace(
    "import { LESSON_DATA as Lesson15Data } from './Level4_RefiningDiagram/Lesson15_OrphanUseCases';",
    "import { LESSON_DATA as Lesson15Data } from './Level4_RefiningDiagram/Lesson2_OrphanUseCases';"
)
content = content.replace(
    "import { LESSON_DATA as Lesson16Data } from './Level4_RefiningDiagram/Lesson16_SpaghettiDiagram';",
    "import { LESSON_DATA as Lesson16Data } from './Level4_RefiningDiagram/Lesson3_SpaghettiDiagram';"
)
content = content.replace(
    "import { LESSON_DATA as Lesson17Data } from './Level4_RefiningDiagram/Lesson17_SkillCheck';",
    "import { LESSON_DATA as Lesson17Data } from './Level4_RefiningDiagram/Lesson4_LevelReview';"
)

with open('src/data/lessons/index.ts', 'w', encoding='utf-8') as f:
    f.write(content)
