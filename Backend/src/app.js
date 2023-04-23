import express from "express";
import indexRoutes from "./routes/routes.js";

const app = express();

app.use(indexRoutes);

export default app;
