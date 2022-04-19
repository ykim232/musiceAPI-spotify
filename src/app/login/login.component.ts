import { Component, OnInit } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();
  warning: any;
  loading = false;
  authLogin: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(f: NgForm): void {
    if(this.user.userName.length > 0 && this.user.password.length > 0) {
      this.loading = true;

      this.authLogin = this.auth.login(this.user).subscribe(
        success => {
          this.loading = false;

          this.auth.setToken(success.token);
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
    this.authLogin && this.authLogin.unsubscribe();
  }
}