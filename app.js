require("dotenv").config();
const express = require("express");
const app = express();

const userRouter = require("./api/users/user.router");
const purchaseRouter = require("./api/purchases/purchase.router");
const carsRouter = require("./api/cars/cars.router");
const AlertRouter = require("./api/alerts/alerts.router")

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/purchases", purchaseRouter);
app.use("/api/cars", carsRouter)
app.use("/api/alerts", AlertRouter)


const port = process.env.APP_PORT || 4000;


app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
