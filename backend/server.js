const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
require("dotenv").config();

const mongoDBConnection = require("./dbConfig/dbconfig");
const url = process.env.DB_CONNECTION_URL;
mongoDBConnection(url); // MongoDB connection

const authRoutes = require("./routes/authRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
app.use("/auth", authRoutes);
app.use("/visitors", visitorRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server Running Succesfully in PORT ${PORT}`)
);
