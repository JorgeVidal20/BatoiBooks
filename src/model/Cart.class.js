import Book from '../model/Book.class.js';

export default class Cart {
    constructor() {
        this.data = [];
    }

    populate() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart);
                this.data = parsedCart.map(item => new Book(item));
            } catch (e) {
                console.error("Error parsing cart from localStorage", e);
                this.data = [];
            }
        }
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.data));
    }

    getBookById(id) {
        let libros = this.data.find(libro => libro.id == id);
        if (!libros) {
            throw new Error('Error');
        } else {
            return libros;
        }
    }

    addItem(book) {
        let libroNuevo = new Book(book);
        const existe = this.data.some(book => book.id === libroNuevo.id);
        if (existe) {
            throw new Error('Error');
        } else {
            this.data.push(libroNuevo);
            this.save();
        }
    }

    removeItem(id) {
        const idAsNumber = parseInt(id);
        let posicion = this.data.findIndex(book => parseInt(book.id) === idAsNumber);
        if (posicion != -1) {
            this.data.splice(posicion, 1);
            this.save();
        } else {
            throw new Error('Error');
        }
    }

    clear() {
        this.data = [];
        this.save();
    }

    toString() {
        let salida = "";
        this.data.forEach(book => salida += book.toString() + "\n\n");
        return salida;
    }
}