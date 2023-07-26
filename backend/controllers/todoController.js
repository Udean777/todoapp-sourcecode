const Todo = require("../models/todoModel");
const mongoose = require("mongoose");

// get all todolist
const getTodos = async (req, res) => {
  const todo = await Todo.find({}).sort({ createdAt: -1 });
  res.status(200).json(todo);
};

// get a single todolist
const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Todo List lad" });
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ error: "No such Todo List lad" });
  }
  res.status(200).json(todo);
};

// create new todolist
const createTodo = async (req, res) => {
  const { title, time, describe } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!time) {
    emptyFields.push("time");
  }
  if (!describe) {
    emptyFields.push("describe");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  //   add doc to mongodb
  try {
    const todo = await Todo.create({ title, time, describe });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a todolist
const delTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Todo List lad" });
  }

  const todo = await Todo.findOneAndDelete({ _id: id });

  if (!todo) {
    return res.status(400).json({ error: "No such Todo List lad" });
  }

  res.status(200).json(todo);
};

// update a todolist
const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Todo List lad" });
  }

  const todo = await Todo.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!todo) {
    return res.status(400).json({ error: "No such Todo List lad" });
  }

  res.status(200).json(todo);
};

module.exports = { createTodo, getTodos, getTodo, delTodo, updateTodo };
