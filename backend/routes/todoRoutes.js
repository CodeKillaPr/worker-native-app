const express = require("express");
const Todo = require("../models/todoModel");
const router = express.Router();

// Ruta para crear una tarea
router.post("/", (req, res) => {
  const { title, user_id } = req.body;

  if (!title || !user_id) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  Todo.create(title, user_id, (err, todoId) => {
    if (err) {
      return res.status(500).json({ error: "Error al crear tarea" });
    }
    res.status(201).json({ id: todoId, title, completed: false });
  });
});
// Ruta para obtener todas las tareas de un usuario
router.get("/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  Todo.findByUserId(user_id, (err, todos) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener tareas" });
    }
    res.json(todos);
  });
});

// Ruta para actualizar una tarea
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;

  Todo.update(id, completed, (err, changes) => {
    if (err || changes === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json({ message: "Tarea actualizada" });
  });
});

module.exports = router;
