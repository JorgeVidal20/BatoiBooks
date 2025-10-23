import Module from './Module.class.js'

const NOTES = 'Apunts'
let NexId = 1;

export default class Modules{

constructor(){
    this.data = [];
}

populate(data){
    const modulesArray = Array.isArray(data) ? data : data?.modules || [];
        this.data = modulesArray.map(item => new Module(item))
        const maxId = this.data.reduce((max, item) => item.id > max ? item.id : max , 0);
        nextId = maxId + 1
    }

    toString(){
        let salida = "";

        this.data.forEach(module => salida += module.toString() + "\n\n");

        return salida;
    }

     getModuleByCode( moduleCode){
    let modulo = this.data.find(modules => modules.code == moduleCode);

    if(!modulo){
        throw new Error('Error');
    }else{
        return modulo;
    }
}
}
