import axios from "axios";
import { Proyecto } from "../interfaces/Proyecto";

const API_URL = "https://localhost:7023/api/Proyecto";

const getAll = () => {
  return axios.get(`${API_URL}/lectura`);
}

const get = (id: number) => {
  return axios.get(`${API_URL}/consultar`, { params: { "Id": id } });
}

const create = (data: Proyecto) => {
  return axios.post(`${API_URL}/insertar`, data);
}

const update = (data: Proyecto) => {
  return axios.put(`${API_URL}/editar`, data);
}

const remove = (id: number) => {
  return axios.delete(`${API_URL}/eliminar`, { params: { "Id": id } });
}

export default { getAll, get, create, update, remove };
