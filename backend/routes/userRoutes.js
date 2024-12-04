const express = require("express");
const User = require("../models/userModel");
const router = express.Router();

// Ruta para registrar un usuario
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  User.create(username, password, (err, userId) => {
    if (err) {
      return res.status(500).json({ error: "Error al registrar usuario" });
    }
    res.status(201).json({ id: userId, username });
  });
});

// Ruta para buscar un usuario
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (err, user) => {
    if (err || !user || user.password !== password) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    res.json({ id: user.id, username: user.username });
  });
});

module.exports = router;
