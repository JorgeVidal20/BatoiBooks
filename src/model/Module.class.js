export default class Module{
    constructor(code,cliteral,viteral,courseld){
        this.code = code;
        this.cliteral = cliteral;
        this.viteral = viteral;
        this.courseld = courseld;
    }
    
    toString(){
        return this.code + this.cliteral + this.courseld
        + this.viteral + this.courseld
    }
}