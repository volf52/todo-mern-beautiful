import axios, { AxiosResponse } from "axios";

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todos = await axios.get("/todos");
        return todos;
    } catch (err) {
        throw new Error(err);
    }
};

export const addTodo = async (
    fromData: ITodo,
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todo: Omit<ITodo, "_id"> = {
            name: fromData.name,
            description: fromData.description,
            status: false,
        };

        const saveTodo = await axios.post("/add-todo", todo);

        return saveTodo;
    } catch (err) {
        throw new Error(err);
    }
};

export const updateTodo = async (
    todo: ITodo,
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todoUpdate: Pick<ITodo, "status"> = {
            status: true,
        };

        const updatedTodo = await axios.put(
            `/edit-todo/${todo._id}`,
            todoUpdate,
        );
        return updatedTodo;
    } catch (err) {
        throw new Error(err);
    }
};

export const deleteTodo = async (
    _id: string,
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo = await axios.delete(`/delete-todo/${_id}`);

        return deletedTodo;
    } catch (err) {
        throw new Error(err);
    }
};
