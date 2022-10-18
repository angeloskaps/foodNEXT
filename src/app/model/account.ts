import { Address } from './address';
export class Account{

  id: Number;
  username?:String;
  password?:String;
  email?:String;
  phone?:String;
  addressList?: Address[];
  fname?:String;
  lname?:String;
  age!:Number;

 constructor(id:Number){
    this.id = id;
  }
}
