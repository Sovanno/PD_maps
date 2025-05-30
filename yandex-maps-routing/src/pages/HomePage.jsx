import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import HikingIcon from '@mui/icons-material/Hiking';
import TerrainIcon from '@mui/icons-material/Terrain';
import MapIcon from '@mui/icons-material/Map';

function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        my: 4,
        textAlign: 'center',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9))',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 10,
        borderRadius: 2,
        boxShadow: 3
      }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Добро пожаловать в TravelRoutes
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4 }}>
          Откройте для себя лучшие туристические маршруты по всему миру
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          component={Link} 
          to="/build-route"
          sx={{ px: 4, py: 2 }}
        >
          Начать планирование
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 6, gap: 4 }}>
        <Paper elevation={3} sx={{ p: 3, flex: 1, textAlign: 'center' }}>
          <HikingIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>Готовые маршруты</Typography>
          <Typography>
            Выбирайте из сотен проверенных маршрутов по всему миру, составленных опытными путешественниками.
          </Typography>
        </Paper>
        
        <Paper elevation={3} sx={{ p: 3, flex: 1, textAlign: 'center' }}>
          <TerrainIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>Создавайте свои</Typography>
          <Typography>
            Используйте наш конструктор маршрутов, чтобы спланировать идеальное путешествие.
          </Typography>
        </Paper>
        
        <Paper elevation={3} sx={{ p: 3, flex: 1, textAlign: 'center' }}>
          <MapIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>Сохраняйте</Typography>
          <Typography>
            Храните свои любимые маршруты и делитесь ими с друзьями.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default HomePage;
