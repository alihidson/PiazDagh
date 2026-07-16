import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import LoginSignupPage from './pages/LoginSignupPage';
import RecipePage from './pages/RecipePage';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app" dir="rtl">
          <Routes>
            {/* Routes WITHOUT Navbar/Footer */}
            <Route path="/auth" element={<LoginSignupPage />} />
            
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipe/:id/:slug" element={<RecipePage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;