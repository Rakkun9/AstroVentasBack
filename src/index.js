const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const appRoutes = require("./routes/AppRoutes");

app.use("/app", appRoutes);


// Iniciar el servidor
app.listen(3301, () => {
  console.log(`Servidor corriendo en http://localhost:3301`);
});
