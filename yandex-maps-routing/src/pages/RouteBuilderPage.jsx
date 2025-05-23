import React from 'react';
import { Container, Typography, Box, TextField, Button, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { YMaps } from '@pbe/react-yandex-maps';
import MapComponent from '../components/MapComponent';

function RouteBuilderPage() {
  const [routeName, setRouteName] = React.useState('');
  const [points, setPoints] = React.useState([]);
  const [newPoint, setNewPoint] = React.useState('');

  const handleAddPoint = () => {
    if (newPoint.trim()) {
      setPoints([...points, { id: Date.now(), name: newPoint, address: newPoint }]);
      setNewPoint('');
    }
  };

  const handleDeletePoint = (id) => {
    setPoints(points.filter(point => point.id !== id));
  };

  const handleSaveRoute = () => {
    if (routeName.trim() && points.length > 0) {
      alert(`Маршрут "${routeName}" сохранен!`);
      // Здесь будет логика сохранения маршрута
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Конструктор маршрутов
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            label="Название маршрута"
            variant="outlined"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            sx={{ mb: 3 }}
          />
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="Добавить точку маршрута"
              variant="outlined"
              value={newPoint}
              onChange={(e) => setNewPoint(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddPoint()}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddPoint}
              sx={{ height: '56px' }}
            >
              Добавить
            </Button>
          </Box>
          
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Точки маршрута</Typography>
            {points.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Добавьте точки маршрута
              </Typography>
            ) : (
              <List>
                {points.map((point, index) => (
                  <ListItem 
                    key={point.id}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => handleDeletePoint(point.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText 
                      primary={`${index + 1}. ${point.name}`} 
                      secondary={point.address} 
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
          
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSaveRoute}
            sx={{ mt: 3 }}
            disabled={!routeName.trim() || points.length < 2}
          >
            Сохранить маршрут
          </Button>
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <YMaps query={{ apikey: '6d5bfb69-89f0-46e7-b335-0ebd68b143d3', load: 'package.full' }}>
            <MapComponent points={points} />
          </YMaps>
        </Box>
      </Box>
    </Container>
  );
}

export default RouteBuilderPage;
