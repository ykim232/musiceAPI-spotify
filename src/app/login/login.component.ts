import { Component, OnInit } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    userName:"",
    password: "",
    _id: ""
  }
  warning: any;
  loading = false;

  loginSub: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(): void {
    if(this.user.userName.length > 0 && this.user.password.length > 0) {
      this.loading = true;
      this.loginSub = this.authService.login(this.user).subscribe(
        success => {
          this.loading = false;
          localStorage.setItem("access_token", success.token);
          this.router.navigate(['/newReleases']);
        },
        err => {
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.loginSub && this.loginSub.unsubscribe();
  }
}