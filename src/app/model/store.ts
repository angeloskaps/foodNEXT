import { StoreCategory } from './storeCategory';
export class Store {

  id?: Number;
  storeCategory: StoreCategory= new StoreCategory();
  name?: String;
  address?: String;
  productList?: any[];
  imgUrl?:String;
}
