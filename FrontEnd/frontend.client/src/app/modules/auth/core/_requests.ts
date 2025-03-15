import axios from "axios";
import { AuthModel, UserModel } from "./_models";

const API_URL = "http://127.0.0.1:8000";
// const API_URL = import.meta.env.VITE_APP_API_URL;

export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const CHANGE_PASSWORD_URL = `${API_URL}/change-password`;
export const LOGOUT_URL = `${API_URL}/logout`;
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
// export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

const url = import.meta.env.VITE_APP_API_URL;
export const REQUEST_PASSWORD_URL = `${url}/forgot_password`;

export function login(usuario: string, password: string) {
  return axios.post(LOGIN_URL, {
    usuario: usuario,
    password: password
  });
}

// Server should return AuthModel
// export function login(email: string, password: string) {
//   return axios.post<AuthModel>(LOGIN_URL, {
//     email,
//     password,
//   });
// }

export function register(
  usuario: string,
  password: string,
  confirmPassword: string,
  nombres: string,
  apellidos: string,
  correo: string,
  telefono: string,
) {
  return axios.post(REGISTER_URL, {
    id: 0,
    usuario: usuario,
    password: password,
    confirmPassword: confirmPassword,
    nombres: nombres,
    apellidos: apellidos,
    correo: correo,
    telefono: telefono,
    fechaCreacion: new Date().toISOString(),  // al crear un usuario, la fecha de creación es la fecha actual
    fechaExpiracion: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),  // al crear un usuario, la fecha de expiración es la fecha actual + 1 año
    empresaId: 1,  // TODO: Por el momento el atributo empresaId tiene un valor fijo pero debe ser parte del formulario de registro
    rolId: 1  // TODO: Por el momento el atributo rolId tiene un valor fijo pero debe ser parte del formulario de registro
  });
}

export function changePassword(
  usuario: string,
  password: string,
  newPassword: string,
  confirmNewPassword: string,
) {
  return axios.post(CHANGE_PASSWORD_URL, {
    usuario: usuario,
    password: password,
    newPassword: newPassword,
    confirmNewPassword: confirmNewPassword,
  });
}

export function logout() {
  return axios.post(LOGOUT_URL);
}

// // Server should return AuthModel
// export function register(
//   email: string,
//   firstname: string,
//   lastname: string,
//   password: string,
//   password_confirmation: string
// ) {
//   return axios.post(REGISTER_URL, {
//     email,
//     first_name: firstname,
//     last_name: lastname,
//     password,
//     password_confirmation,
//   });
// }

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  });
}
