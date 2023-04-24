import { Router } from "express";
import User from "../Models/User";

const router = Router();

router.get("/hola", (req, res) => {
  res.send("¡Hola, User!");
});

router.post("/add", async (req, res) => {
  try {
    const user = User(req.body);
    const userSaved = await user.save();
    console.log(userSaved);
    res.send("Ok");
  } catch (error) {
    let title = "";
    let message = "";
    let status = 500;

    if (error.code === 11000) {
      title = "Error de duplicado";
      message = "El nombre de usuario ya está registrado";
      status = 400;
    } else {
      title = "Error desconocido";
      message = "Ha ocurrido un error al intentar guardar el usuario";
    }

    res.status(status).json({ title, message, errorType: error.name });
  }
});

router.get("/list", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

export default router;
