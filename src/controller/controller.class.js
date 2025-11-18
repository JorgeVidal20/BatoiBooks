import Books from '../model/Books.class.js';
import Modules from '../model/Modules.class.js'; 
import View from '../view/view.class.js';

export default class Controller {
  constructor() {
    this.books = new Books();
    this.modules = new Modules();
    this.view = new View();
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
    } catch (error) {
      this.view.showMessage('error', `Error al cargar datos iniciales: ${error.message}`);
    }
  }

  /**
   * Maneja el envío del formulario: añade libro al modelo y lo renderiza en la vista.
   */
  async handleSubmitBook(payload) {
    try {
      const newBook = await this.books.addBook(payload);

      this.view.renderBook(newBook);

      this.view.showMessage('info', `Libro añadido correctamente con ID: ${newBook.id}`);
    } catch (error) {
      this.view.showMessage('error', `Error al añadir el libro: ${error.message}`);
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
}