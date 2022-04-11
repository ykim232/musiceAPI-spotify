/*********************************************************************************
* WEB422 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Yuli Kim            Student ID: 160437174          Date: Mar 09, 2022
*
********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web422-a6';
  searchString: string | undefined;
  token: any;

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { 
        this.token = this.authService.readToken();
      }
    });
  }

  handleSearch(): void {
      this.router.navigate(['/search'], {queryParams: {q: this.searchString}});
      this.searchString = ""; 
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
