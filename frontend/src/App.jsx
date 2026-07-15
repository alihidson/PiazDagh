import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import LoginSignupPage from './pages/LoginSignupPage';


function App() {
  return (
    <Router>
      <div className="app" dir="rtl">
        <Routes>
          {/* Routes WITHOUT Navbar/Footer */}
          
          <Route path="/auth" element={<LoginSignupPage />} />
          <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
            {/* <Route path="/recipes" element={<Recipes />} /> */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;