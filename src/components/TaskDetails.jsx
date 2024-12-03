import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";

const TaskDetails = () => {
  const { id } = useParams();
  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === id)
  );

  if (!task) {
    return (
      <Container>
        <Typography variant="h5" align="center" color="error" gutterBottom>
          Task not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {task.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {task.description || "No description provided."}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Due Date:</strong> {task.dueDate || "No due date provided."}
          </Typography>
          <Typography variant="body2" color={task.completed ? "success.main" : "error.main"}>
            <strong>Status:</strong> {task.completed ? "Completed" : "Pending"}
          </Typography>
        </CardContent>
        <CardActions>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button
              variant="contained"
              color={task.completed ? "warning" : "success"}
            >
              {task.completed ? "Mark as Pending" : "Mark as Completed"}
            </Button>
            <Button variant="outlined" color="primary" href="/tasks">
              Back to Dashboard
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Container>
  );
};

export default TaskDetails;
