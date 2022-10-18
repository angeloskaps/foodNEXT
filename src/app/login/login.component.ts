
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //Form Validables
  registerForm: any = FormGroup;
  submitted = false;
  username: string = "";
  password: string = "";
  title = 'auth-guard-demo';

  constructor(
    private formBuilder: FormBuilder,
    private _auth: AuthenticationService,
    private _router: Router
  ) {
    if (this._auth.loggedIn) {
      this._router.navigate(['home']);
    }
  }

  login(): void {
    if (this.username != '' && this.password != '') {
      if (this._auth.login(this.username, this.password)) {
        this._router.navigate(["home"]);
      }
      else
        alert("Wrong username or password");
    }
  }

  //Add user form actions
  get f() { return this.registerForm.controls; }
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //True if all the fields are filled
    // if(this.submitted)
    // {
    //   alert("Great!!");
    // }

  }
  //login form
  ngOnInit(): void {
    //login form
    //Add User form validations
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}


export class LoginComponent1 {


  constructor(private _auth: AuthenticationService, private _router: Router) {

  }


}
