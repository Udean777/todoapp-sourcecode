const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodo,
  getTodos,
  delTodo,
  updateTodo,
} = require("../controllers/todoController");

// GET all Todo List
router.get("/", getTodos);

// GET a single Todo List
router.get("/:id", getTodo);

// POST a new Todo List
router.post("/", createTodo);

// DELETE a Todo List
router.delete("/:id", delTodo);

// UPDATE a Todo List
router.patch("/:id", updateTodo);

module.exports = router;
