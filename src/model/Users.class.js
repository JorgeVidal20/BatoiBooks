import User from './User.class.js'

const NOTES = 'Apunts'
let nextId = 1;

export default class Users{
    constructor (){
        this.data = [];
    }
    
    populate(data){
        const userArray = Array.isArray(data) ? data : data?.user || [];
            this.data = userArray.map(item => new User(item))
            const maxId = this.data.reduce((max, item) => item.id > max ? item.id : max , 0);
            nextId = maxId + 1;
        }

    addUser(obj){
        let nuevoUsuario = new User(obj.id,obj.nick,obj.email,obj.password);
        if(obj.id === undefined && this.data.length === 0) {
            nuevoUsuario.id = 1;
        }else{
            obj.id = nextId;
        }
        this.data.push(nuevoUsuario);
        return nuevoUsuario;
    }

    removeUser(id){
        let posicion = this.data.findIndex(user => user.id === id);
        if(posicion != -1){
            this.data.splice(posicion, 1);
        }else{
            throw new Error('Error');
        }
    }

    changeUser(obj){
        let posicion = this.data.findIndex(user => user.id === obj.id);
        if(posicion == -1){
            throw new Error('Error');
        }else{
            let usuarioNuevo = new User(obj.id, obj.email, obj.nick,obj.password);
            this.data.splice(posicion, 1, usuarioNuevo);
        }
    }

    toString(){
        let salida = "";

        this.data.forEach(user => salida += user.toString() + "\n\n");

        return salida;
    }

     getUserById(userId){
    let usuarioId = this.data.find(users => users.id === userId);

    if(!usuarioId){
        throw new Error('Error');
    }else{
    return usuarioId;
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
}