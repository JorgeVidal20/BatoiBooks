

export async function getDBUsers(){
    try{
    const respuesta = await fetch(`http://localhost:3000/users`);

    if(!respuesta.ok){
        throw new Error('Error HTTP');
    }

    const datos = await respuesta.json();

    return datos;
    }catch (error){

        return error;
    }
    
}

export async function getDBModules(){
    try{
    const respuesta = await fetch(`http://localhost:3000/modules`);

    if(!respuesta.ok){
        throw new Error('Error HTTP');
    }

    const datos = await respuesta.json();

    return datos;
    }catch (error){

        return error;
    }
    
}

export async function getDBBooks(){
    try{
    const respuesta = await fetch(`http://localhost:3000/books`);

    if(!respuesta.ok){
        throw new Error('Error HTTP');
    }

    const datos = await respuesta.json();

    return datos;
    }catch (error){

        return error;
    }
    
}

export async function getDBUser(id){
    
    try{
        const respuesta = await fetch(`http://localhost:3000/users`);
        if(!respuesta.ok){
        throw new Error('Error HTTP');
        }

        const datos = await respuesta.json();
        const usuario = datos.find(usuario => usuario.id === id);

        if(usuario){
            return usuario;
        }else{
            return null;
        }


    }catch(error){
        return error;
    }
}

export async function getDBBook(id){
    
    try{
        const respuesta = await fetch(`http://localhost:3000/books`);
        if(!respuesta.ok){
        throw new Error('Error HTTP');
        }

        const datos = await respuesta.json();
        const usuario = datos.find(usuario => usuario.id === id);

        if(usuario){
            return usuario;
        }else{
            return null;
        }


    }catch(error){
        return error;
    }
}

export async function addDBBook(obj){
    
    try{
        
        const respuesta = await fetch(`http://localhost:3000/books`,{
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            
            body: JSON.stringify(obj)
        });

        if(!respuesta.ok){
        throw new Error('Error HTTP');
        }
        const libroCreado = await respuesta.json();

        return libroCreado;

    }catch(error){
        return error;
    }
}

export async function addDBUser(obj){
    
    try{
        
        const respuesta = await fetch(`http://localhost:3000/books`,{
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            
            body: JSON.stringify(obj)
        });

        if(!respuesta.ok){
        throw new Error('Error HTTP');
        }
        const usuarioCreado = await respuesta.json();

        return usuarioCreado;

    }catch(error){
        return error;
    }
}


export async function removeDBBook(id){
    
    try{
        
        const respuesta = await fetch(`http://localhost:3000/books/${id}`,{
            method: 'DELETE', 
        });

        if(!respuesta.ok){
        throw new Error('Error HTTP');
        }

        return "Libro Eliminado con exito";

    }catch(error){
        return error;
    }
}

export async function removeDBUser(id){
    
    try{
        
        const respuesta = await fetch(`http://localhost:3000/users/${id}`,{
            method: 'DELETE', 
        });

        if(!respuesta.ok){
        throw new Error('Error HTTP');
        }

        return "User Eliminado con exito";

    }catch(error){
        return error;
    }
}

export async function changeDBBook(obj){
    
    try{
        
        const respuesta = await fetch(`http://localhost:3000/books/${obj.id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(obj) 
        });

        if(!respuesta.ok){
        throw new Error('Error HTTP');
        }
        const datos = await respuesta.json();
        return datos;

    }catch(error){
        return error;
    }
}

export async function changeDBUser(obj){
    
    try{
        
        const respuesta = await fetch(`http://localhost:3000/users/${obj.id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(obj) 
        });

        if(!respuesta.ok){
        throw new Error('Error HTTP');
        }
        const datos = await respuesta.json();
        return datos;

    }catch(error){
        return error;
    }
}

export async function changeDBUserPassword(id, contraseña){
    
    try{
        
        const respuesta = await fetch(`http://localhost:3000/user/${id}`,{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({password: contraseña}) 
        });

        if(!respuesta.ok){
        throw new Error('Error HTTP');
        }
        const usuarioActualizado = await respuesta.json();
        return usuarioActualizado;

    }catch(error){
        return error;
    }
}


