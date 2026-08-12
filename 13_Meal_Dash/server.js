// third party or external module
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors"

// dotenv config
dotenv.config({ path: "./.env" });

// local modules
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import rateLimit from "./middleware/rateLimit.js";

// routes

import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import restaurantRoutes from "./routes/restaurant.routes.js";
import providerRoutes from "./routes/provider.routes.js";
import foodRoutes from "./routes/food.routes.js";


import restaurantModel from "./model/restaurant.model.js";
import User from "./model/user.model.js";

const app = express();
app.use(helmet());


app.use(hpp());

app.use(cors())

app.use(express.json());

app.use(rateLimit);





// routes

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/provider", providerRoutes);
app.use("/food", foodRoutes);

// server check
app.get("/", (req, res, next) => {
  res.json("hello from server");
});

// if route not found
app.use((req, res, next) => {
  return next(new HttpError("requested route not found"));
});

// centralize error handling
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error " });
});

async function startServer() {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("Failed to connect db");
    }

    const port = process.env.PORT || 5000;

    app.listen(port, (err) => {
      if (err) {
        return console.log(err.message);
      }

      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();

// relationship concept

// async function checkRestaurant() {
//   try {
//     const restaurant = await restaurantModel
//       .findById("6a5f57f1a697f4d89b317a94")
//       .populate("owner", "name email phone -_id");

//     // console.log("restaurant", restaurant);

//     console.log("restaurant", restaurant.owner);

//     // using manually
//     // const owner = await User.findById(restaurant.owner)

//     // console.log("owner", owner)
//   } catch (error) {
//     console.log(error);
//   }
// }

// // checkRestaurant();

// async function virtualRestaurant() {
//   try {
//     const owner = await User.findById("6a54cd53dbf93c657e5a78ec").populate("restaurant","restaurantName address -_id");

//     // console.log("restaurant owner", owner);

//     console.log("restaurant", owner.restaurant);
//   } catch (error) {
//     console.log(error);
//   }
// }

// virtualRestaurant()

// relationship concept again

async function checkOwner() {
  try {
    const restaurant = await restaurantModel
      .findById("6a5f57f1a697f4d89b317a94")
      .populate("owner", "name email");

    // console.log("restaurant", restaurant);

    console.log("owner", restaurant.owner);

    // user model using manually method

    // const owner = await User.findById(restaurant.owner);

    //    console.log("owner",owner)
  } catch (error) {
    console.log(error);
  }
}

// checkOwner()

async function virtualRestaurant() {
  try {
    const user = await User.findById("6a54cd53dbf93c657e5a78ec").populate(
      "restaurant",
    );

    // console.log("user", user);

    console.log("restaurant", user.restaurant);
  } catch (error) {
    console.log(error);
  }
}

// virtualRestaurant()
