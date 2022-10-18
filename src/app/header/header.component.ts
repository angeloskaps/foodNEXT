import { CartService } from './../service/cart.service';
import { Store } from './../model/store';
import { DataService } from './../service/data.service';
import { ShoppingCart } from './../model/shopping-cart';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../model/apiResponse';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchText = '';
  myCart: ShoppingCart = new ShoppingCart(-1);
  stores: Store[] = [];
  selectedStore?: Store;

  constructor(private service: DataService,
              private router: Router,
              private cartService: CartService,
              private authenticationService: AuthenticationService) {
      }

  ngOnInit() {
    this.myCart = this.cartService.getCart();
  }

  getStoreByStoreName(name: any) {
    this.service.getStoresByName(name).subscribe(
      (res: ApiResponse<Store[]>) => {
        this.stores = res.data;

      }
    );
  }

  navigateToStore() {
    if (this.selectedStore) {
      this.router.navigateByUrl('/products/' + this.selectedStore)
      // console.log(this.selectedStore)
    }
  }
  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}
