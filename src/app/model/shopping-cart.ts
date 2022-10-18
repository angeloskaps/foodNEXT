import { CartService } from './../service/cart.service';
import { Product } from './product'
import { ShoppingCartItem } from './shopping-cart-item'

export class ShoppingCart {

  items: ShoppingCartItem[] = [];
  storeId: number;

  constructor(storeId: number) {
    this.storeId = storeId;
  }

  addItem(product: Product): void {

    let itemQuantity = this.calculateProductQuantity(product.id);
    if (itemQuantity === 0) {
      let item: ShoppingCartItem = this.convertProductToCartItem(product);
      item.quantity = 1;
      this.items.push(item);
    } else {
      let selectedItem = this.items.find(item => item.id === product.id);
      let index = selectedItem ? this.items.indexOf(selectedItem) : -1;
      if (index != -1) {
        if (selectedItem) {
          let newItem: ShoppingCartItem = new ShoppingCartItem(selectedItem.id);
          newItem.description = selectedItem.description;
          newItem.name = selectedItem.name;
          newItem.imgUrl = selectedItem.imgUrl;
          newItem.cost = selectedItem.cost;
          newItem.quantity = selectedItem.quantity ? selectedItem.quantity + 1 : 1;
          this.items[index] = newItem;
        }
      }
    }
  }

  reduceQuantityOrRemoveItem(item:ShoppingCartItem): void{

    const index =this.items.findIndex(it => it.id==item.id);
    if(index > -1){
      if(this.items[index].quantity > 1){
        this.items[index].quantity--;
      }else {
        this.items.splice(index, 1);
      }
    }
  }


  convertProductToCartItem(product: Product): ShoppingCartItem {
    let item: ShoppingCartItem = new ShoppingCartItem(product.id);
    item.id = product.id;
    item.name = product.name;
    item.imgUrl = product.imgUrl;
    item.description = product.description;
    item.cost = product.price;

    return item;
  }

  calculateProductQuantity(id: Number): number {
    let numOfSameProducts: number = 0;
    this.items.forEach((item) => {
      if (item.id === id) {
        numOfSameProducts++;
      }
    });
    return numOfSameProducts;
  }


  calculateTotalCartItems(): number {
    let count: number = 0;
    this.items.forEach(item => {
      if (item.quantity) count += item.quantity;
    });
    return count;
  }


  get totalPrice() {
    let sum = 0;
    this.items.forEach(item => {
      if (item.quantity && item.cost) sum += item.quantity * item.cost;
    });
    return sum;
  }

  getItemQuantityById(productId: Number): number{
    const index = this.items.findIndex( it => it.id == productId);
    if(index > -1){
      return this.items[index].quantity;
    }else {
      return 0;
    }

  }
}
