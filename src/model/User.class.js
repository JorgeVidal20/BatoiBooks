export default class User{
    constructor(id,nick,email,password){
        this.id = id;
        this.email = email;
        this.nick = nick;
        this.password = password;
    }

    toString(){
        return this.id + this.email + this.nick + this.password
    }
}