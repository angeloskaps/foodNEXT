import { ShoppingCartItem } from './../model/shopping-cart-item';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { take, map } from 'rxjs/operators';
import { Product } from '../model/product';
import { ShoppingCart } from '../model/shopping-cart';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';

@Injectable({
  providedIn: 'root',
})
export class CartService {


  private cartSubject = new BehaviorSubject<ShoppingCart>(new ShoppingCart(-1));
  cart$ = this.cartSubject.asObservable();
  myCart:ShoppingCart = new ShoppingCart(-1);
  constructor(private service: DataService) {

    this.myCart =this.getCart();
    this.cartSubject.next(this.myCart);
  }


  addToCart(product: Product) {
    this.cart$.pipe(
      take(1),
      map((cart) => {
        cart.addItem(product);
        this.service.saveToStorage('myCart', cart);
      }),
    ).subscribe();
  }

  reduceQuantityOrRemoveFromCart(cartItem:ShoppingCartItem){
       this.cart$.pipe(
      take(1),
      map((cart) => {
        cart.reduceQuantityOrRemoveItem(cartItem);
        this.service.saveToStorage('myCart', cart);
      }),
    ).subscribe();
  }


  getCart() {
    let cart: ShoppingCart = this.service.loadFromStorage<ShoppingCart>('myCart');
    if (cart) {
      this.myCart.storeId = cart.storeId;
      this.myCart.items = cart.items;
    } else{
      this.myCart = this.initCart(-1);
    }
    return this.myCart;
  }

  initCart(storeId: number){
    let cart = new ShoppingCart(storeId);
    cart.items = [];
    this.service.saveToStorage('myCart', cart);
    return cart;
  }

  clearCart(){
    this.service.removeFromStorage('myCart');
    this.initCart(-1);
  }
}
