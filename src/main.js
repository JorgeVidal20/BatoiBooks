import './style.css'
import Batoilogo from '../public/logoBatoi.png';


document.querySelector('#app').innerHTML = `
  <div>
      <img src="${Batoilogo}" class="logo" alt="Vite logo" />
    <h1>BatoiBooks</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Abre la consola para ver el resultado
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
