import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getProjects = () => API.get('/projects');
export const uploadProject = (formData) => API.post('/projects', formData);
