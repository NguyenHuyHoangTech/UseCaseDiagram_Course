const fs = require('fs');
const parser = require('@babel/parser');

const code = fs.readFileSync('src/pages/LessonPlayer.tsx', 'utf-8');
const lines = code.split('\n');

for (let i = 280; i < 600; i++) {
    const subset = [
        ...lines.slice(0, 280),
        ...lines.slice(i)
    ].join('\n');
    try {
        parser.parse(subset, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
        console.log(`Removing lines 280 to ${i} fixes the parse error! Error is likely inside here.`);
        break;
    } catch (e) {
        // continue
    }
}
