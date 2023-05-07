import { Router } from "express";
import Alert from "../models/Alert";
import createAlert from "../controllers/Errors";
import Product from "../models/Product";
import Order from "../models/Order";

const router = Router();

//Get top 10 products more selled in interval of time
router.get("/report1/:dateInit/:dateEnd", async (req, res) => {
  try {
    const { dateInit, dateEnd } = req.params;
    await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(dateInit), $lte: new Date(dateEnd) },
        },
      },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product",
          totalQuantity: { $sum: "$products.quantity" },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: "$product._id",
          name: "$product.name",
          description: "$product.description",
          price: "$product.price",
          totalQuantity: 1,
          createdAt: 1,
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 },
    ]).then(
      (results) => {
        res.status(200).send(results);
      },
      (err) => {
        res.status(500).send(err);
      }
    );
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

//Get top 10 products more selled
router.get("/report1all", async (req, res) => {
  try {
    Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product",
          totalQuantity: { $sum: "$products.quantity" },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: "$product._id",
          name: "$product.name",
          description: "$product.description",
          price: "$product.price",
          totalQuantity: 1,
          createdAt: 1,
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 },
    ])
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

//Get top 5 clientes who have generated the most profit from purchases in an interval of time
router.get("/report2/:dateInit/:dateEnd", async (req, res) => {
  try {
    const { dateInit, dateEnd } = req.params;
    await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(dateInit), $lte: new Date(dateEnd) },
          status: "delivered", // Only delivered orders
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_client",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $group: {
          _id: "$user._id",
          username: { $first: "$user.username" },
          name: { $first: "$user.name" },
          total: { $sum: "$total" },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 5,
      },
    ]).then(
      (results) => {
        res.status(200).send(results);
      },
      (err) => {
        res.status(500).send(err);
      }
    );
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

//Get top 5 clientes who have generated the most profit from purchases
router.get("/report2all", async (req, res) => {
  try {
    await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$user_client",
          total: { $sum: "$total" },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: "$user._id",
          name: "$user.names",
          username: "$user.username",
          total: 1,
        },
      },
    ]).then(
      (results) => {
        res.status(200).send(results);
      },
      (err) => {
        res.status(500).send(err);
      }
    );
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

//Top 5 customers who have sold the most products in a period of time
router.get("/report3/:dateInit/:dateEnd", async (req, res) => {
  try {
    const { dateInit, dateEnd } = req.params;
    await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(dateInit), $lte: new Date(dateEnd) },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: Product.collection.name,
          localField: "products.product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: "$product.user_seller",
          totalSold: {
            $sum: "$products.quantity",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          username: "$user.username",
          name: "$user.names",
          totalSold: 1,
        },
      },
      {
        $sort: {
          totalSold: -1,
        },
      },
      {
        $limit: 5,
      },
    ])
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

//Top 5 customers who have sold the most products
router.get("/report3all", async (req, res) => {
  try {
    await Order.aggregate([
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: Product.collection.name,
          localField: "products.product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: "$product.user_seller",
          totalSold: {
            $sum: "$products.quantity",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          username: "$user.username",
          name: "$user.names",
          totalSold: 1,
        },
      },
      {
        $sort: {
          totalSold: -1,
        },
      },
      {
        $limit: 5,
      },
    ])
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

//Top 10 customers who have placed the most orders in a period of time
router.get("/report4/:dateInit/:dateEnd", async (req, res) => {
  try {
    const { dateInit, dateEnd } = req.params;
    await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(dateInit),
            $lte: new Date(dateEnd),
          },
        },
      },
      {
        $group: {
          _id: "$user_client",
          totalOrders: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          username: "$user.username",
          name: "$user.names",
          totalOrders: 1,
        },
      },
      {
        $sort: {
          totalOrders: -1,
        },
      },
      {
        $limit: 10,
      },
    ])
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

//Top 10 customers who have placed the most orders
router.get("/report4all", async (req, res) => {
  try {
    await Order.aggregate([
      {
        $group: {
          _id: "$user_client",
          totalOrders: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          username: "$user.username",
          name: "$user.names",
          totalOrders: 1,
        },
      },
      {
        $sort: {
          totalOrders: -1,
        },
      },
      {
        $limit: 10,
      },
    ])
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    const al = createAlert(error);
    res.status(500).send(al);
  }
});

//Top 10 customers who have more products for sale
router.get("/report5", async (req, res) => {
  await Product.aggregate([
    {
      $match: {
        allowed: 3, //Only products that approved
      },
    },
    {
      $group: {
        _id: "$user_seller",
        totalProducts: {
          $sum: 1,
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 0,
        username: "$user.username",
        name: "$user.names",
        totalProducts: 1,
      },
    },
    {
      $sort: {
        totalProducts: -1,
      },
    },
    {
      $limit: 10,
    },
  ])
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

export default router;
