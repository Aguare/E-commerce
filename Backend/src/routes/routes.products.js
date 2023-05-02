import { Router } from "express";
import Product from "../models/Product";
import Alert from "../models/Alert";
import createAlert from "../controllers/Errors";

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const product = Product(req.body);
    await product.save();
    const alert = createMessage(
      "Producto registrado",
      "El producto se ha registrado correctamente"
    );
    res.status(200).send(alert);
  } catch (error) {
    const al = createAlert(error);
    res.status(400).send(al);
  }
});

router.put("/update", async (req, res) => {
  try {
    const product = Product(req.body);
    await Product.findByIdAndUpdate(product._id, req.body);
    const alert = createMessage(
      "Producto actualizado",
      "El producto se ha actualizado correctamente"
    );
    res.status(200).send(alert);
  } catch (error) {
    const al = createAlert(error);
    res.status(400).send(al);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    const alert = createMessage(
      "Producto eliminado",
      "El producto se ha eliminado correctamente"
    );
    res.status(200).send(alert);
  } catch (error) {
    const al = createAlert(error);
    res.status(400).send(al);
  }
});

router.get("/allProducts", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("user_seller").exec();
  res.send(product);
});

router.get("/allProductsByUser/:id", async (req, res) => {
  const { id } = req.params;
  const products = await Product.find({ user_seller: { $in: [id] } });
  res.send(products);
});

function createMessage(title, message) {
  return new Alert(title, message, "success", true, 200);
}

export default router;
