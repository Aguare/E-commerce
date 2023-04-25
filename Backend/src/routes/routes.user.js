import { Router } from "express";
import User from "../models/User";
import { createAlert } from "../controllers/Errors";

const router = Router();

router.get("/hola", (req, res) => {
  res.send("¡Hola, User!");
});

router.post("/add", async (req, res) => {
  try {
    const user = User(req.body);
    const userSaved = await user.save();
    console.log(userSaved);
    res.status(201).send(userSaved);
  } catch (error) {
    const al = createAlert(error);
    res.status(400).send(al);
  }
});

router.get("/list", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

export default router;
