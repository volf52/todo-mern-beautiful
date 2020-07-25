import { RequestHandler } from "express";
import Todo from "../../models/todo";
import { ITodo } from "../../types";

const getTodos: RequestHandler = async (_req, resp) => {
    try {
        const todos: ITodo[] = await Todo.find();
        resp.status(200).json({ todos });
    } catch (err) {
        throw err;
    }
};

const addTodo: RequestHandler = async (req, resp) => {
    try {
        const body = req.body as Pick<ITodo, "name" | "description" | "status">;

        const todo = new Todo({
            ...body,
        });
        const newTodo = await todo.save();
        const allTodos = await Todo.find();

        resp.status(201).json({
            message: "Todo added",
            todo: newTodo,
            todos: allTodos,
        });
    } catch (err) {
        throw err;
    }
};

const updateTodo: RequestHandler = async (req, resp) => {
    try {
        const {
            params: { id },
            body,
        } = req;

        const updateTodo = await Todo.findByIdAndUpdate(id, body);

        const allTodos = await Todo.find();

        resp.status(200).json({
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos,
        });
    } catch (err) {
        throw err;
    }
};

const deleteTodo: RequestHandler = async (req, resp) => {
    try {
        const deletedTodo = await Todo.findByIdAndRemove(req.params.id);

        const allTodos = await Todo.find();

        resp.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        });
    } catch (err) {
        throw err;
    }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
