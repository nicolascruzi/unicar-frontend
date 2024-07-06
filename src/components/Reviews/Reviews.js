import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, Divider, IconButton, Tab, Tabs } from '@mui/material';
import Rating from '@mui/material/Rating';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from 'axios';

const Reviews = () => {
  const [tabValue, setTabValue] = useState(0);
  const [reviewsSent, setReviewsSent] = useState([]);
  const [reviewsReceived, setReviewsReceived] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const responseSent = await axios.get(`${process.env.REACT_APP_API_URL}reviews/sent/`);
        setReviewsSent(responseSent.data);

        const responseReceived = await axios.get(`${process.env.REACT_APP_API_URL}reviews/received/`);
        setReviewsReceived(responseReceived.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;

    const sum = reviews.reduce((accumulator, currentReview) => accumulator + currentReview.qualification, 0);
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
                <Avatar>{review?.user_qualified?.name?.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {review.user_qualified?.name}
                </Typography>
                <Rating name={`rating-${review.id}`} value={review.qualification} readOnly />
              </Box>
              <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                {review.comment}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <IconButton color="primary">
                  <ThumbUpIcon />
                </IconButton>
                <IconButton color="secondary">
                  <ThumbDownIcon />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
      {tabValue === 1 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Promedio de reseñas recibidas: <Rating name="average-rating-received" value={parseFloat(averageRatingReceived)} readOnly sx={{ ml: 1, mr: 1 }} /> ({averageRatingReceived})
          </Typography>
          {reviewsReceived.map((review) => (
            <Paper key={review.id} sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar>{review?.user_qualifier?.name?.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {review.user_qualifier?.name}
                </Typography>
                <Rating name={`rating-${review.id}`} value={review.qualification} readOnly />
              </Box>
              <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                {review.comment}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <IconButton color="primary">
                  <ThumbUpIcon />
                </IconButton>
                <IconButton color="secondary">
                  <ThumbDownIcon />
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
