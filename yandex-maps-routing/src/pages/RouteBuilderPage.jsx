import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Alert
} from '@mui/material';
import { YMaps } from '@pbe/react-yandex-maps';
import MapComponent from '../components/MapComponent';

const steps = ['Ввод параметров', 'Построение маршрута', 'Просмотр результата'];

function RouteBuilderPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [routeName, setRouteName] = useState('');
  const [points, setPoints] = useState([]);
  const [city, setCity] = useState('');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateRoute = async () => {
    if (!city.trim() || !interests.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          city: city,
          wishes: interests,
          objects_count: 5
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при запросе к серверу');
      }

      const data = await response.json();
      const parsedPoints = JSON.parse(data.answer);
      
      if (!Array.isArray(parsedPoints)) {
        throw new Error('Некорректный формат ответа от сервера');
      }

      setPoints(parsedPoints);
      setActiveStep(1);
    } catch (err) {
      setError(`Ошибка: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRoute = () => {
    if (routeName.trim() && points.length > 0) {
      const username = localStorage.getItem('username');
      if (username) {
        const userRoutes = JSON.parse(localStorage.getItem(`routes_${username}`) || '[]');
        const newRoute = {
          id: Date.now(),
          name: routeName,
          points: points,
          created: new Date().toISOString().split('T')[0]
        };
        localStorage.setItem(`routes_${username}`, JSON.stringify([...userRoutes, newRoute]));
        alert(`Маршрут "${routeName}" сохранен!`);
        setActiveStep(2);
      } else {
        setError('Для сохранения маршрута необходимо войти в систему');
      }
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setRouteName('');
    setCity('');
    setInterests('');
    setPoints([]);
    setError(null);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Конструктор маршрутов
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Укажите параметры маршрута
          </Typography>

          <TextField
            fullWidth
            label="Город"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Что вас интересует? (например: музеи, парки, достопримечательности)"
            variant="outlined"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            multiline
            rows={4}
            sx={{ mb: 3 }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGenerateRoute}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Подобрать маршрут'}
          </Button>
        </Box>
      )}

      {activeStep === 1 && (
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

            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Точки маршрута</Typography>
              {points.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Нет точек маршрута
                </Typography>
              ) : (
                <List>
                  {points.map((point, index) => (
                    <ListItem key={point.id || index}>
                      <ListItemText 
                        primary={`${index + 1}. ${point.name}`} 
                        secondary={point.description || point.address} 
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleReset}
                fullWidth
              >
                Начать заново
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSaveRoute}
                fullWidth
                disabled={!routeName.trim()}
              >
                Сохранить маршрут
              </Button>
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <YMaps query={{ apikey: '6d5bfb69-89f0-46e7-b335-0ebd68b143d3', load: 'package.full' }}>
              <MapComponent points={points} />
            </YMaps>
          </Box>
        </Box>
      )}

      {activeStep === 2 && (
        <Box sx={{ textAlign: 'center', my: 10 }}>
          <Typography variant="h4" gutterBottom>
            Маршрут "{routeName}" успешно сохранен!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Вы можете просмотреть его в разделе "Мои маршруты"
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleReset}
          >
            Создать новый маршрут
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default RouteBuilderPage;
