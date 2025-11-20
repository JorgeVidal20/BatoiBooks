import Books from '../model/Books.class.js';
import Modules from '../model/Modules.class.js'; 
import View from '../view/view.class.js';
import Cart from '../model/Cart.class.js';

export default class Controller {
  constructor() {
    this.books = new Books();
    this.modules = new Modules();
    this.view = new View();
    this.cart = new Cart();
  }

  /**
   * Inicializa la aplicación: carga datos, renderiza vista e instala escuchadores.
   */
  async init() {
    try {
      await Promise.all([this.modules.populate(), this.books.populate()]);

      this.view.renderModulesInSelect(this.modules.data);

      this.books.data.forEach((book) => this.view.renderBook(book));

      this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
      this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
      this.view.bindAddToCart(this.handleAddToCart.bind(this));
      this.view.bindRemoveBook(this.handleRemoveBook.bind(this));
      this.view.bindEditBook(this.handleEditBook.bind(this));
      this.view.bindReset(this.handleReset.bind(this));
    } catch (error) {
      this.view.showMessage('error', `Error al cargar datos iniciales: ${error.message}`);
    }
  }

  /**
   * Maneja el envío del formulario: añade libro al modelo y lo renderiza en la vista.
   */
  async handleSubmitBook(payload) {
    try {
      if (payload.action === 'update') {
        
        const updatedBook = await this.books.changeBook(payload);
        this.view.updateBookInList(updatedBook);
        this.view.showMessage('info', 'Libro editado correctamente');

      } else {

        const newBook = await this.books.addBook(payload);
        this.view.renderBook(newBook);
        this.view.showMessage('info', `Libro añadido con ID: ${newBook.id}`);
      
      }

      this.view.bookForm.reset();
      this.view.resetFormMode(); 

    } catch (error) {
      this.view.showMessage('error', `Error: ${error.message}`);
    }
  }

  /**
   * Maneja la eliminación de un libro por su ID.
   */
  async handleRemoveBook(idToRemove) {
    const bookId = parseInt(idToRemove, 10);

    if (isNaN(bookId)) {
        this.view.showMessage('error', 'Error: La ID debe ser un número.');
        return;
    }

    try {
      await this.books.removeBook(bookId);

      this.view.removeBook(bookId);

      this.view.showMessage('info', `Libro con ID ${bookId} eliminado correctamente.`);
    } catch (error) {
      this.view.showMessage('error', `Error al eliminar el libro con ID ${bookId}: ${error.message}`);
    }
  }


     handleAddToCart(id) {
    try {
      const book = this.books.getBookById(id);
      this.cart.addItem(book);
      this.view.showMessage('info', 'Libro añadido al carrito ');
    } catch (error) {
      console.error(error); 
      this.view.showMessage('error', 'El libro ya está en el carrito.');
    }
  }

  async handleRemoveBook(id) {
    try {
      const book = this.books.getBookById(id);
      const mensaje = `¿Estás seguro de que quieres eliminar el libro con ID ${id} del módulo ${book.moduleCode}?`;
      if (window.confirm(mensaje)) {
        await this.books.removeBook(id);
        this.view.removeBook(id);
        this.view.showMessage('info', 'Libro eliminado correctamente');
      }
    } catch (error) {
      console.error(error);
      this.view.showMessage('error', 'Error: No se pudo eliminar el libro o no existe.');
    }
  }

  handleEditBook(id) {
    try {
      const book = this.books.getBookById(id);
      this.view.showEditForm(book);
      
    } catch (error) {
      this.view.showMessage('error', 'No se pudo cargar el libro para editar');
    }
  }

  handleReset() {
    this.view.resetFormMode();
  }
}
