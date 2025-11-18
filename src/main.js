import Controller from './controller/controller.class.js';

// Usamos async para el manejo de DOMContentLoaded por convención, aunque la lógica síncrona es suficiente.
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Renderizar la estructura HTML requerida por el Controller/View
    // NOTA: Se debe asegurar que todos los inputs tengan el atributo 'name' para FormData.
    document.body.innerHTML = `
    <header><h1>BatoiBooks</h1></header>
    <nav>
        <ul>
            <li><a href="#list">Ver Libros</a></li>
            <li><a href="#form">Añadir Libro</a></li>
            <li><a href="#about">Acerca de...</a></li>
        </ul>
    </nav>
    
    <div id="messages"></div>

    <main>
        <div id="list"></div>
        
        <div id="remove">
            <label>Id libro a borrar: <input type="text" id="removeBookId"></label> 
            <button id="removeBookButton">Eliminar libro</button> 
        </div>

        <div id="form">
            <form id="book-form">
                <div><label>Módulo:</label> <select id="module-code" name="moduleCode" required></select></div>
                <div><label>Editorial:</label> <input type="text" id="publisher" name="publisher" required></div>
                <div><label>Precio:</label> <input type="number" id="price" name="price" step="0.01" required></div>
                <div><label>Páginas:</label> <input type="number" id="pages" name="pages" required></div>
                
                <div><label>Fecha de Venta:</label> <input type="date" id="soldDate" name="soldDate"></div>
                
                
                <div>
                    <label>Estado:</label>
                    <input type="radio" name="status" value="new"> New
                    <input type="radio" name="status" value="good" checked> Good
                    <input type="radio" name="status" value="bad"> Bad
                </div>
                <div><label>Comentarios:</label> <textarea id="comments" name="comments"></textarea></div>
                
                <button type="submit">Guardar</button>
                <button type="reset">Reset</button>
            </form>
        </div>
        
        <div id="about">
            <p>Lorem ipsum...</p>
        </div>
    </main>
    <footer>Hecho por Jorge.</footer>
    `;

    // 2. Inicializar el Controlador
    const controller = new Controller();
    controller.init();
});