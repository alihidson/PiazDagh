import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';    // ensure case matches folder name (navbar lowercase)
// import Home from './components/home/Home';          // create placeholder pages
// import Recipes from './pages/Recipes';              // or wherever you define routes

function App() {
  return (
    <Router>
      <div className="app" dir="rtl">
        <Navbar />
        <main>
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/occasions" element={<Occasions />} />
            <Route path="/kitchen-gear" element={<KitchenGear />} />
            <Route path="/techniques" element={<Techniques />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/subscribe" element={<Subscribe />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;