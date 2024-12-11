import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_TOKEN,
});

const placeOrder = async (req, res) => {
  const front_url = "http://localhost:5173";

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
      back_urls: {
        success: `${front_url}/verify?success=true&orderId=${newOrder}`,
        failure: "http://localhost:4000/payment-failure",
        pending: "http://localhost:4000/payment-pending",
      },
      auto_return: "approved",
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

const verifyOrder = async () => {
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

export { placeOrder, verifyOrder };
