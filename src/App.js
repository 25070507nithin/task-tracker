import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Failed to parse tasks from localStorage", error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add a new task
  const addTask = (task) => setTasks([...tasks, task]);

  // Update an existing task
  const updateTask = (updatedTask) =>
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));

  // Delete a task
  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  // Handle filter selection
  const handleFilterChange = (e) => setFilter(e.target.value);

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.status === filter;
  });

  return (
    <>
      <div className="App">
        <h1>Task Tracker</h1>
        <TaskForm onAddTask={addTask} />
      </div>
      <div className="App">
        <h1>Tasks</h1>
        <p>Sort By:Status</p>
        <select value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <TaskList tasks={filteredTasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
      </div>
    </>
  );
}

export default App;
