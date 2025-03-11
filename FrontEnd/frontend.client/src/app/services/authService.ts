import axios from "axios";

const API_URL = "https://localhost:7023/api/Login";

const login = (usuario: string, password: string) => {
  return axios.post(`${API_URL}/iniciarSesion`, { "usuario": usuario, "password": password }, { withCredentials: true });
}

const logout = () => {
  return axios.post(`${API_URL}/cerrarSesion`);
}

// TODO: Implementar endpoint de registro de usuario

export default { login, logout };
