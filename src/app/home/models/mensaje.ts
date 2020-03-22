export class Mensaje {
    autor: string;
    texto: string;
    id: number;

    constructor(pAutor: string, pTexto: string, pId: number) {
        this.autor = pAutor;
        this.texto = pTexto;
        this.id = pId;
    }
}