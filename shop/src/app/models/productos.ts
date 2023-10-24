
export interface Productos {
    _id:              string;
    titulo:           string;
    slug:             string;
    galeria:          Galeria[];
    portada:          string;
    precio:           number;
    descripcion:      string;
    contenido:        string;
    stock:            number;
    nventas:          number;
    npuntos:          number;
    variedades:       Variedade[];
    categoria:        string;
    estado:           string;
    createdAt:        string;
    titulo_variedad?: string;
}

export interface Galeria {
    imagen: string;
    _id:    string;
}

export interface Variedade {
    titulo: string;
}