import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  TextField, 
  Box, 
  Avatar,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import HikingIcon from '@mui/icons-material/Hiking';

function AppHeader() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogin = () => {
    if (login && password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', login);
      setIsLoggedIn(true);
      setUsername(login);
      setLogin('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    handleClose();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <HikingIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TravelRoutes
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" component={Link} to="/home">Главная</Button>
          <Button color="inherit" component={Link} to="/routes">Маршруты</Button>
          <Button color="inherit" component={Link} to="/build-route">Подобрать маршрут</Button>
          <Button color="inherit" component={Link} to="/my-routes">Мои маршруты</Button>
          
          {isLoggedIn ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  {username.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Профиль</MenuItem>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <TextField
                size="small"
                label="Логин"
                variant="outlined"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                sx={{ backgroundColor: 'white', borderRadius: 1 }}
              />
              <TextField
                size="small"
                label="Пароль"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ backgroundColor: 'white', borderRadius: 1 }}
              />
              <Button 
                color="secondary" 
                variant="contained" 
                onClick={handleLogin}
                sx={{ ml: 1 }}
              >
                Войти
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
