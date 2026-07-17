const fs = require('fs');
const parser = require('@babel/parser');

const code = fs.readFileSync('src/pages/LessonPlayer.tsx', 'utf-8');
try {
    parser.parse(code, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
} catch (e) {
    console.log(e.message);
    const line = code.split('\n')[e.loc.line - 1];
    console.log(line);
    console.log(' '.repeat(e.loc.column) + '^');
}
