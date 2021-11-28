import {  Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServices } from './services/user.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit  {
  title = 'My App';
  isLogin:boolean = false 
  constructor(
    private userService: UserServices,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {

  }
  ngOnInit() {
 
  }
  ngDoCheck(){
    if (!this.userService.getDataFromStorage("userData")) {
      this.isLogin = false;
    }else{
      this.isLogin = true;
    }
   
  }


  onDashboardClick() {
    if (!this.userService.getDataFromStorage("userData")) {
      this.isLogin = false;
      const message = "PLEASE LOGIN FOR VIEW DASHBOARD!";
      const action = "DISMISS";
      this._snackBar.open(message, action, {
        verticalPosition: 'top',
        duration: 3000
      });
    } else {
      this.isLogin=true;
      this.router.navigate(['dashboard']);
    }

  }
  onLogoutClick(){
    this.userService.clearStorageData("userData");
    this.isLogin= false;
    this.router.navigate(['']);
  }


}
