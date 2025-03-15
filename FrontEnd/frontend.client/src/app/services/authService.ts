import axios from "axios";

const API_URL = "https://localhost:7023/api/Login";

// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   }
// );

const login = (usuario: string, password: string) => {
  return axios.post(`${API_URL}/iniciarSesion`, { "usuario": usuario, "password": password });
}

const logout = () => {
  return axios.post(`${API_URL}/cerrarSesion`);
}

// TODO: Implementar endpoint de registro de usuario

export default { login, logout };
