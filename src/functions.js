function getBookById (books, bookId){
    let libros = books.find(libro => libro.id == bookId);
    if(!libros){
        return "Error";
    }else{
        return libros;
    }
}


function getBookIndexById(books, bookId) {
    let libros = books.find(libro => libro.id == bookId);
    if(!libros){
        return "Error";
    }else{
        return books.indexOf(libros);
    }
}

function BookExists(books,userId,moduleCode){
    let tieneLibro = books.find(books => books.userId == userId && books.moduleCode == moduleCode); 
        if(!tieneLibro){
            return "Error";
        }else{
            return "El usuario ya tiene un libro con ese codigo";
        }
    
}

function BooksFromUser(books,userId){
    let librosUsuario = books.filter(books => books.userId == userId);

    return librosUsuario;
}

function BooksFromModule(books,moduleCode){
    let librosUsuario = books.filter(books => books.moduleCode == moduleCode);

    return librosUsuario;
}

function BooksCheeperThan(books,price){
    let librosPrecio = books.filter(books => books.price <= price);

    return librosPrecio;
}

function booksWhitStatus(books,status){
    let librosConEseEstado = books.filter(books => books.status == status);

    return librosConEseEstado;
}

function averagePriceOfBooks(books){
    let libroPrecioMedio = books.reduce((total,book) => total += book.price, 0);
    return (libroPrecioMedio / books.length).toFixed(2) + "€";
}

function booksOfTypeNotes(books){
    let libroApuntes = books.filter(books => books.publisher == "Apunts");
    return libroApuntes;
}

function booksNotSold(books){
    let librosNoVendidos = books.filter(books => books.soldDate == "");
    return librosNoVendidos;
}

function incrementPriceOfbooks(books,percentage){
    return books.map(libro => ({
        ...libro,
        price:libro.price + libro.price * (percentage / 100)
    }));
}
function getUserById(users,userId){
    let usuarioId = users.find(users => users.id === userId);

    if(!usuarioId){
        return "Error";
    }else{
    return usuarioId;
    }
}
function getUserIndexById(users,userId){
    let usuarioPosicionArray = users.findIndex(users => users.id === userId);
    if(usuarioPosicionArray == -1){
        return "Error";
    }else{
    return usuarioPosicionArray;
    }
}

function getUserByNickName(users,nick){
    let usuarioConNick = users.find(users => users.nick === nick);

    if(!usuarioConNick){
        return "Error";
    }else{
        return usuarioConNick;
    }
}

function getModuleByCode(modules, moduleCode){
    let modulo = modules.find(modules => modules.code == moduleCode);

    if(!modulo){
        return "Error";
    }else{
        return modulo;
    }
    
}
export{getBookById,getBookIndexById,BookExists,BooksFromUser,BooksFromModule,
    BooksCheeperThan,booksWhitStatus, averagePriceOfBooks,booksOfTypeNotes,
    booksNotSold,incrementPriceOfbooks,getUserById,getUserIndexById,getUserByNickName,getModuleByCode}
