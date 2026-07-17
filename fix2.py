import re

with open('src/pages/LessonPlayer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove {/* End Frame */}
content = content.replace("      </div> {/* End Frame */}", "      </div>")

# 2. Re-add missing states: selectedOption and initialXp
content = content.replace(
    "const [status, setStatus] = useState<'idle' | 'ready' | 'correct' | 'incorrect' | 'skill_check_incorrect' | 'showing_answer'>('idle');\n  const [mistakesCount, setMistakesCount] = useState(0);",
    "const [status, setStatus] = useState<'idle' | 'ready' | 'correct' | 'incorrect' | 'skill_check_incorrect' | 'showing_answer'>('idle');\n  const [mistakesCount, setMistakesCount] = useState(0);\n  const [selectedOption, setSelectedOption] = useState<any>(null);\n  const initialXp = React.useRef(0).current; // Using ref to prevent re-renders, or just useState"
)
content = content.replace(
    "const initialXp = React.useRef(0).current;",
    "const [initialXp] = useState(xp);"
)

# 3. Add handleTryAgain and handleSeeAnswer back
handle_funcs = """  const handleTryAgain = () => {
    setStatus('idle');
    setSelectedOption(null);
    setHasViewedExplanation(false);
  };

  const handleSeeAnswer = () => {
    setStatus('showing_answer');
    const correctOpt = currentData.options?.find((o: any) => o.isCorrect);
    setSelectedOption(correctOpt);
  };

  const handleNext = () => {"""
content = content.replace("  const handleNext = () => {", handle_funcs)

with open('src/pages/LessonPlayer.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Applied fix2.py!")
