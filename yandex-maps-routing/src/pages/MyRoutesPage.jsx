import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress 
} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { YMaps } from '@pbe/react-yandex-maps';
import MapComponent from '../components/MapComponent';

function MyRoutesPage() {
  const [user] = useState(JSON.parse(localStorage.getItem('user')));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myRoutes, setMyRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5153/api/routes/${user.userId}`);
        
        if (!response.ok) {
          throw new Error('Ошибка при загрузке маршрутов');
        }
        
        const routes = await response.json();
        setMyRoutes(routes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [user]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ my: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ my: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  const handleDelete = (id) => {
    const username = localStorage.getItem('username');
    if (username) {
      const updatedRoutes = myRoutes.filter(route => route.id !== id);
      localStorage.setItem(`routes_${username}`, JSON.stringify(updatedRoutes));
      setMyRoutes(updatedRoutes);
    }
  };

  const handleViewRoute = (route) => {
    setSelectedRoute(route);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
            <ListItem 
              key={route.id} 
              sx={{ borderBottom: 1, borderColor: 'divider' }}
              secondaryAction={
                <IconButton 
                  edge="end" 
                  onClick={() => handleDelete(route.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={route.name}
                secondary={`Точек: ${route.points.length} | Создан: ${route.created}`}
              />
              <Button 
                variant="outlined" 
                sx={{ mr: 2 }} 
                onClick={() => handleViewRoute(route)}
              >
                Просмотреть
              </Button>
            </ListItem>
          ))}
        </List>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedRoute?.name}</DialogTitle>
        <DialogContent>
          {selectedRoute && (
            <Box sx={{ mt: 2 }}>
              <YMaps query={{ apikey: '6d5bfb69-89f0-46e7-b335-0ebd68b143d3', load: 'package.full' }}>
                <MapComponent points={selectedRoute.points} />
              </YMaps>
              <List sx={{ mt: 2 }}>
                {selectedRoute.points.map((point, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={`${index + 1}. ${point.name}`} 
                      secondary={point.description || point.address} 
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MyRoutesPage;
