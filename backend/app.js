const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Importar rutas
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

// Puerto
const PORT = 5001;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
