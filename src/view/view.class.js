export default class View {
  constructor() {
    // Propiedades del DOM
    this.booksList = document.getElementById('list');
    this.about = document.getElementById('about');
    this.form = document.getElementById('form');
    this.remove = document.getElementById('remove');
    this.removeBtn = document.getElementById('removeBookButton');
    this.bookForm = document.getElementById('book-form');
    this.messages = document.getElementById('messages');
    this.moduleSelect = document.getElementById('module-code');
    this.idBookInput = document.getElementById('removeBookId');
  }

  /**
   * Renderiza los módulos en el SELECT del formulario
   */
  renderModulesInSelect(modules) {
    if (!this.moduleSelect) return;
    
    // Limpiar opciones anteriores
    this.moduleSelect.innerHTML = '<option value="">Selecciona un módulo</option>';
    
    // Añadir cada módulo como opción
    modules.forEach(module => {
      const option = document.createElement('option');
      option.value = module.code;
      option.textContent = module.cliteral; 
      this.moduleSelect.appendChild(option);
    });
  }

  /**
   * Renderiza un libro en la lista
   */
  renderBook(book) {
    if (!this.booksList) return;
    
    // Crear el div card
    const bookCard = document.createElement('div');
    bookCard.className = 'card';
    bookCard.dataset.bookId = book.id;
    
    // Determinar si está vendido o en venta
    const saleStatus = book.soldDate 
      ? `Vendido el ${this.formatDate(book.soldDate)}` 
      : 'En venta';
    
    // Construir el HTML del libro
    bookCard.innerHTML = `
      <img src="${book.photo || 'https://via.placeholder.com/150'}" alt="Libro: ${book.id}">
      <div>
        <h3>${book.moduleCode} (${book.id})</h3>
        <h4>${book.publisher}</h4>
        <p>${book.pages} páginas</p>
        <p>Estado: ${book.status}</p>
        <p>${saleStatus}</p>
        <p>${book.comments || ''}</p>
        <h4>${book.price} €</h4>
      </div>
    `;
    
    // Añadir el libro a la lista
    this.booksList.appendChild(bookCard);
  }

  /**
   * Elimina un libro de la vista
   */
  removeBook(bookId) {
    if (!this.booksList) return;
    
    const bookCard = this.booksList.querySelector(`[data-book-id="${bookId}"]`);
    if (bookCard) {
      bookCard.remove();
    }
  }

 
  showMessage(type, message) {
    if (!this.messages) return;
    
    // Crear el div del mensaje
    const messageDiv = document.createElement('div');
    const alertType = type === 'error' ? 'alert-danger' : 'alert-info';
    
    // Agregar clases necesarias
    messageDiv.className = `error info alert ${alertType} alert-dismissible`;
    messageDiv.setAttribute('role', 'alert');
    
    messageDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
    `;
    
    // Añadir el mensaje al contenedor
    this.messages.appendChild(messageDiv);
    
    // Si NO es error, cerrar automáticamente después de 3 segundos
    if (type !== 'error') {
      setTimeout(() => {
        if (messageDiv.parentElement) {
          messageDiv.remove();
        }
      }, 3000);
    }
  }



  setBookSubmitHandler(callback) {
    if (!this.bookForm) return;
    
    this.bookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      // Recoger los datos del formulario
      const formData = new FormData(this.bookForm);
      
      const payload = {
        moduleCode: formData.get('moduleCode'),
        publisher: formData.get('publisher'),
        price: parseFloat(formData.get('price')),
        pages: parseInt(formData.get('pages')),
        status: formData.get('status'),
        comments: formData.get('comments') || '',
        photo: formData.get('photo') || ''
      };
      
      // Llamar al callback con los datos
      callback(payload);
    });
  }

  
  setBookRemoveHandler(callback) {
    if (!this.removeBtn) return;
    
    this.removeBtn.addEventListener('click', () => {
      // Recoger la id del libro a borrar
      const idToRemove = this.idBookInput ? this.idBookInput.value : '';
      
      if (idToRemove) {
        callback(idToRemove);
      }
    });
  }

 
  formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }
}