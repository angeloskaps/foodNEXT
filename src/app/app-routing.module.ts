import { SignupComponent } from './signup/signup.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';
import { HeroComponent } from './hero/hero.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AboutComponent } from './about/about.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreCategoryComponent } from './store-category/store-category.component';
import { StoresComponent } from './stores/stores.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from './service/auth-guard.service';

const routes: Routes = [
  { path: 'products/:storeId' , component: ProductComponent},
  { path: 'stores/:storeCategoryId' , component: StoresComponent},
  { path: 'shopping-cart' , component: ShoppingCartComponent},
  { path: 'home/categories' , component: StoreCategoryComponent},
  { path: 'about' , component: AboutComponent},
  { path: 'service' , component: DeliveryComponent},
  { path: 'footer' , component: FooterComponent},
  { path: 'header' , component: HeaderComponent},
  { path: 'hero' , component: HeroComponent},
  // { path: 'home' , component: HomeComponent},
  // { path: '**' , component: HomeComponent},
  // { path: '', component: LoginComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path: 'checkout', component: CheckoutComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const  routingComponents =[ ProductComponent,StoresComponent,ShoppingCartComponent, StoreCategoryComponent,AboutComponent,DeliveryComponent,FooterComponent,HeaderComponent,HeroComponent, SignupComponent, CheckoutComponent, ForgotPasswordComponent]


