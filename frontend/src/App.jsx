import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import LoginSignupPage from "./pages/LoginSignupPage";
import RecipePage from "./pages/RecipePage";
import ProfilePage from "./pages/ProfilePage";
import RecipeListPage from "./pages/RecipeListPage";

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
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/recipes/:type" element={<RecipeListPage />} />
              <Route
                path="/categories/:id/:slug"
                element={<RecipeListPage />}
              />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
