import React, { useState } from 'react';
import { Typography, Button, TextField, Container } from '@mui/material';
import { api } from '../services/api';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { user, token } = await api.login(username, password);
      console.log('User logged in:', user);
      // اضافه کردن منطق برای ذخیره توکن و هدایت کاربر به صفحه اصلی
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">ورود</Typography>
      <TextField label="نام کاربری" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" />
      <TextField label="رمز عبور" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
      <Button variant="contained" color="primary" onClick={handleLogin}>ورود</Button>
    </Container>
  );
}; 