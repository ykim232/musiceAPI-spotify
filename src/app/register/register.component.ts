import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { RegisterUser } from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser:RegisterUser = new RegisterUser();
  warning: any;
  success = false;
  loading = false;

  registerSub: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {}

  onSubmit(f: NgForm): void{
    if(this.registerUser.userName.length > 0 && this.registerUser.password.length > 0 && this.registerUser.password2.length > 0) {
      this.loading = true;
      this.registerSub =  this.auth.register(this.registerUser).subscribe(
        success => {
          this.warning = null;
          this.success = true;
          this.auth.setToken(success.token);
          this.loading = false;
        }, err => {
          this.warning = err.error.message;
          this.success = false;
          this.loading = false;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.registerSub && this.registerSub.unsubscribe();
  }

}