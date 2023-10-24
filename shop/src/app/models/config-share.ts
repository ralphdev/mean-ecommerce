export interface ConfigShare {
    categorias:  Categoria[];
    titulo:      string;
    logo:        string;
    serie:       string;
    correlativo: string;
}

export interface Categoria {
    titulo: string;
    icono:  string;
    _id:    string;
}

export interface CatConfig {
    titulo: string,
    portada: string
}