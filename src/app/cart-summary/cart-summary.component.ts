import { Component, OnInit } from '@angular/core';

import { CartService } from './../service/cart.service';
import { ShoppingCartItem } from './../model/shopping-cart-item';
import { DataService } from './../service/data.service';
import { ShoppingCart } from '../model/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  myCart: ShoppingCart = new ShoppingCart(-1);
  cartEmpty = false;

  constructor(private service: DataService, public cartService:CartService) {
  }

  ngOnInit(){
    this.loadCart();

    this.showQuickCheckout();
  }

  showQuickCheckout(){
    if (this.myCart.calculateTotalCartItems() > 0){
        this.cartEmpty=true;
    }
  }

  loadCart() {
    let cart: ShoppingCart = this.service.loadFromStorage<ShoppingCart>('myCart');
    if (cart && cart.storeId != -1) {
      this.myCart.storeId = cart.storeId;
      this.myCart.items = cart.items;
    }
  }

  clearCart() {
    this.service.removeFromStorage('myCart');
    this.myCart = this.cartService.getCart();
  }

  reduceQuantityOrRemoveCartItem(item: ShoppingCartItem){
      this.cartService.reduceQuantityOrRemoveFromCart(item);
      this.myCart = this.cartService.getCart();
 }

  addToCart(product) {
    this.cartService.addToCart(product);
    this.myCart = this.cartService.getCart();
  }

}
