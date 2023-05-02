import { Router } from "express";
import Alert from "../models/Alert";
import createAlert from "../controllers/Errors";
import Departament from "../models/Departaments";
const router = Router();

router.post("/upload", (req, res) => {
  try {
    const path = "http://localhost:3000/img/products/" + req.file.filename;
    const alert = new Alert("Exito", path, "success", true, 0);
    res.status(200).send(alert);
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

router.get("/getDepartaments", async (req, res) => {
  try {
    const departaments = await Departament.find();
    res.status(200).send(departaments);
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

export default router;
