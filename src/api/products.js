import axios from 'axios';
import { API_BASE_URL, endpoints } from './config';

export const productAPI = {
  getAll: () => axios.get(`${API_BASE_URL}${endpoints.products}`),
  getById: (id) => axios.get(`${API_BASE_URL}${endpoints.products}/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}${endpoints.products}`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}${endpoints.products}/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}${endpoints.products}/${id}`)
};