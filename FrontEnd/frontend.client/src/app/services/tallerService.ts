import axios from 'axios';
import { Taller } from './../interfaces/Taller';

const API_URL = "http://127.0.0.1:8000/talleres";

const getAll = () => {
  return axios.get(API_URL);
}

const get = (id: number) => {
  return axios.get(`${API_URL}/${id}`);
}

const create = (data: Taller) => {
  return axios.post(API_URL, data);
}

const update = (id: number, data: Taller) => {
  return axios.put(`${API_URL}/${id}`, data);
}

const remove = (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
}

export default { getAll, get, create, update, remove };
