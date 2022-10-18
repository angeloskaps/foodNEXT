export class ShoppingCartItem {

    id: Number;
    name?: String;
    imgUrl?:String;
    description?: String;
    cost?: number ;
    quantity?: number;

    constructor(id:Number){
      this.id = id;
    }

}
