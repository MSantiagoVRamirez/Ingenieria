import axios from "axios";
import { Rol } from "../interfaces/Rol";

const API_URL = "http://127.0.0.1:8000/roles";

const getAll = () => {
  return axios.get(API_URL);
}

const get = (id: number) => {
  return axios.get(`${API_URL}/${id}`);
}

const create = (data: Rol) => {
  return axios.post(API_URL, data);
}

const update = (id: number, data: Rol) => {
  return axios.put(`${API_URL}/${id}`, data);
}

const remove = (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
}

export default { getAll, get, create, update, remove };
