import { StoreCategory } from './../model/storeCategory';
import { Component,Input, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ApiResponse } from '../model/apiResponse';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-store-category',
  templateUrl: './store-category.component.html',
  styleUrls: ['./store-category.component.scss']
})
export class StoreCategoryComponent implements OnInit {


    private storeCategoryObservable : Observable<ApiResponse<StoreCategory[]>> ;
    storeCategories: StoreCategory[] = [];

    constructor(private service: DataService) {
      this.storeCategoryObservable= this.service.getStoreCategories();
    }

    ngOnInit(): void {
      this.getStoreCategories();

    }

    getStoreCategories() {
      this.storeCategoryObservable.subscribe(
        (res: ApiResponse<StoreCategory[]>) => {
          this.storeCategories = res.data;
        }
      );
    }

}
