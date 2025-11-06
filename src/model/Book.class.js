export default class Book{
    constructor(obj){
        this.id = obj.id;
        this.userId = obj.userId;
        this.moduleCode = obj.moduleCode;
        this.publisher = obj.publisher;
        this.price = obj.price;
        this.pages = obj.pages;
        this.status = obj.status;
        this.photo = obj.photo || '';
        this.comments = obj.comments || '';
        this.soldDate = obj.soldDate || '';

    }

   toString() {
        return "ID: " + this.id + 
        "\nUserID: " + this.userId + 
        "\nModule Code: " + this.moduleCode + 
        "\nPublisher: " + this.publisher + 
        "\nPrice: " + this.price + 
        "\nPages: " + this.pages + 
        "\nStatus: " + this.status + 
        "\nPhoto: " + this.photo + 
        "\nComments: " + this.comments + 
        "Sold date: " + this.soldDate;
    }

    getID(){
        return this.id;
    }
}