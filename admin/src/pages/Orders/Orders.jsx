import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import "./Orders.css";
import { assets } from "../../assets/admin_assets/assets.js";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });

    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Órdenes</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.nombre + " " + order.address.apellido}
              </p>
              <div className="order-item-address">
                <p>{order.address.calle + ","}</p>
                <p>
                  {order.address.ciudad +
                    ", " +
                    order.address.provincia +
                    ", " +
                    order.address.pais +
                    ", " +
                    order.address.codigoPostal}
                </p>
              </div>
              <p className="order-item-phone">{order.address.telefono}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="En proceso">En proceso</option>
              <option value="En camino">En camino</option>
              <option value="Entregado">Entregado</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
