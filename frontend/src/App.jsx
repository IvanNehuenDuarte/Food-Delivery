import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
// import Verify from "./pages/Verify/Verify.jsx";
import Footer from "./components/Footer/Footer.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          {/* <Route path="/verify" element={<Verify />} /> */}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
