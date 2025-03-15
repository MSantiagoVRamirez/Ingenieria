import axios from "axios";
import { Permiso } from "../interfaces/Permiso";

const API_URL = "https://localhost:7023/api/Permiso";

const getAll = () => {
  return axios.get(`${API_URL}/lectura`);
}

const get = (id: number) => {
  return axios.get(`${API_URL}/consultar`, { params: { "Id": id } });
}

const create = (data: Permiso) => {
  return axios.post(`${API_URL}/insertar`, data);
}

const update = (data: Permiso) => {
  return axios.put(`${API_URL}/editar`, data);
}

const remove = (id: number) => {
  return axios.delete(`${API_URL}/eliminar`, { params: { "Id": id } });
}

export default { getAll, get, create, update, remove };
