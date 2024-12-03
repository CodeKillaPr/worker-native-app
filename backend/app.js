const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Base de datos SQLite
const db = new sqlite3.Database("database.sqlite"); // Usar una base de datos en memoria (o cambiar ":memory:" a "database.sqlite" para persistencia)

// Crear tablas
db.serialize(() => {
  // Tabla de usuarios
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // Tabla de tareas
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT 0,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);
});

// Rutas
// Registro de usuarios
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.run(query, [username, password], function (err) {
    if (err) {
      return res.status(500).json({ error: "Error al registrar usuario" });
    }
    res.status(201).json({ id: this.lastID, username });
  });
});

// Login de usuarios
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = ?`;
  db.get(query, [username], (err, user) => {
    if (err || !user || user.password !== password) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    res.json({ id: user.id, username: user.username });
  });
});

// Crear una tarea
app.post("/todos", (req, res) => {
  const { title, user_id } = req.body;

  if (!title || !user_id) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  const query = `INSERT INTO todos (title, user_id) VALUES (?, ?)`;
  db.run(query, [title, user_id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Error al crear tarea" });
    }
    res.status(201).json({ id: this.lastID, title, completed: false });
  });
});

// Obtener tareas de un usuario
app.get("/todos/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  const query = `SELECT * FROM todos WHERE user_id = ?`;
  db.all(query, [user_id], (err, todos) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener tareas" });
    }
    res.json(todos);
  });
});

// Actualizar tarea (marcar como completada)
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;

  const query = `UPDATE todos SET completed = ? WHERE id = ?`;
  db.run(query, [completed, id], function (err) {
    if (err || this.changes === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json({ message: "Tarea actualizada" });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
