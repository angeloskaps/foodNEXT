import { Order } from './../model/order';
import { ShoppingCartItem } from './../model/shopping-cart-item';
import { ShoppingCart } from './../model/shopping-cart';
import { StoreCategory } from './../model/storeCategory';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../model/apiResponse';
import { Store } from '../model/store';
import { Product } from '../model/product';
import { Address } from '../model/address';
import { Account } from '../model/account';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  baseUrl: String = 'http://localhost:8080';

  getProductsByStoreId(storeId:String ): Observable<ApiResponse<Product[]>>{

    return this.http.get<ApiResponse<Product[]>>(this.baseUrl + '/stores/products-by-store?storeId='+ storeId)
  }

  getStoreById(storeId:String): Observable<ApiResponse<Store>>{
    return this.http.get<ApiResponse<Store>>(this.baseUrl +'/stores/store-by-storeid?storeId='+ storeId)
  }

  getAccountById(accountId:String): Observable<ApiResponse<Account>>{
    return this.http.get<ApiResponse<Account>>(this.baseUrl +'/accounts/account-by-accountId?accountId='+ accountId)
  }

  getCategoryById(categoryId:String): Observable<ApiResponse<StoreCategory>>{
    return this.http.get<ApiResponse<StoreCategory>>(this.baseUrl +'/categories/category-by-categoryId?categoryId='+ categoryId)
  }

  getStoresByStoreCategoryId(storeCategoryId:String ): Observable<ApiResponse<Store[]>>{

    return this.http.get<ApiResponse<Store[]>>(this.baseUrl + '/stores/store-by-category?storeCategoryId='+ storeCategoryId)
  }


  getStoresByName(storename:String): Observable<ApiResponse<Store[]>>{
    return this.http.get<ApiResponse<Store[]>>(this.baseUrl + '/stores/stores-by-name?storeName='+ storename);
  }

  getStoreCategories(): Observable<ApiResponse<StoreCategory[]>> {
    return this.http.get<ApiResponse<StoreCategory[]>>(this.baseUrl + '/categories');
  }

  loadFromStorage<T>(key: string): T {
    const storedValue = localStorage.getItem(key) as string;
    return JSON.parse(storedValue);
  }

  saveToStorage(key: string, value: any){
    localStorage.setItem(key,  JSON.stringify(value));
  }

  removeFromStorage<T>(key: string){
    localStorage.removeItem(key);

  }

  postOrder(order): Observable<ApiResponse<Order>>{
    return this.http.post<ApiResponse<Order>>(this.baseUrl + '/orders/checkout',order);
  }

}
