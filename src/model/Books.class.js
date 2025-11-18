import Book from './Book.class.js'
import * as api from '../services/api.js'



export default class Books{
    constructor (){
        this.data = [];
        this.nextId = 1;
    }

    async populate(){
        let data =  await api.getDBBooks();
        this.data = data.map(item => new Book(item));
        
        // Asegurar que el ID es tratado como un número para encontrar el máximo correctamente.
        const maxId = this.data.reduce((max, item) => {
            const currentId = parseInt(item.id);
            return currentId > max ? currentId : max;
        } , 0);
        this.nextId = maxId + 1;
    }
        
        async addBook(book) {
        let libroNuevo = new Book(book);

        if(book.id === undefined && this.data.length === 0) {
            libroNuevo.id = 1;
        } else {
            let maxId = this.data.reduce((max, libro) => Math.max(max, Number(libro.id)), 0);
            libroNuevo.id = maxId + 1;
            book.id = maxId + 1;
        }

        let libroNuevoIdString = new Book(book);
        libroNuevoIdString.id = `${libroNuevo.id}`;

        let responseBook = await api.addDBBook(libroNuevoIdString);

        if (responseBook !== false) {
            this.data.push(libroNuevo);
        } else {
            throw new Error("No se ha podido añadir el libro")
        }

        
        return libroNuevo;
    }


    async removeBook(id){
        // Usamos parseInt para comparar estrictamente contra el valor numérico,
        // ya que el populate asegura que nextId se base en números.
        const idAsNumber = parseInt(id); 

        // Buscar el índice comparando el valor numérico de la ID del libro.
        let posicion = this.data.findIndex(book => parseInt(book.id) === idAsNumber);
        
        if(posicion != -1){
            // Usamos la ID original (que es numérica desde el controlador) para la API.
            let respuestaLibro = await api.removeDBBook(id); 
            if(respuestaLibro){
                this.data.splice(posicion, 1);
            }else{
                throw new Error ("Error");
            } 
        }else{
            throw new Error('Error');
        }
    }

    async changeBook(obj){
        let posicion = this.data.findIndex(book => book.id === obj.id);
        if(posicion == -1){
            throw new Error('Error');
        }else{
            let nuevoBook = new Book(obj);
            let respuestaLibro = await api.changeDBBook(obj);
            if(respuestaLibro){
                this.data.splice(posicion, 1, nuevoBook);
            }else{
                throw new Error('Error');
            }
            return nuevoBook;
        }
    }

    toString(){
        let salida = "";

        this.data.forEach(book => salida += book.toString() + "\n\n");

        return salida;
    }

     getBookById (bookId){
    let libros = this.data.find(libro => libro.id == bookId);
    if(!libros){
        throw new Error('Error');
    }else{
        return libros;
    }
}


 getBookIndexById(bookId) {
    let libros = this.data.find(libro => libro.id == bookId);
    if(!libros){
        throw new Error('Error');
    }else{
        return this.data.indexOf(libros);
    }
}

 bookExists(userId,moduleCode){
    let tieneLibro = this.data.find(books => books.userId === userId && books.moduleCode === moduleCode); 
        if(!tieneLibro){
            return false;
        }else{
            return true;
        }
    
}

 booksFromUser(userId){
    let librosUsuario = this.data.filter(books => books.userId == userId);

    return librosUsuario;
}

 booksFromModule(moduleCode){
    let librosUsuario = this.data.filter(books => books.moduleCode == moduleCode);

    return librosUsuario;
}

 booksCheeperThan(price){
    let librosPrecio = this.data.filter(books => books.price <= price);

    return librosPrecio;
}

 booksWithStatus(status){
    let librosConEseEstado = this.data.filter(books => books.status == status);

    return librosConEseEstado;
}

 averagePriceOfBooks(){
    if (this.data.length === 0) return "0.00 €";
    let libroPrecioMedio = this.data.reduce((total,book) => total += book.price, 0);
    return (libroPrecioMedio / this.data.length).toFixed(2) + " €";
}

 booksOfTypeNotes(){
    let libroApuntes = this.data.filter(books => books.publisher == "Apunts");
    return libroApuntes;
}

 booksNotSold(){
    let librosNoVendidos = this.data.filter(books => books.soldDate == "");
    return librosNoVendidos;
}

 

}