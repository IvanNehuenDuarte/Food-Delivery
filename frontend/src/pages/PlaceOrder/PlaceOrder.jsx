import { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <div>
      <form action="" className="place-order">
        <div className="place-order-left">
          <p className="title">Información De Envío</p>
          <div className="multi-fields">
            <input type="text" placeholder="Nombre" />
            <input type="text" placeholder="Apellido" />
          </div>
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Calle" />
          <div className="multi-fields">
            <input type="text" placeholder="Ciudad" />
            <input type="text" placeholder="Provincia" />
          </div>
          <div className="multi-fields">
            <input type="text" placeholder="Código Postal" />
            <input type="text" placeholder="País" />
          </div>
          <input type="text" placeholder="Teléfono" />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Total en el carro</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Tarifa de entrega</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            <button>CONTINUAR CON EL PAGO</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
