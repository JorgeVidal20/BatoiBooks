function getBookById (books, bookId){
    let libros = books.find(libro => libro.id == bookId);
    if(!libros){
        throw new Error('Error');
    }else{
        return libros;
    }
}


function getBookIndexById(books, bookId) {
    let libros = books.find(libro => libro.id == bookId);
    if(!libros){
        throw new Error('Error');
    }else{
        return books.indexOf(libros);
    }
}

function bookExists(books,userId,moduleCode){
    let tieneLibro = books.find(books => books.userId === userId && books.moduleCode === moduleCode); 
        if(!tieneLibro){
            return false;
        }else{
            return true;
        }
    
}

function booksFromUser(books,userId){
    let librosUsuario = books.filter(books => books.userId == userId);

    return librosUsuario;
}

function booksFromModule(books,moduleCode){
    let librosUsuario = books.filter(books => books.moduleCode == moduleCode);

    return librosUsuario;
}

function booksCheeperThan(books,price){
    let librosPrecio = books.filter(books => books.price <= price);

    return librosPrecio;
}

function booksWithStatus(books,status){
    let librosConEseEstado = books.filter(books => books.status == status);

    return librosConEseEstado;
}

function averagePriceOfBooks(books){
    if (books.length === 0) return "0.00 €";
    let libroPrecioMedio = books.reduce((total,book) => total += book.price, 0);
    return (libroPrecioMedio / books.length).toFixed(2) + " €";
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
        price: parseFloat((libro.price * (1 + percentage)).toFixed(2))
    }));
}
function getUserById(users,userId){
    let usuarioId = users.find(users => users.id === userId);

    if(!usuarioId){
        throw new Error('Error');
    }else{
    return usuarioId;
    }
}
function getUserIndexById(users,userId){
    let usuarioPosicionArray = users.findIndex(users => users.id === userId);
    if(usuarioPosicionArray == -1){
        throw new Error('Error');
    }else{
    return usuarioPosicionArray;
    }
}

function getUserByNickName(users,nick){
    let usuarioConNick = users.find(users => users.nick === nick);

    if(!usuarioConNick){
        throw new Error('Error');
    }else{
        return usuarioConNick;
    }
}

function getModuleByCode(modules, moduleCode){
    let modulo = modules.find(modules => modules.code == moduleCode);

    if(!modulo){
        throw new Error('Error');
    }else{
        return modulo;
    }
    
}
export{getBookById,getBookIndexById,bookExists,booksFromUser,booksFromModule,
    booksCheeperThan,booksWithStatus, averagePriceOfBooks,booksOfTypeNotes,
    booksNotSold,incrementPriceOfbooks,getUserById,getUserIndexById,getUserByNickName,getModuleByCode}
