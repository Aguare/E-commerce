import { Router } from "express";
import User from "../models/User";
import Alert from "../models/Alert";
import createAlert from "../controllers/Errors";

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const user = User(req.body);
    const userSaved = await user.save();
    console.log(userSaved);
    const alert = createMessage(
      "Usuario registrado",
      "El usuario se ha registrado correctamente"
    );
    res.status(200).send(alert);
  } catch (error) {
    const al = createAlert(error);
    res.status(400).send(al);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req.body);
    const alert = createMessage(
      "Usuario actualizado",
      "El usuario se ha actualizado correctamente"
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
    await User.findByIdAndDelete(id);
    const alert = createMessage(
      "Usuario eliminado",
      "El usuario se ha eliminado correctamente"
    );
    res.status(200).send(alert);
  } catch (error) {
    const al = createAlert(error);
    res.status(400).send(al);
  }
});

router.get("/list", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

function createMessage(title, message) {
  return new Alert(title, message, "success", true, 200);
}

export default router;
