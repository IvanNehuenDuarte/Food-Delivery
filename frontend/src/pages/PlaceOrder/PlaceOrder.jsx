import "./PlaceOrder.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    calle: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
    pais: "",
    telefono: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;

        itemInfo["quantity"] = cartItems[item._id];

        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const response = await axios.post(url + `/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        // Redirigir al cliente al flujo de pago de Mercado Pago
        window.location.href = response.data.payment_url;
      } else {
        alert("Error al procesar el pedido.");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error en la solicitud.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <div>
      <form onSubmit={placeOrder} action="" className="place-order">
        <div className="place-order-left">
          <p className="title">Información De Envío</p>
          <div className="multi-fields">
            <input
              required
              name="nombre"
              onChange={onChangeHandler}
              value={data.nombre}
              type="text"
              placeholder="Nombre"
            />
            <input
              required
              name="apellido"
              onChange={onChangeHandler}
              value={data.apellido}
              type="text"
              placeholder="Apellido"
            />
          </div>
          <input
            required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email"
          />
          <input
            required
            name="calle"
            onChange={onChangeHandler}
            value={data.calle}
            type="text"
            placeholder="Calle"
          />
          <div className="multi-fields">
            <input
              required
              name="ciudad"
              onChange={onChangeHandler}
              value={data.ciudad}
              type="text"
              placeholder="Ciudad"
            />
            <input
              required
              name="provincia"
              onChange={onChangeHandler}
              value={data.provincia}
              type="text"
              placeholder="Provincia"
            />
          </div>
          <div className="multi-fields">
            <input
              required
              name="codigoPostal"
              onChange={onChangeHandler}
              value={data.codigoPostal}
              type="text"
              placeholder="Código Postal"
            />
            <input
              required
              name="pais"
              onChange={onChangeHandler}
              value={data.pais}
              type="text"
              placeholder="País"
            />
          </div>
          <input
            required
            name="telefono"
            onChange={onChangeHandler}
            value={data.telefono}
            type="text"
            placeholder="Teléfono"
          />
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
            <button type="submit">CONTINUAR CON EL PAGO</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
