import { Router } from "express";
import User from "../models/User";
import Alert from "../models/Alert";
import createAlert from "../controllers/Errors";

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const user = User(req.body);
    delete user._id;
    console.log(user);
    const userSaved = await user.save();
    //console.log(userSaved);
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

router.post("/login", async (req, res) => {
  try {
    const user = User(req.body);
    const find = await User.findOne({ username: user.username });
    if (find) {
      if (find.password === user.password) {
        res.status(200).send(find);
      } else {
        const alert = createMessage(
          "Contraseña incorrecta",
          "La contraseña es incorrecta"
        );
        res.status(200).send(alert);
      }
    } else {
      const alert = createMessage(
        "Usuario no encontrado",
        "El usuario no se ha encontrado"
      );
      res.status(200).send(alert);
    }
  } catch (error) {
    const al = createAlert(error);
    res.status(400).send(al);
  }
});

router.put("/update", async (req, res) => {
  try {
    const user = User(req.body);
    await User.findByIdAndUpdate(user._id, user);
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

router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).send(user);
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

router.get("/listEmployees", async (req, res) => {
  const users = await User.find({ type: { $in: ["Admin", "Parcel"] } });
  res.send(users);
});

function createMessage(title, message) {
  return new Alert(title, message, "success", true, 200);
}

export default router;
