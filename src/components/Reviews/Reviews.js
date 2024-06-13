// Reviews.js
import React from 'react';
import { Box, Typography, Paper, Avatar, Divider, IconButton, Tab, Tabs } from '@mui/material';
import Rating from '@mui/material/Rating';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const reviewsSent = [
  {
    id: 1,
    username: 'Usuario1',
    avatar: 'U1',
    rating: 4,
    review: 'Excelente servicio, conductor muy amable y puntual. Recomiendo este viaje.',
    liked: true,
    disliked: false,
  },
  {
    id: 2,
    username: 'Usuario2',
    avatar: 'U2',
    rating: 5,
    review: 'Muy buen viaje, el auto estaba en perfectas condiciones. Volvería a viajar con este conductor.',
    liked: false,
    disliked: true,
  },
  {
    id: 3,
    username: 'Usuario3',
    avatar: 'U3',
    rating: 3,
    review: 'El viaje estuvo bien, pero el auto podría haber estado más limpio.',
    liked: true,
    disliked: false,
  },
];

const reviewsReceived = [
  {
    id: 4,
    username: 'Usuario4',
    avatar: 'U4',
    rating: 2,
    review: 'El conductor llegó tarde y el auto estaba en malas condiciones.',
    liked: false,
    disliked: true,
  },
  {
    id: 5,
    username: 'Usuario5',
    avatar: 'U5',
    rating: 5,
    review: 'Increíble experiencia, el conductor fue muy amable y el auto estaba impecable.',
    liked: true,
    disliked: false,
  },
  {
    id: 6,
    username: 'Usuario6',
    avatar: 'U6',
    rating: 4,
    review: 'Buen servicio, nada que destacar en particular.',
    liked: true,
    disliked: false,
  },
];

const Reviews = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;

    const sum = reviews.reduce((accumulator, currentReview) => accumulator + currentReview.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const averageRatingSent = calculateAverageRating(reviewsSent);
  const averageRatingReceived = calculateAverageRating(reviewsReceived);

  return (
    <Box sx={{ p: 8 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Mis Reseñas
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Tabs value={tabValue} onChange={handleChangeTab} indicatorColor="primary">
        <Tab label={`Reseñas Enviadas (${reviewsSent.length})`} />
        <Tab label={`Reseñas Recibidas (${reviewsReceived.length})`} />
      </Tabs>
      <Divider sx={{ my: 3 }} />
      {tabValue === 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Promedio de reseñas enviadas: <Rating name="average-rating-sent" value={parseFloat(averageRatingSent)} readOnly sx={{ ml: 1, mr: 1 }} />  ({averageRatingSent})
          </Typography>
          {reviewsSent.map((review) => (
            <Paper key={review.id} sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar>{review.avatar}</Avatar>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {review.username}
                </Typography>
                <Rating name={`rating-${review.id}`} value={review.rating} readOnly />
              </Box>
              <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                {review.review}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <IconButton color="primary">
                  <ThumbUpIcon color={review.liked ? 'primary' : 'action'} />
                </IconButton>
                <IconButton color="secondary">
                  <ThumbDownIcon color={review.disliked ? 'secondary' : 'action'} />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
      {tabValue === 1 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Promedio de reseñas recibidas:  <Rating name="average-rating-received" value={parseFloat(averageRatingReceived)} readOnly sx={{ ml: 1, mr: 1}} />  ({averageRatingReceived})
          </Typography>
          {reviewsReceived.map((review) => (
            <Paper key={review.id} sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar>{review.avatar}</Avatar>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {review.username}
                </Typography>
                <Rating name={`rating-${review.id}`} value={review.rating} readOnly />
              </Box>
              <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                {review.review}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <IconButton color="primary">
                  <ThumbUpIcon color={review.liked ? 'primary' : 'action'} />
                </IconButton>
                <IconButton color="secondary">
                  <ThumbDownIcon color={review.disliked ? 'secondary' : 'action'} />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Reviews;
