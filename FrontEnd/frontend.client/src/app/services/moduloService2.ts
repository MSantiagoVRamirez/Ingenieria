import axios from "axios";
import { Modulo } from "../interfaces/Modulo";

const API_URL = "https://localhost:7023/api/Modulo";

const getAll = () => {
  return axios.get(`${API_URL}/lectura`);
}

const get = (id: number) => {
  return axios.get(`${API_URL}/consultar`, { params: { "Id": id } });
}

const create = (data: Modulo) => {
  return axios.post(`${API_URL}/insertar`, data);
}

const update = (data: Modulo) => {
  return axios.put(`${API_URL}/editar`, data);
}

const remove = (id: number) => {
  return axios.delete(`${API_URL}/eliminar`, { params: { "Id": id } });
}

export default { getAll, get, create, update, remove };
