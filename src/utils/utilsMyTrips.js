import React from "react";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { deepPurple, deepOrange } from '@mui/material/colors';


dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

export const calculateTimeToDeparture = (departureTime) => {
    if (!departureTime) {
      return null; // No mostrar si no hay hora de salida
    }
  
    const now = dayjs();
    const departure = dayjs(departureTime);
    const diff = departure.diff(now);
  
    if (diff <= 0) {
      return null; // No mostrar si el tiempo es negativo o cero
    }
  
    const tripDuration = dayjs.duration(diff);
  
    if (tripDuration.asMinutes() <= 60) {
      return `${Math.floor(tripDuration.asMinutes())} minutos`;
    } else {
      return `${Math.floor(tripDuration.asHours())} horas`;
    }
  };

export const getRandomColor = (name) => {
  const colors = [deepPurple[500], deepOrange[500]];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};