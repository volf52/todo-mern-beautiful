import React, { useState } from "react";

type Props = {
    saveTodo: (e: React.FormEvent, formData: ITodo) => void;
};

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
    const [formData, setFormData] = useState<ITodo>();

    const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        } as ITodo);
    };

    return (
        <form
            className="Form"
            onSubmit={(e) => {
                saveTodo(e, formData as ITodo);
                setFormData({} as ITodo);
            }}
        >
            <div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        value={formData?.name || ""}
                        type="text"
                        id="name"
                        onChange={handleForm}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        value={formData?.description || ""}
                        type="text"
                        id="description"
                        onChange={handleForm}
                    />
                </div>
                <button disabled={formData === undefined ? true : false}>
                    Add Todo
                </button>
            </div>
        </form>
    );
};

export default AddTodo;
