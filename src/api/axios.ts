// configuracion de axios
import axios from 'axios';

const axiosInstance = axios.create({
    //definicion de la url de la api
  baseURL: 'http://localhost:3000/api', 
   // Definicion de withCredentials para que las cookies sean enviadas
  withCredentials: true, 
});

export default axiosInstance;
