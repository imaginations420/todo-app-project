import React, { useState } from 'react';
import '../global.css';

function TodoItem({ todo, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(todo.description);
    const [status, setStatus] = useState(todo.status);

    const handleUpdate = () => {
        onUpdate(todo.id, { description, status });
        setIsEditing(false);
    };

    return (
        <li className="todo-item">
            {isEditing ? (
                <>
                    <input 
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="todo-input"
                    />
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)} 
                        className="todo-select"
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button onClick={handleUpdate} className="todo-button save-button">Save</button>
                </>
            ) : (
                <>
                    <span className={`todo-description ${status}`}>{todo.description}</span>
                    <span className={`todo-status ${status}`}>{todo.status}</span>
                    <button onClick={() => setIsEditing(true)} className="todo-button edit-button">Edit</button>
                    <button onClick={() => onDelete(todo.id)} className="todo-button delete-button">Delete</button>
                </>
            )}
        </li>
    );
}

export default TodoItem;
