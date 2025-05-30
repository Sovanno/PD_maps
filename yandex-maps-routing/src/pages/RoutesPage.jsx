import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';

const routes = [
  {
    id: 1,
    title: 'Золотое кольцо России',
    description: 'Классический маршрут по древним городам России',
    image: 'https://resh.edu.ru/uploads/lesson_extract/3873/20190426095554/OEBPS/objects/c_peace_3_29_1/676ecb9f-2d83-4390-9e97-7b3fe60586ff.png',
    duration: '7 дней'
  },
  {
    id: 2,
    title: 'Горный Алтай',
    description: 'Приключенческий тур по красивейшим местам Алтая',
    image: 'https://adventure-guide.ru/upload/resize_cache/iblock/f63/2o4r5b9cjngucvregpnnl48dkviv6yrr/740_999999_1/Gorniy-Altay.jpg',
    duration: '10 дней'
  },
  {
    id: 3,
    title: 'Байкальская тропа',
    description: 'Пеший маршрут вокруг самого глубокого озера в мире',
    image: 'https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/addd6de9-aeee-4531-b771-9c8cc7feb06f/-/format/webp/-/resize/480x/',
    duration: '14 дней'
  },
  {
    id: 4,
    title: 'Камчатские вулканы',
    description: 'Экспедиция к действующим вулканам Дальнего Востока',
    image: 'https://static.tildacdn.com/tild6436-6135-4935-b630-613338316131/image9.jpg',
    duration: '12 дней'
  },
];

function RoutesPage() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Популярные маршруты
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Выберите готовый маршрут или создайте свой собственный
      </Typography>
      
      <Grid container spacing={4}>
        {routes.map((route) => (
          <Grid item key={route.id} xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={route.image}
                alt={route.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {route.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {route.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
                  Длительность: {route.duration}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">Подробнее</Button>
                <Button size="small" color="secondary">Добавить в мои</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RoutesPage;
