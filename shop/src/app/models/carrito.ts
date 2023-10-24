import { Productos } from './productos';

export interface Carrito {
    _id?: string,
    producto: string;
    cliente: string;
    cantidad: number;
    variedad: string | null;
}

export interface CarritoCliente extends Productos {
    cliente: string;
    cantidad: number;
    variedad: string | null;
    producto: Productos
}