import express from "express";
import indexRoutes from "./routes/routes.js";
import userRoutes from "./routes/routes.user.js";
import productRoutes from "./routes/routes.products.js";
import path from "path";

const app = express();

//Settings middlewares
app.use(express.json());

//Static files
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use(indexRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);

export default app;
