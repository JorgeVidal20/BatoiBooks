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
      <img src="${book.photo}" alt="Libro: ${book.id}">
      <div>
        <h3>${book.moduleCode} (${book.id})</h3>
        <h4>${book.publisher}</h4>
        <p>${book.pages} páginas</p>
        <p>Estado: ${book.status}</p>
        <p>${saleStatus}</p>
        <p>${book.comments || ''}</p>
        <h4>${book.price} €</h4>

        <button class="btn-cart" data-id="${book.id}">
            <span class="material-icons">add_shopping_cart</span>
        </button>
        <button class="btn-edit" data-id="${book.id}">
            <span class="material-icons">edit</span>
        </button>
        <button class="btn-delete" data-id="${book.id}">
            <span class="material-icons">delete</span>
        </button>
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
      
      const formData = new FormData(this.bookForm);
      const btnSave = document.getElementById('btn-save'); 
      const idInput = document.getElementById('book-id');

      const payload = {
        moduleCode: formData.get('moduleCode'),
        publisher: formData.get('publisher'),
        price: parseFloat(formData.get('price')),
        pages: parseInt(formData.get('pages')),
        status: formData.get('status'),
        soldDate: formData.get('soldDate'),
        comments: formData.get('comments') || '',
        photo: formData.get('photo') || ''
      };

      // LÓGICA DE CLASES
      if (btnSave.classList.contains('btn-edit')) {
          payload.id = idInput.value; 
          payload.action = 'update';
      } else {
          payload.action = 'create'; 
      }
      
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


  bindAddToCart(handler) {
    if (!this.booksList) return;

    this.booksList.addEventListener('click', (event) => {
      const button = event.target.closest('.btn-cart');

      if (button) {
        const id = button.dataset.id;
        if (id) {
          handler(id);
        }
      }
    });
  }

  bindRemoveBook(handler) {
    if (!this.booksList) return;

    this.booksList.addEventListener('click', (event) => {
      const button = event.target.closest('.btn-delete');

      if (button && button.dataset.id) {
        const id = button.dataset.id;
        handler(id);
      }
    });
  }

  bindEditBook(handler) {
    this.booksList.addEventListener('click', (event) => {
      const button = event.target.closest('.btn-edit');
      if (button && button.dataset.id) {
        handler(button.dataset.id);
      }
    });
  }

 showEditForm(book) {
    const title = document.getElementById('form-title');
    if (title) title.textContent = 'Editar Libro';

    const idGroup = document.getElementById('id-group');
    const idInput = document.getElementById('book-id');
    if (idGroup && idInput) {
        idGroup.classList.remove('hidden'); // Quita la clase oculta
        idInput.value = book.id;
    }
    if (this.bookForm) {
        this.bookForm.moduleCode.value = book.moduleCode;
        this.bookForm.publisher.value = book.publisher;
        this.bookForm.price.value = book.price;
        this.bookForm.pages.value = book.pages;
        this.bookForm.comments.value = book.comments || '';
        this.bookForm.status.value = book.status; 
        
        if (book.soldDate) {
             this.bookForm.soldDate.value = book.soldDate.split('T')[0];
        }
    }

    const btnSave = document.getElementById('btn-save');
    if (btnSave) {
        btnSave.classList.remove('btn-add');
        btnSave.classList.add('btn-edit');
        btnSave.textContent = 'Actualizar';
    }
  }

  resetFormMode() {
    const btnSave = document.getElementById('btn-save');
    if (btnSave) {
        btnSave.classList.remove('btn-edit');
        btnSave.classList.add('btn-add');
        btnSave.textContent = 'Guardar';
    }

    const title = document.getElementById('form-title');
    if (title) title.textContent = 'Añadir Libro';

    const idGroup = document.getElementById('id-group');
    const idInput = document.getElementById('book-id');
    
    if (idGroup) {
        idGroup.classList.add('hidden'); 
    }
    if (idInput) {
        idInput.value = ''; 
    }
  }

updateBookInList(book) {
    const bookCard = this.booksList.querySelector(`div[data-book-id="${book.id}"]`);
    
    if (bookCard) {
      const saleStatus = book.soldDate 
        ? `Vendido el ${this.formatDate(book.soldDate)}` 
        : 'En venta';

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

          <div class="actions">
            <button class="btn-cart" data-id="${book.id}"><span class="material-icons">add_shopping_cart</span></button>
            <button class="btn-edit" data-id="${book.id}"><span class="material-icons">edit</span></button>
            <button class="btn-delete" data-id="${book.id}"><span class="material-icons">delete</span></button>
          </div>
        </div>
      `;
    }
  }

  bindReset(handler) {
    if (!this.bookForm) return;

    this.bookForm.addEventListener('reset', () => {
        setTimeout(() => handler(), 10); 
    });
  }
}