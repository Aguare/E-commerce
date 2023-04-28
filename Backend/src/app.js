import express from "express";
import cors from "cors";
import indexRoutes from "./routes/routes.js";
import userRoutes from "./routes/routes.user.js";
import productRoutes from "./routes/routes.products.js";
import path from "path";
import multer from "multer";
import { v4 as uuid } from "uuid";

const app = express();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/img/products"),
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
  },
});

const upload = multer({
  storage: storage,
  dest: path.join(__dirname, "public/img/products"),
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: El archivo debe ser una imagen valida");
  },
}).single("image");

//Settings middlewares
app.use(upload);
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use(express.json());

//Static files
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use(indexRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);

export default app;
