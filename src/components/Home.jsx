// src/HomePage.js
import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleNavigate = () => {
    navigate('/tasks'); // Use navigate to go to /tasks
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Home Page
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNavigate}
      >
        Go to Tasks
      </Button>
    </Container>
  );
};

export default Home;
