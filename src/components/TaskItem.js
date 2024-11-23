import React, { useState } from 'react';

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
  
    const handleEditChange = (e) => {
      const { name, value } = e.target;
      setEditedTask({ ...editedTask, [name]: value });
    };
  
    const handleEditSave = () => {
      onUpdateTask(editedTask);
      setIsEditing(false);
    };
  
    const handleDelete = () => {
      if (window.confirm(`Are you sure you want to delete the task "${task.title}"?`)) {
        onDeleteTask(task.id);
      }
    };
  
    return (
      <div className="task-item">
        {isEditing ? (
          <div>
            <label htmlFor='title'>Title</label>
            <input
            id='title'
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleEditChange}
            />
               <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              name="description"
              value={editedTask.description}
              onChange={handleEditChange}
            ></textarea>
            <label htmlFor='date'> Due Date</label>
            <input
              id='date'
              type="date"
              name="dueDate"
              value={editedTask.dueDate}
              onChange={handleEditChange}
            />
            <label htmlFor='status'> Due Date</label>
            <select
            id='status'
              name="status"
              value={editedTask.status}
              onChange={handleEditChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button onClick={handleEditSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <h3>Title:{task.title}</h3>
            <p>Description:{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    );
  };
  
  export default TaskItem;
  