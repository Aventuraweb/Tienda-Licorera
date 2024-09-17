import axiosInstance from '../api/axios';

// Definicion de interfaz Credentials
interface Credentials {
    nombreUsuario: string;
    correo: string;
    password: string;  
}

// Exportacion de funciones API
export const loginRequest = (user: Credentials) => axiosInstance.post('login', user);
export const registerRequest = (user: Credentials) => axiosInstance.post('register', user);
export const logoutRequest = () => axiosInstance.post('logout');