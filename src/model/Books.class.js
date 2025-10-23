import Book from './Book.class.js'

const NOTES = 'Apunts'
let nextId = 1;

export default class Books{
    constructor (){
        this.data = [];
    }

    populate(data){
        const booksArray = Array.isArray(data) ? data : data?.books || [];
        this.data = data.map(item => new Book(item))
        const maxId = this.data.reduce((max, item) => item.id > max ? item.id : max , 0);
        nextId = maxId + 1
    }

    addBook(obj){
        let nuevoLibro = new Book(obj);
        if(obj.id === undefined && this.data.length === 0) {
            nuevoLibro.id = 1;
        }else{
            obj.id = nextId;
        }
        this.data.push(nuevoLibro);
        return nuevoLibro;
    }

    removeBook(id){
        let posicion = this.data.findIndex(book => book.id === id);
        if(posicion != -1){
            this.data.splice(posicion, 1);
        }else{
            throw new Error('Error');
        }

    }

    changeUser(obj){
        let posicion = this.data.findIndex(book => book.id === obj.id);
        if(posicion == -1){
            throw new Error('Error');
        }else{
            this.data.splice(posicion, 1, obj);
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
        return books.indexOf(libros);
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

 incrementPriceOfbooks(percentage){
    return this.data.map(libro => ({
        ...libro,
        price: parseFloat((libro.price * (1 + percentage)).toFixed(2))
    }));
}

}