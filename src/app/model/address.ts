
export class Address {

  id: Number;
  state?:String;
  city?:String;
  streetName?:String;
  streetNumber?:Number;
  postalCode?:Number;
  floor?:Number;
  doorbell?:String;


  constructor(id:Number){
    this.id = id;
  }
}
