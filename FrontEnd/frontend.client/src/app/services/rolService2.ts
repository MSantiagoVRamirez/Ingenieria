import axios from "axios";
import { Rol } from "../interfaces/Rol";

const API_URL = "https://localhost:7023/api/Rol";

const getAll = () => {
  return axios.get(`${API_URL}/leer`);
}

const get = (id: number) => {
  return axios.get(`${API_URL}/consultar`, { params: { "Id": id } });
}

const create = (data: Rol) => {
  return axios.post(`${API_URL}/insertar`, data);
}

const update = (data: Rol) => {
  return axios.put(`${API_URL}/editar`, data);
}

const remove = (id: number) => {
  return axios.delete(`${API_URL}/eliminar`, { params: { "Id": id } });
}

export default { getAll, get, create, update, remove };
