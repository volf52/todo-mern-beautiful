import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api";

const App: React.FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        getTodos()
            .then(({ data: { todos: newTodos } }) => setTodos(newTodos))
            .catch((err) => console.error(err));
    };

    const handleSaveTodo = (e: React.FormEvent, formData: ITodo) => {
        e.preventDefault();
        addTodo(formData)
            .then(({ data, status }) => {
                if (status !== 201) {
                    throw new Error("Error! Todo not saved");
                }
                setTodos(data.todos);
            })
            .catch((err) => console.error(err));
    };

    const handleUpdateTodo = (todo: ITodo) => {
        updateTodo(todo)
            .then(({ data, status }) => {
                if (status !== 200) {
                    throw new Error("Error! Todo not updated");
                }
                setTodos(data.todos);
            })
            .catch((err) => console.error(err));
    };

    const handleDeleteTodo = (_id: string) => {
        deleteTodo(_id)
            .then(({ data, status }) => {
                if (status !== 200) {
                    throw new Error("Error! Todo not deleted");
                }
                setTodos(data.todos);
            })
            .catch((err) => console.error(err));
    };

    return (
        <main className="App">
            <h1>Todo List</h1>
            <AddTodo saveTodo={handleSaveTodo} />
            {todos.map((todo: ITodo) => (
                <TodoItem
                    key={todo._id}
                    updateTodo={handleUpdateTodo}
                    deleteTodo={handleDeleteTodo}
                    todo={todo}
                />
            ))}
        </main>
    );
};

export default App;
