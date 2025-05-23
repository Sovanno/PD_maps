import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const myRoutes = [
  {
    id: 1,
    name: 'Мой летний маршрут',
    points: 5,
    created: '2023-05-15'
  },
  {
    id: 2,
    name: 'Горный поход',
    points: 8,
    created: '2023-06-22'
  },
];

function MyRoutesPage() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Мои маршруты
      </Typography>
      
      {myRoutes.length === 0 ? (
        <Box sx={{ textAlign: 'center', my: 10 }}>
          <Typography variant="h5" gutterBottom>
            У вас пока нет сохраненных маршрутов
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            component={Link} 
            to="/build-route"
            sx={{ mt: 2 }}
          >
            Создать первый маршрут
          </Button>
        </Box>
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {myRoutes.map((route) => (
            <ListItem key={route.id} sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <ListItemText
                primary={route.name}
                secondary={`Точек: ${route.points} | Создан: ${route.created}`}
              />
              <Button variant="outlined" sx={{ mr: 2 }}>Просмотреть</Button>
              <Button variant="outlined" color="error">Удалить</Button>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default MyRoutesPage;
