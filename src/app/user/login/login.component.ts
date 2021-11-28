import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServices } from 'src/app/services/user.services';
// import { AuthService } from '../../shared/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() registerAction = new EventEmitter();
  loginForm: FormGroup = new FormGroup({});
  hide = true;
  isLoginError = 0;
  constructor(
    private route: Router,
    private userService: UserServices,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public onSubmit(): void {

    this.userService.login(this.loginForm.value).subscribe(
      (res) => {
        let userData = this.userService.getDataFromStorage("userData");
        let objUser = {
          isLogin: res.isLogin
        }
        if (!userData && res.status == 200) {

          this.userService.addDataToStorage(objUser);
        }

        this.route.navigate(['dashboard']);
        const message = "LOGIN SUCCESSFULLY";
        const action = "DISMISS";
        this._snackBar.open(message, action, {
          verticalPosition: 'top',
          duration: 3000
        });
      },

      (error) => {
      //  console.log("ERROR", error)
        const message = "Something wrong with Email or Password plz check and try again!";
        const action = "DISMISS";
        this._snackBar.open(message, action, {
          verticalPosition: 'top',
          duration: 3000
        });
        this.isLoginError = error.error.isError;
      }

    );
  }

  register(): void {
    this.registerAction.emit(1);
  }
  onKeyUp() {
    this.isLoginError = 0;
  }
}
