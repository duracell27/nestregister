// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BACKEND_URL, // твій базовий URL
  // Можна одразу додати й інші дефолтні налаштування:
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${yourToken}` // якщо потрібно
  }
});

export default api;