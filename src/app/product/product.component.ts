import { ShoppingCartItem } from './../model/shopping-cart-item';
import { CartService } from './../service/cart.service';
import { ShoppingCart } from './../model/shopping-cart';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { ApiResponse } from '../model/apiResponse';
import { Product } from '../model/product';
import { DataService } from '../service/data.service';
import { Store } from '../model/store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input()

  products: Product[] = [];
  storeId: number;
  myCart: ShoppingCart = new ShoppingCart(-1);
  store: Store = new Store();
  cartEmpty = false;

  constructor(private service: DataService,
    private route: ActivatedRoute,
    public router: Router,
    private cartService: CartService){

    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('storeId');
    this.storeId = id ? +id : -1;
    this.getProducts(this.storeId);
    this.initCart();
    this.getStore(this.storeId.toString());
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    this.myCart = this.cartService.getCart();
  }

  removeFromCart(product){
    let item = this.myCart.convertProductToCartItem(product);
    this.cartService.reduceQuantityOrRemoveFromCart(item);
    this.myCart = this.cartService.getCart();
  }

  initCart(){
    let existingCart = this.cartService.getCart();
    if(existingCart.storeId == this.storeId){
      //if store hasn't changed, get cart of localstorage
      this.myCart = existingCart;
    }else{
      //if store changed, then create new cart
      this.myCart = this.cartService.initCart(this.storeId);
    }
  }



  getProducts(id: number) {
    this.service.getProductsByStoreId(id.toString()).subscribe(
      (res: ApiResponse<Product[]>) => {
        this.products = res.data;
      }
    );
  }

  getStore(id: String) {
    this.service.getStoreById(id).subscribe(
      (res: ApiResponse<Store>) => {
        this.store = res.data;
      }
    );
  }


}
