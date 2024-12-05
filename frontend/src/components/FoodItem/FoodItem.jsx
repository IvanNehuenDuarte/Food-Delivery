import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { useContext } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoMdAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div>
      <div className="food-item">
        <div className="food-item-image-container">
          <img
            src={url + "/images/" + image}
            alt=""
            className="food-item-image"
          />
          {!cartItems[id] ? (
            <FaPlusCircle className="add" onClick={() => addToCart(id)} />
          ) : (
            <div className="food-item-counter">
              <IoIosRemoveCircle
                className="remove-red"
                onClick={() => removeFromCart(id)}
              />
              <p>{cartItems[id]}</p>
              <IoMdAddCircle
                className="add-green"
                onClick={() => addToCart(id)}
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
          </div>
          <div className="food-item-desc">{description}</div>
          <div className="food-item-price">${price}</div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
