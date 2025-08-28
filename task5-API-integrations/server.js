const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Fake in-memory database
let users = [];

// CREATE (POST)
app.post("/api/users", (req, res) => {
  const user = { id: Date.now(), name: req.body.name, email: req.body.email };
  users.push(user);
  res.status(201).json(user);
});

// READ (GET)
app.get("/api/users", (req, res) => {
  res.json(users);
});

// UPDATE (PUT)
app.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// DELETE (DELETE)
app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: "User deleted" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
