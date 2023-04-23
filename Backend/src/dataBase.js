import { connect } from "mongoose";

(async () => {
  try {
    const db = await connect("mongodb://localhost:27017/ecommerce");
    console.log("Database is connected to:", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();