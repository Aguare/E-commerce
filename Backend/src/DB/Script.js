const { MongoClient, ObjectId } = require("mongodb");
const fs = require("fs");

const url = "mongodb://localhost:27017";
const dbName = "ecommerce";
const collectionNames = [
  "cards",
  "departments",
  "orders",
  "products",
  "revenues",
  "users",
];

async function createDatabaseAndCollections() {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    for (const collectionName of collectionNames) {
      await db.createCollection(collectionName);
      console.log(`Created collection "${collectionName}"`);
    }

    const usersData = fs.readFileSync(
      "D:/USAC/1er.2023/ARCHIVOS/LAB/E-commerce/Backend/src/DB/insertUsers.json",
      "utf8"
    );
    const users = JSON.parse(usersData);

    const transformedUsers = users.map((user) => {
      const { _id, ...rest } = user;
      return { _id: new ObjectId(_id.$oid), ...rest };
    });

    const usersCollection = db.collection("users");
    await usersCollection.insertMany(transformedUsers);
    console.log('Inserted documents into "users" collection');

    const productsData = fs.readFileSync(
      "D:/USAC/1er.2023/ARCHIVOS/LAB/E-commerce/Backend/src/DB/insertProducts.json",
      "utf8"
    );
    const products = JSON.parse(productsData);

    const productsCollection = db.collection("products");
    await productsCollection.insertMany(products);
    console.log('Inserted documents into "products" collection');

    const departmentsData = fs.readFileSync(
      "D:/USAC/1er.2023/ARCHIVOS/LAB/E-commerce/Backend/src/DB/insertDepartments.json",
      "utf8"
    );

    const departments = JSON.parse(departmentsData);

    const departmentsCollection = db.collection("departments");
    await departmentsCollection.insertMany(departments);
    console.log('Inserted documents into "departments" collection');

    client.close();

    console.log("Process complete");
  } catch (err) {
    console.error("Error:", err);
  }
}

createDatabaseAndCollections();
