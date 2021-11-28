import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServices } from 'src/app/services/user.services';


import { checkPassword } from 'src/app/validators/custom-validators';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Output() loginAction = new EventEmitter();
  registrationForm: FormGroup = new FormGroup({});
  hide: boolean = true;
  isEmailRegister = 0;
  errEmaliregister = "";
  constructor(
    public route: Router,
    public userService: UserServices,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registrationForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
    }, { validator: checkPassword })
  }

  onSubmit(): void {

    this.userService.signup(this.registrationForm.value).subscribe(
      (res) => {
        this.route.navigate(['login']);
        let message = "REGISTERED SUCCESSFULLY"
        let action = "DISMISS"
        this._snackBar.open(message, action, {
          verticalPosition: 'top',
          duration: 3000
        })
      },
      (error) => {
        this.isEmailRegister = error.error.isUerExist;
        this.errEmaliregister = error.error.message;

      }
    )


  }

  login(): void {
    this.loginAction.emit(0)
  }

  onKeyUp(){
    this.isEmailRegister = 0;
  }
}
