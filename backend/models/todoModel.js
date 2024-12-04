const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.sqlite");

// Crear tabla de tareas si no existe
db.serialize(() => {
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

const Todo = {
  create: (title, user_id, callback) => {
    const query = `INSERT INTO todos (title, user_id) VALUES (?, ?)`;
    db.run(query, [title, user_id], function (err) {
      callback(err, this.lastID);
    });
  },
  findByUserId: (user_id, callback) => {
    const query = `SELECT * FROM todos WHERE user_id = ?`;
    db.all(query, [user_id], (err, rows) => {
      callback(err, rows);
    });
  },
  update: (id, completed, callback) => {
    const query = `UPDATE todos SET completed = ? WHERE id = ?`;
    db.run(query, [completed, id], function (err) {
      callback(err, this.changes);
    });
  },
};

module.exports = Todo;
