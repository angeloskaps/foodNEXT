export class Product {

  id: Number;
  name?: String;
  imgUrl?:String;
  description?: String;
  productCategory?: String;
  price?:number;
  store?:String;

  constructor(id:Number){
    this.id = id;
  }
}
