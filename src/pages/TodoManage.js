import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox  , Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import { fetchUserTasks, deleteTask, updateTask } from '../context/Firebase';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';


const TodoManage = () => {
  const [tasks, setTasks] = useState([]);
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleEdit = (taskId, taskText) => {
    setEditTaskId(taskId);
    setEditTaskText(taskText);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setEditTaskId(null);
    setEditTaskText('');
    setOpenEditDialog(false);
  };

  const handleSaveEdit = async () => {
    const success = await updateTask(editTaskId, editTaskText);
    if (success) {
      const updatedTasks = tasks.map(task => {
        if (task.id === editTaskId) {
          return { ...task, task: editTaskText };
        }
        return task;
      });
      setTasks(updatedTasks);
      handleCloseEditDialog();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const tasksData = await fetchUserTasks();
      setTasks(tasksData);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    firebase.logout();
    navigate('/login');
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      //console.error('Error deleting task:', error);
      toast.error('Error deleting task:', error);
    }
  };

  return (
    <Grid container spacing={0}>
    <Grid
      style={{
        backgroundImage: 'url("/images/bg.avif")',
        backgroundSize: "cover",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0.5,
        zIndex: -1,
      }}
    />
    <Grid
        container
        spacing={0}
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
      <Card variant="outlined" style={{ width: '60%', padding: '20px' }}>
        <CardContent>
          <Typography variant="h4" sx={{justifyContent: 'center', alignItems: 'center'}}>
            Your Tasks
          </Typography>
          {tasks.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Task</b></TableCell>
                    <TableCell><b>Action</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id} style={{ backgroundColor: task.completed ? 'green' : 'transparent' }}>
                      <TableCell>{task.task}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={task.completed}
                          onChange={() => {
                            const updatedTasks = tasks.map(t => {
                              if (t.id === task.id) {
                                return { ...t, completed: !t.completed };
                              }
                              return t;
                            });
                            setTasks(updatedTasks);
                          }}
                        />
                        <Button variant="contained" color="primary" size="small" onClick={() => handleEdit(task.id, task.task)} endIcon={<EditIcon/>}>Edit</Button>
                        <Button variant="contained"color="secondary" size="small" onClick={() => handleDelete(task.id)} endIcon={<DeleteIcon/>}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1">No tasks found</Typography>
          )}
          <Button onClick={handleLogout} variant="contained" color="secondary" style={{ marginTop: '10px' }} endIcon={<LogoutIcon/>}>
            Logout 
          </Button>
        </CardContent>


        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task"
              fullWidth
              value={editTaskText}
              onChange={(e) => setEditTaskText(e.target.value)} 
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="primary" endIcon={<CancelIcon/>} variant="contained">Cancel</Button>
            <Button onClick={handleSaveEdit} color="primary" endIcon={<SaveIcon/>} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

      </Card>
      </Grid>
    </Grid>
  );
};

export default TodoManage;
