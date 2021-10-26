import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { LoginFormService } from './login-form.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginFormGroup: FormGroup;
  submitted: boolean = false;
  isError: boolean = false;
  errorMessage: any;
  constructor(private router: Router, private _formBuilder: FormBuilder,
    private loginFormService: LoginFormService) {
    sessionStorage.clear();
    this.loginFormGroup = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  get f() { return this.loginFormGroup.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }
    this.loginFormService.loginUser(this.loginFormGroup.value).pipe(
      catchError(error => {
          if (error.error instanceof ErrorEvent) {
              this.isError = true;
              this.errorMessage = `Error: ${error}`;
          } else {
              this.isError = true;
              this.errorMessage = `Error: ${error}`;
          }
          return of([]);
      })
  ).subscribe((response:any) => {
      if (response.data && response.data.token) {
        sessionStorage.setItem('token',response.data.token);
        this.router.navigate([`/user-list`]);
      }
    })
  }
}
