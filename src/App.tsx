import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LessonPlayer from './pages/LessonPlayer';
import LevelReview from './pages/LevelReview';
import MascotPlayground from './pages/MascotPlayground';
import TestMap360 from './pages/TestMap360';
import AdvancedLessonPlayer from './pages/AdvancedLessonPlayer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lesson" element={<LessonPlayer />} />
        <Route path="/advanced-lesson" element={<AdvancedLessonPlayer />} />
        <Route path="/review" element={<LevelReview />} />
        <Route path="/map" element={<TestMap360 />} />
        <Route path="/playground" element={<MascotPlayground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
