import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_TOKEN,
});

const placeOrder = async (req, res) => {
  const front_url = "http://localhost:5174";

  try {
    const { userId, items, amount, address, user } = req.body; // Extraemos directamente los datos necesarios

    // Crear nueva orden en la base de datos
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const body = {
      items: items.map((item) => ({
        title: item.name,
        unit_price: item.price,
        quantity: item.quantity,
        currency_id: "ARS",
      })),
      // back_urls: {
      //   success: `${front_url}/verify?success=true&orderId=${newOrder}`,
      //   failure: "http://localhost:4000/payment-failure",
      //   pending: "http://localhost:4000/payment-pending",
      // },
      // auto_return: "approved",
    };

    const preference = new Preference(client);

    const result = await preference.create({ body });

    res.json({
      success: true,
      payment_url: result.init_point, // URL para redirigir al cliente
      preference_id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error en el pago" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });

      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findOneAndDelete(orderId);

      res.json({ success: false, message: "No paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error en el pago" });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error al buscar pedidos" });
  }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error al buscar pedidos" });
  }
};

// Api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
