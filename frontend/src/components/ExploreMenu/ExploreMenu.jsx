import "./ExploreMenu.css";

import { menu_list } from "../../assets/frontend_assets/assets";
import { useEffect, useRef } from "react";

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const menuElement = menuRef.current;

    const handleWheel = (e) => {
      e.preventDefault();
      menuElement.scrollLeft += e.deltaY; // Scroll horizontal
    };

    menuElement.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup al desmontar
    return () => {
      menuElement.removeEventListener("wheel", handleWheel);
    };
  }, []);
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explora nuestro menú</h1>
      <p className="explore-menu-text">
        Elige entre un menú variado que incluye una variedad deliciosa de
        platos.
      </p>
      <div className="explore-menu-list" ref={menuRef}>
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
