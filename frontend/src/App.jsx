import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './components/home/Home';


function App() {
  return (
    <Router>
      <div className="app" dir="rtl">
        <Routes>
          {/* Routes WITHOUT Navbar/Footer */}
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}

          {/* Routes WITH Navbar/Footer */}
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