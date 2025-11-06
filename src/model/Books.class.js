import Book from './Book.class.js'
import * as api from '../services/api.js'



export default class Books{
    constructor (){
        this.data = [];
        this.nextId = 1;
    }

    async populate(){
        //const booksArray = Array.isArray(data) ? data : data?.books || [];
        //this.data = data.map(item => new Book(item));

        let data =  await api.getDBBooks();
        this.data = data.map(item => new Book(item));
        const maxId = this.data.reduce((max, item) => item.id > max ? item.id : max , 0);
        this.nextId = maxId + 1;
    }

     async addBook(obj){
        
        let respuestaLibro = await api.addDBBook(obj);
        if(respuestaLibro){
            let nuevoLibro = new Book(respuestaLibro);
            this.data.push(nuevoLibro);
            if (nuevoLibro.id >= this.nextId) {
            this.nextId = nuevoLibro.id + 1;
        }
            return nuevoLibro;
        }else{
            throw new Error ('Error');
            
        }
        

    }

    async removeBook(id){

        let posicion = this.data.findIndex(book => book.id === id);
        if(posicion != -1){
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