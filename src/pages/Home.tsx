import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <Container>
      <Typography variant="h4">به صفحه اصلی خوش آمدید</Typography>
      <Button component={Link} to="/forum" variant="contained" color="primary">انجمن</Button>
    </Container>
  );
}; 