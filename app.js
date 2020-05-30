require("dotenv").config();
const express = require("express");
const app = express();

const userRouter = require("./api/users/user.router");
const purchaseRouter = require("./api/purchases/purchase.router");
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/purchases", purchaseRouter);


const port = process.env.APP_PORT || 4000;


app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
