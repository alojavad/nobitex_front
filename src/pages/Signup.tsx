import React, { useState } from 'react';
import { Typography, Button, TextField, Container } from '@mui/material';
import { api } from '../services/api';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const { user } = await api.register({ username, email, password });
      console.log('User registered:', user);
      // اضافه کردن منطق برای هدایت کاربر به صفحه ورود یا صفحه اصلی
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">ثبت‌نام</Typography>
      <TextField label="نام کاربری" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" />
      <TextField label="ایمیل" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
      <TextField label="رمز عبور" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
      <Button variant="contained" color="primary" onClick={handleSignup}>ثبت‌نام</Button>
    </Container>
  );
}; 