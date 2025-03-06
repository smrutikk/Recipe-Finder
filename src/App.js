import './App.css';
import RecipeFinder from './Recipe';
import LandingPage from './StartPage';
import Favorites from './favourite_page';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeFinder />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
