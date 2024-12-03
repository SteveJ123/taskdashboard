import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleTaskCompletion, setFilter } from '../redux/tasksSlice';
import TaskForm from './TaskForm';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskDashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleSearch = (e) => setSearch(e.target.value.toLowerCase());

  const handleDelete = () => {
    dispatch(deleteTask(deleteId));
    setConfirmOpen(false);
  };

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search))
    .filter((task) => {
      if (filter === 'all') return true;
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      if (filter === 'overdue') return new Date(task.dueDate) < new Date();
      return true;
    });

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);
    // You need to dispatch an action to update the Redux store with the reordered tasks.
    // Add an action to your taskSlice to handle this, e.g., updateOrder.
  };

  return (
    <div>
      <h1>Task Dashboard</h1>
      <TaskForm />
      <TextField
        label="Search Tasks"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearch}
      />
      <div>
        <Button onClick={() => dispatch(setFilter('all'))}>All Tasks</Button>
        <Button onClick={() => dispatch(setFilter('completed'))}>Completed</Button>
        <Button onClick={() => dispatch(setFilter('pending'))}>Pending</Button>
        <Button onClick={() => dispatch(setFilter('overdue'))}>Overdue</Button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} style={{ padding: 0 }}>
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        margin: '5px 0',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                      }}
                    >
                      <span>
                        {task.title} - {task.completed ? 'Completed' : 'Pending'}
                      </span>
                      <div>
                        <Button
                          variant="contained"
                          color={task.completed ? 'success' : 'primary'}
                          onClick={() => dispatch(toggleTaskCompletion(task.id))}
                        >
                          {task.completed ? 'Mark Pending' : 'Mark Completed'}
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            setDeleteId(task.id);
                            setConfirmOpen(true);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskDashboard;
