import { Router } from "express";
import Alert from "../models/Alert";
import createAlert from "../controllers/Errors";
import Card from "../models/Card";
import Order from "../models/Order";
import Revenue from "../models/Revenue";
import Product from "../models/Product";

const router = Router();

router.post("/addCard", async (req, res) => {
  try {
    const card = Card(req.body);
    const cardNew = await card.save();
    res.status(200).send(cardNew);
  } catch (error) {
    const al = createAlert(error);
    res.status(400).send(al);
  }
});

router.get("/allCardsByUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cards = await Card.find({ owner: { $in: [id] } });
    res.status(200).send(cards);
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

router.get("/getOrdersByUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.find({ user_client: { $in: [id] } }).sort({
      createdAt: -1,
    });
    res.status(200).send(orders);
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

router.get("/getOrderById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("products.product");
    res.status(200).send(order);
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

router.get("/cancelOrder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    order.status = "canceled";
    await order.save();
    const alert = createMessage(
      "Orden cancelada",
      "La orden se ha cancelado correctamente"
    );
    res.status(200).send(alert);
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

router.get("/getAllOrderOnProcess", async (req, res) => {
  try {
    const orders = await Order.find({ status: "pending" }).populate(
      "user_client"
    );
    res.status(200).send(orders);
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

router.put("/updateOrder", async (req, res) => {
  try {
    const order = Order(req.body);
    await Order.findOneAndUpdate({ _id: order._id }, order);
    const alert = createMessage(
      "Orden actualizada",
      "La orden se ha actualizado correctamente"
    );
    res.status(200).send(alert);
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

router.post("/addOrder", async (req, res) => {
  try {
    let order = Order(req.body);
    await order.save();
    const alert = createMessage(
      "Orden registrada",
      "La orden se ha registrado correctamente"
    );
    registerRevenue(order);
    res.status(200).send(alert);
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

async function registerRevenue(order) {
  let products = order.products;
  products.forEach(async (product) => {
    const string = product.toString();
    const match = string.match(/"([^"]+)"/);
    const result = match[1];
    const prod = await Product.findById(result);
    const pri = parseFloat(prod.price);
    const revenue = Revenue({
      user_seller: prod.user_seller,
      user_client: order.user_client,
      revenue_seller: (pri * 0.95).toFixed(2),
      revenue_corporation: (pri * 0.05).toFixed(2),
    });
    await Product.findOneAndUpdate(
      { _id: product.product._id },
      { $inc: { stock: -product.quantity } }
    );
    await revenue.save();
  });
}

function createMessage(title, message) {
  return new Alert(title, message, "success", true, 200);
}

export default router;
