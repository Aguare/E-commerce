import { connect } from "mongoose";

(async () => {
  try {
    const db = await connect("mongodb://127.0.0.1:27017/ecommerce", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected to:", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
