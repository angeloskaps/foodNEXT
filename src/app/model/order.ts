import { Account } from './account';
export class Order {

  id: Number;
  selectedAddressId:Number;
  account:Account;
  date:Date;
  cost:Number;
  orderItemsList:any[];
  paymentMethod:String;

  constructor(id:Number){
    this.id = id;
  }
}
