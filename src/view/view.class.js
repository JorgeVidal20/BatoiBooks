export default class View {
  constructor() {
    this.booksList = document.getElementById('list');
    this.about = document.getElementById('about');
    this.form = document.getElementById('form');
    this.remove = document.getElementById('remove');
    this.removeBtn = document.getElementById('removeBookButton');
    this.bookForm = document.getElementById('book-form');
    this.messages = document.getElementById('messages');
    this.moduleSelect = document.getElementById('module-code');
    this.idBookInput = document.getElementById('removeBookId');
    this.cartContainer = document.getElementById('cart');
  }

  renderModulesInSelect(modules) {
    if (!this.moduleSelect) return;
    this.moduleSelect.innerHTML = '<option value="">Selecciona un módulo</option>';
    modules.forEach(module => {
      const option = document.createElement('option');
      option.value = module.code;
      option.textContent = module.cliteral;
      this.moduleSelect.appendChild(option);
    });
  }

  renderBook(book) {
    if (!this.booksList) return;

    const bookCard = document.createElement('div');
    bookCard.className = 'card';
    bookCard.dataset.bookId = book.id;

    const saleStatus = book.soldDate
      ? `Vendido el ${this.formatDate(book.soldDate)}`
      : 'En venta';

    bookCard.innerHTML = `
      <img src="${book.photo || ''}" alt="Libro: ${book.id}">
      <div>
        <h3>${book.moduleCode} (${book.id})</h3>
        <h4>${book.publisher}</h4>
        <p>${book.pages} páginas</p>
        <p>Estado: ${book.status}</p>
        <p>${saleStatus}</p>
        <p>${book.comments || ''}</p>
        <h4>${book.price} €</h4>
        <button class="btn-cart" data-id="${book.id}"><span class="material-icons">add_shopping_cart</span></button>
        <button class="btn-edit" data-id="${book.id}"><span class="material-icons">edit</span></button>
        <button class="btn-delete" data-id="${book.id}"><span class="material-icons">delete</span></button>
      </div>
    `;
    this.booksList.appendChild(bookCard);
  }

  renderCart(cart) {
    if (!this.cartContainer) return;
    this.cartContainer.innerHTML = '';
    this.cartContainer.classList.remove('hidden');

    const title = document.createElement('h2');
    title.textContent = 'Carrito de la compra';
    this.cartContainer.appendChild(title);

    if (cart.data.length === 0) {
      const p = document.createElement('p');
      p.textContent = 'El carrito está vacío.';
      this.cartContainer.appendChild(p);
      return;
    }

    const list = document.createElement('div');
    list.style.display = 'grid';
    list.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
    list.style.gap = '1.5rem';
    list.style.marginBottom = '2rem';

    cart.data.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.className = 'card';

      let saleStatus = book.soldDate
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
              <button class="btn-remove-cart" data-id="${book.id}"><span class="material-icons">remove_shopping_cart</span></button>
            </div>
          `;
      list.appendChild(bookCard);
    });

    this.cartContainer.appendChild(list);

    const buttonsDiv = document.createElement('div');

    const checkoutBtn = document.createElement('button');
    checkoutBtn.textContent = 'Realizar la compra';
    checkoutBtn.id = 'btn-checkout';

    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Vaciar carrito';
    clearBtn.id = 'btn-clear-cart';

    buttonsDiv.appendChild(checkoutBtn);
    buttonsDiv.appendChild(clearBtn);

    this.cartContainer.appendChild(buttonsDiv);
  }

  removeBook(bookId) {
    if (!this.booksList) return;
    const bookCard = this.booksList.querySelector(`[data-book-id="${bookId}"]`);
    if (bookCard) bookCard.remove();
  }

  showMessage(type, message) {
    if (!this.messages) return;

    const messageDiv = document.createElement('div');
    const alertType = type === 'error' ? 'alert-danger' : 'alert-info';

    messageDiv.className = `error info alert ${alertType} alert-dismissible`;
    messageDiv.setAttribute('role', 'alert');
    messageDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
    `;
    this.messages.appendChild(messageDiv);

    if (type !== 'error') {
      setTimeout(() => {
        if (messageDiv.parentElement) messageDiv.remove();
      }, 3000);
    }
  }

  // --- VALIDACIÓN Y ENVÍO ---
  setBookSubmitHandler(callback) {
    if (!this.bookForm) return;

    this.bookForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // 1. Validar formulario
      if (!this.bookForm.checkValidity()) {
        const priceInput = this.bookForm.price;
        const pagesInput = this.bookForm.pages;
        let msg = 'Revisa los campos obligatorios.';

        // Detectar error específico de número negativo
        if (priceInput.validity.rangeUnderflow || pagesInput.validity.rangeUnderflow) {
          msg = 'El precio y las páginas no pueden ser negativos (mínimo 0).';
        }

        this.showMessage('error', msg);
        return;
      }

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
      const idToRemove = this.idBookInput ? this.idBookInput.value : '';
      if (idToRemove) callback(idToRemove);
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
      if (button && button.dataset.id) handler(button.dataset.id);
    });
  }

  bindRemoveBook(handler) {
    if (!this.booksList) return;
    this.booksList.addEventListener('click', (event) => {
      const button = event.target.closest('.btn-delete');
      if (button && button.dataset.id) handler(button.dataset.id);
    });
  }

  bindEditBook(handler) {
    this.booksList.addEventListener('click', (event) => {
      const button = event.target.closest('.btn-edit');
      if (button && button.dataset.id) handler(button.dataset.id);
    });
  }

  showEditForm(book) {
    const title = document.getElementById('form-title');
    if (title) title.textContent = 'Editar Libro';

    const idGroup = document.getElementById('id-group');
    const idInput = document.getElementById('book-id');
    if (idGroup && idInput) {
      idGroup.classList.remove('hidden');
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
    if (idGroup) idGroup.classList.add('hidden');
    if (idInput) idInput.value = '';
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

  bindRemoveFromCart(handler) {
    if (!this.cartContainer) return;
    this.cartContainer.addEventListener('click', (event) => {
      const button = event.target.closest('.btn-remove-cart');
      if (button && button.dataset.id) handler(button.dataset.id);
    });
  }

  bindCheckout(handler) {
    if (!this.cartContainer) return;
    this.cartContainer.addEventListener('click', (event) => {
      if (event.target.id === 'btn-checkout') handler();
    });
  }

  bindClearCart(handler) {
    if (!this.cartContainer) return;
    this.cartContainer.addEventListener('click', (event) => {
      if (event.target.id === 'btn-clear-cart') handler();
    });
  }
}