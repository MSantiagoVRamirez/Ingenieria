import axios from 'axios';
import { TipoTaller } from './../interfaces/TipoTaller';

const API_URL = "http://127.0.0.1:8000/tipos-taller";

const getAll = async () => {
  return await axios.get<TipoTaller[]>(API_URL);
}

const get = async (id: number) => {
  return await axios.get<TipoTaller>(`${API_URL}/${id}`);
}

const create = async (data: TipoTaller) => {
  return await axios.post<TipoTaller>(API_URL, data);
}

const update = async (id: number, data: TipoTaller) => {
  return await axios.put<TipoTaller>(`${API_URL}/${id}`, data);
}

const remove = async (id: number) => {
  return await axios.delete<TipoTaller>(`${API_URL}/${id}`);
}

export default { getAll, get, create, update, remove };
