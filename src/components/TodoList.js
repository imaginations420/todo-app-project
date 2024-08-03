import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import '../global.css';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const token = Cookies.get('jwt_token')

    const fetchTodos = async () => {
        try {

            const response = await fetch('https://todo-backend-rvtc.onrender.com/api/todos', {
                headers: {
                    'x-access-token': token
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            const data = await response.json();

            setTodos(data.items);
        } catch (error) {
            console.error('Error:', error.message);
            setError(error.message);
        }
    };

    useEffect(() => {

        fetchTodos();
    }, [token]);

    const handleAdd = async (description) => {
        try {

            const response = await fetch('https://todo-backend-rvtc.onrender.com/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({ description })
            });
            if (!response.ok) {
                throw new Error('Failed to add todo');
            }
            const newTodo = await response.json();

            setTodos([...todos, newTodo.item]);
            fetchTodos();
        } catch (error) {
            console.error('Error:', error.message);
            setError(error.message);
        }
    };

    const handleUpdate = async (id, updatedTodo) => {
        try {

            const response = await fetch(`https://todo-backend-rvtc.onrender.com/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(updatedTodo)
            });

            if (!response.ok) {
                throw new Error('Failed to update todo');
            }
            const updated = await response.json();

            setTodos(todos.map(todo => (todo.id === id ? updated : todo)));

            fetchTodos();
        } catch (error) {
            console.error('Error:', error.message);
            setError(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {

            const response = await fetch(`https://todo-backend-rvtc.onrender.com/api/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': token
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete todo');
            }

            setTodos(todos.filter(todo => todo.id !== id));

            fetchTodos();
        } catch (error) {
            console.error('Error:', error.message);
            setError(error.message);
        }
    };

    const handleDeleteCookie = () => {
        Cookies.remove('jwt_token');
        navigate('/login');
        console.log('JWT token cookie deleted');
    };

    return (
        <div>
            <div className='header_wrapper'>
                <h2 className="todo-list-title">ToDo List</h2>
                <button type="button" className="add-todo-button" onClick={handleDeleteCookie}>Logout</button>
            </div>
            <div className="todo-list-container">
                <AddTodo onAdd={handleAdd} />
                {error && <p className="error-message">{error}</p>}
                <ul className="todo-list">
                    {todos?.map(todo => (
                        <TodoItem key={todo.id} todo={todo} onUpdate={handleUpdate} onDelete={handleDelete} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;
