import * as functions from '../src/functions.js'
import data from '../src/services/datos.js'


document.querySelector('#app').innerHTML = `
  <div>
    <img src="./public/logoBatoi.png" class="logo" alt="BatoiLogo" />
    <h1>BatoiBooks</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Abre la consola para ver el resultado
    </p>
  </div>
`;

let librosUsuario = functions.BooksFromUser(data.books, 4);
console.log(librosUsuario);

let librosModulosEstado = functions.booksWhitStatus(functions.BooksFromModule(data.books, "5021"), "good");
console.log(librosModulosEstado);

let incrementoPrecioLibros = functions.incrementPriceOfbooks(data.books, 10);
console.log(incrementoPrecioLibros);