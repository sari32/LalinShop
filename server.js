import express from "express";
import dotnev from "dotenv";

import { connectToDB } from "./Config/DB.js";
import productRouter from "./Router/Product.js";
import userRouter from "./Router/user.js";
import orderRouter from "./Router/order.js";

dotnev.config();
connectToDB();
const app=express();

app.use(express.json());

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

let port=process.env.PORT;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });