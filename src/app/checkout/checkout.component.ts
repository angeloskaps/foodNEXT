import { CartService } from './../service/cart.service';
import { Address } from './../model/address';
import { Product } from './../model/product';
import { Account } from './../model/account';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../model/apiResponse';
import { ShoppingCart } from '../model/shopping-cart';
import { DataService } from '../service/data.service';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Order } from '../model/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  myCart: ShoppingCart = new ShoppingCart(-1);
  account: Account = new Account(2);
  accountId: String = '2';
  order : Order = new Order(1);

  constructor(private service: DataService, private cartService: CartService,
     public router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getAccountById(this.accountId);
    this.loadCart();
  }

  loadCart() {
    this.myCart= this.cartService.getCart();

  }


  getAccountById(id: String) {
    this.service.getAccountById(id).subscribe(
      (res: ApiResponse<Account>) => {
        this.account = res.data;
      }
    );
  }

  placeOrder(){
    let myCart = this.cartService.getCart();
    let order = {
      // orderId:this.order.id,
      account: this.account,
      selectedAddressId: this.account.addressList[0].id,
      storeId: this.myCart.storeId,
      submitDate: Date.now(),
      cost: myCart.totalPrice,
      orderItems: myCart.items,
      paymentMethod: 'CASH'
    }

    this.service.postOrder(order).subscribe(
      (res: ApiResponse<Order>) => {
        this.order= res.data;
        console.log(res);

      }
    );

  }






}

