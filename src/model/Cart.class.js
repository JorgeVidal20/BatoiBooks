import Book from '../model/Book.class.js';
export default class Cart{
    constructor(){
        this.data=[];
    }

    populate(){

    }

    getBookById(id){
    let libros = this.data.find(libro => libro.id == id);
    if(!libros){
        throw new Error('Error');
    }else{
        return libros;
    }
    }

    addItem(book){
        let libroNuevo = new Book(book);
        const existe = this.data.some(book => book.id === libroNuevo.id);
        if(existe){
            throw new Error('Error');
        }else{
             this.data.push(libroNuevo);
        }
    }

     removeItem(id){
            const idAsNumber = parseInt(id); 
            let posicion = this.data.findIndex(book => parseInt(book.id) === idAsNumber);
            if(posicion != -1){
            this.data.splice(posicion, 1);
            }else{
                throw new Error('Error');
            }
        }

        toString(){
        let salida = "";

        this.data.forEach(book => salida += book.toString() + "\n\n");

        return salida;
        }
}