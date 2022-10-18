import { StoreCategory } from './../model/storeCategory';
import { DataService } from './../service/data.service';
import { Component, Input, OnInit } from '@angular/core';
import { Event, ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/apiResponse';
import { Store } from '../model/store';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  @Input()
  stores: Store[] = [];
  storeCategoryId: String  = '';
  storeCategory:StoreCategory  = new StoreCategory();

  constructor(private service: DataService, private route: ActivatedRoute,
     public router:Router) {
    this.router.events.subscribe((e:Event) =>{
      if (e instanceof NavigationEnd){
        // console.log(e);
        let id = this.route.snapshot.paramMap.get('storeCategoryId');
        // console.log(id);
        this.storeCategoryId = id?id:'';
        this.getStores(this.storeCategoryId);
      }
    });
  }


  ngOnInit(): void {
       // console.log(e);
       let id = this.route.snapshot.paramMap.get('storeCategoryId');
       // console.log(id);
       this.storeCategoryId = id?id:'';
       this.getStores(this.storeCategoryId);
       this.getCategory(this.storeCategoryId);
   }

   getCategory(id:String){
    this.service.getCategoryById(id).subscribe(
      (res: ApiResponse<StoreCategory>) =>{
        this.storeCategory = res.data;
      }
    );
   }


   getStores(id:String) {
    this.service.getStoresByStoreCategoryId(id).subscribe(
      (res: ApiResponse<Store[]>) => {
        this.stores = res.data;
      }
    );
  }
}
