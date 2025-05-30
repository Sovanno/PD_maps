import { useState, useEffect } from 'react';
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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { YMaps } from '@pbe/react-yandex-maps';
import MapComponent from '../components/MapComponent';
import { useNavigate } from 'react-router-dom';

const steps = ['Ввод параметров', 'Построение маршрута', 'Просмотр результата'];

function RouteBuilderPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [routeName, setRouteName] = useState('');
  const [points, setPoints] = useState([]);
  const [city, setCity] = useState('');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleGenerateRoute = async () => {
    if (!city.trim() || !interests.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const mockResponse = [
        {
          name: "Музей изобразительных искусств",
          address: "ул. Ленина, 5",
          description: "Крупнейший художественный музей города"
        },
        {
          name: "Центральный парк",
          address: "ул. Парковая, 1",
          description: "Живописный парк с озерами и аллеями"
        },
        {
          name: "Исторический центр",
          address: "пл. Революции",
          description: "Старинная архитектура и памятники"
        }
      ];

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPoints(mockResponse.map((point, index) => ({
        id: Date.now() + index,
        ...point
      })));
      setActiveStep(1);
    } catch (err) {
      setError(`Ошибка при генерации маршрута: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRoute = async () => {
    if (!routeName.trim() || points.length < 2) {
      setError('Название маршрута и минимум 2 точки обязательны');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5153/api/routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId,
          points: points.map((point, index) => ({
            name: point.name,
            address: point.address,
            description: point.description || '',
            order: index + 1
          }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при сохранении маршрута');
      }

      const savedRoute = await response.json();
      setGeneratedRoute(savedRoute);
      setSuccessDialogOpen(true);
      setActiveStep(2);
    } catch (err) {
      setError(`Ошибка: ${err.message}`);
    } finally {
      setLoading(false);
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

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
    navigate('/my-routes');
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
            required
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
            required
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
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Название маршрута"
              variant="outlined"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              sx={{ mb: 3 }}
              required
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
                        secondary={
                          <>
                            <div>{point.address}</div>
                            {point.description && <div>{point.description}</div>}
                          </>
                        } 
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
                disabled={loading}
              >
                Начать заново
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSaveRoute}
                fullWidth
                disabled={!routeName.trim() || loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Сохранить маршрут'}
              </Button>
            </Box>
          </Box>

          <Box sx={{ flex: 1, minHeight: 400 }}>
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

      <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
        <DialogTitle>Маршрут сохранен</DialogTitle>
        <DialogContent>
          <Typography>Маршрут "{routeName}" был успешно сохранен в вашей коллекции.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog}>Закрыть</Button>
          <Button 
            onClick={handleCloseSuccessDialog}
            color="primary"
            variant="contained"
          >
            Перейти к моим маршрутам
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default RouteBuilderPage;
