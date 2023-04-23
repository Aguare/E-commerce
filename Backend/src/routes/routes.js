import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

router.get("/about", (req, res) => {
  res.send("¡Hola, About!");
});

export default router;
