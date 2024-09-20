import axiosInstance from '../api/axios';

// Definicion de interfaz de productos
interface Products {
    nombreProducto: string;
    imagen: string;  
    precio$: string;
}


// Exportacion de funciones API
export const getProducts = () => axiosInstance.get('products');
export const createRequest = (product: Products) => axiosInstance.post('products', product);
export const updateProduct = (idproducto: number, product: Products) => axiosInstance.put(`products/${idproducto}`, product);
export const deleteProduct = (idproducto: number) => axiosInstance.delete(`products/${idproducto}`);