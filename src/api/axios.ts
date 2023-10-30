import axios from 'axios';

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
