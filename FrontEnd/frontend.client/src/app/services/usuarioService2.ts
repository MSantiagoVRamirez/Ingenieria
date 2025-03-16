import axios from "axios";
import { Usuario } from "../interfaces/Usuario";

const API_URL = "https://localhost:7023/api/Usuario";

const getAll = () => {
  return axios.get(`${API_URL}/leer`);
}

const get = (id: number) => {
  return axios.get(`${API_URL}/consultar`, { params: { "Id": id } });
}

const create = (data: Usuario) => {
  return axios.post(`${API_URL}/insertar`, data);
}

const update = (data: Usuario) => {
  return axios.put(`${API_URL}/editar`, data);
}

const remove = (id: number) => {
  return axios.delete(`${API_URL}/eliminar`, { params: { "Id": id } });
}

export default { getAll, get, create, update, remove };
