import React, { useState } from 'react';
import '..//global.css';

function AddTodo({ onAdd }) {
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(description);
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="add-todo-form">
            <input 
                type="text" 
                placeholder="Add new to-do" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
                className="add-todo-input"
            />
            <button type="submit" className="add-todo-button">Add</button>
        </form>
    );
}

export default AddTodo;
