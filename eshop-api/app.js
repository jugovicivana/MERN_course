const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt=require('./helpers/jwt')
const errorHandler=require('./helpers/error-handler')

app.use(cors());
// app.options("*", cors());

//middleware
app.use(express.json()); //za koristenje objekata u json formatu
app.use(morgan("tiny")); //za logovanje http zahtjeva u nekom formatu
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname+'/public/uploads'))
app.use(errorHandler);

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database connection is ready..");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});
