import User from './User.class.js'
import * as api from '../services/api.js'



export default class Users{
    constructor (){
        this.data = [];
        this.nextId = 1;
    }
    
    async populate(){
        //const userArray = Array.isArray(data) ? data : data?.user || [];

          let user =  await api.getDBUsers();
          this.data = user.map(item => new User(item.id,item.nick, item.email, item.password ));
          const maxId = this.data.reduce((max, item) => item.id > max ? item.id : max , 0);
          this.nextId = maxId + 1;
        }

    async addUser(obj){
        let respuestaLibro = await api.addDBUser(obj);
        if(respuestaLibro){
            let nuevoUsuario = new User(respuestaLibro.id,respuestaLibro.nick,respuestaLibro.email,respuestaLibro.password);
            this.data.push(nuevoUsuario);
            if (nuevoUsuario.id >= this.nextId) {
            this.nextId = nuevoUsuario.id + 1;
        }
            return nuevoUsuario;
        }else{
            throw new Error('Error');
        }
    }

    async removeUser(id){
        let posicion = this.data.findIndex(user => user.id === id);
        if(posicion != -1){
            let respuestaLibro = await api.removeDBUser(id);
            if(respuestaLibro ){
                this.data.splice(posicion, 1);
            }else{
            throw new Error('Error');
            }
        }else{
            throw new Error('Error');
        }
    }

    async changeUser(obj){
        let posicion = this.data.findIndex(user => user.id === obj.id);
        if(posicion == -1){
            throw new Error('Error');
        }else{
            let usuarioNuevo = new User(obj.id, obj.nick, obj.email,obj.password);
            let respuestaLibro = await api.changeDBUser(obj);
            if(respuestaLibro){
                this.data.splice(posicion, 1, usuarioNuevo);
            }else{
                throw new Error('Error');
            }
            
            return usuarioNuevo;
        }
    }

    toString(){
        let salida = "";

        this.data.forEach(user => salida += user.toString() + "\n\n");

        return salida;
    }


    async changeUserPassword(id,contraseña){
        let posicion = this.data.findIndex(user => user.id === id);
        let usuario = this.data.find(user => user.id === id);
        let respuestaLibro = await api.changeDBUserPassword(id, contraseña);
        if(usuario === undefined){
            throw new Error('Error');
            }else{
                let usuarioNuevo = new User(usuario.id, usuario.nick, usuario.email,contraseña);
            if(respuestaLibro){
                this.data.splice(posicion, 1, usuarioNuevo);
                return usuarioNuevo;
                
            }
        }
    }

    async getUserById(userId){
    let usuario = await api.getDBUser(userId);

    if(usuario !== false){
        let respuestaUser = new User (usuario.id, usuario.nick, usuario.eamil, usuario.password )
        return respuestaUser;
    }else{
    throw new Error('Error');
    }
}
 getUserIndexById(userId){
    let usuarioPosicionArray = this.data.findIndex(users => users.id === userId);
    if(usuarioPosicionArray == -1){
        throw new Error('Error');
    }else{
    return usuarioPosicionArray;
    }
}

getUserByNickName(nick){
    let usuarioConNick = this.data.find(users => users.nick === nick);

    if(!usuarioConNick){
        throw new Error('Error');
    }else{
        return usuarioConNick;
    }
}
// Añadir esto dentro de la clase Users
get users() {
    return this.data;
}
}