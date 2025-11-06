import Module from './Module.class.js'
import * as api from '../services/api.js'


export default class Modules{

constructor(){
    this.data = [];
    this.nextId = 1;
}

 async populate(){
    //const modulesArray = Array.isArray(data) ? data : data?.modules || [];

        let modulos =  await api.getDBModules();
        this.data = modulos.map(item => new Module(item.code, item.cliteral, item.vliteral, item.courseId));
        const maxId = this.data.reduce((max, item) => item.code > max ? item.code : max , 0);
        this.nextId = maxId + 1
    }

    toString(){
        let salida = "";

        this.data.forEach(module => salida += module.toString() + "\n\n");

        return salida;
    }

    getModuleByCode(moduleCode){
    let modulo = this.data.find(modules => modules.code == moduleCode);

    if(!modulo){
        throw new Error('Error');
    }else{
        return modulo;
    }
}
}
