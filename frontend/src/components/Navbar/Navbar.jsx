import { useContext, useState } from "react";
import "./Navbar.css";
// React Icon
import { FaSearch, FaShoppingBasket } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Inicio");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");

    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src="/images/whatafood-logo.svg" alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("Inicio")}
          className={menu === "Inicio" ? "active" : ""}
        >
          Inicio
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menú")}
          className={menu === "Menú" ? "active" : ""}
        >
          Menú
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("Contactanos")}
          className={menu === "Contactanos" ? "active" : ""}
        >
          Contactanos
        </a>
      </ul>
      <div className="navbar-right">
        <FaSearch />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <FaShoppingBasket />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Iniciar Sesión</button>
        ) : (
          <div className="navbar-profile">
            <CgProfile className="icon-profile" />
            <ul className="navbar-profile-dropdown">
              <li>
                <IoBagHandleOutline />
                <p>Órdenes</p>
              </li>
              <hr />
              <li onClick={logOut}>
                <MdOutlineLogout />
                <p>Salir</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
