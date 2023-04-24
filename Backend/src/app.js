import express from "express";
import indexRoutes from "./routes/routes.js";
import userRoutes from "./routes/routes.user.js";

const app = express();

app.use(express.json());

//Routes
app.use(indexRoutes);
app.use("/user", userRoutes);

export default app;
