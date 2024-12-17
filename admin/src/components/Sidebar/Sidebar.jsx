import "./Sidebar.css";
import { FaRegCheckSquare, FaThList } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <MdOutlineAddBox />
          <p>Agregar Item</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <FaThList />
          <p>Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <FaRegCheckSquare />
          <p>Órdenes</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
