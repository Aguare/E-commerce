import { Router } from "express";
import User from "../Models/User";
import { Alert } from "../Models/Alert";

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
    const al = new Alert("", "", "danger", true, error.code);

    if (error.code === 11000) {
      al.title = "Error de duplicado";
      al.message = "El nombre de usuario ya está registrado";
      status = 400;
    } else {
      al.title = "Error desconocido";
      al.message = "Ha ocurrido un error al intentar guardar el usuario";
    }

    res.status(status).json(al);
  }
});

router.get("/list", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

export default router;
