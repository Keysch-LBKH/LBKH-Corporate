import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import ResidentPortal from './components/ResidentPortal';
import ExecutiveDashboard from './components/ExecutiveDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/portal" element={<ResidentPortal />} />
        <Route path="/executive" element={<ExecutiveDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
