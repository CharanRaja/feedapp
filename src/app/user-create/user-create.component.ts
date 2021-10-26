import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCreateService } from './user-create.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userFormGroup: FormGroup;
  submitted: boolean = false;
  userId: any;

  constructor(private _formBuilder: FormBuilder, private router: Router, private userCreateService: UserCreateService, private route: ActivatedRoute,
  ) {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate([`/login-form`]);
      return;
    }
    this.userFormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      id: [null],
    });
    this.route.queryParams.subscribe(params => {
      this.userId = params['Id'];
      if (this.userId) {
        this.userCreateService.getUserById(this.userId).subscribe((response: any) => {
          this.userFormGroup.get("id").setValue(response.data.user._id);
          this.userFormGroup.get("name").setValue(response.data.user.name);
          this.userFormGroup.get("phoneNumber").setValue(response.data.user.phoneNumber);
          this.userFormGroup.get("state").setValue(response.data.user.state);
          this.userFormGroup.get("city").setValue(response.data.user.city);
          this.userFormGroup.get("address").setValue(response.data.user.address);
        })
      }
    })
  }
  ngOnInit() {
  }

  get f() { return this.userFormGroup.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.userFormGroup.invalid) {
      return;
    }
    if (this.userId) {
      this.userCreateService.userUpdate(this.userFormGroup.value).subscribe(data => {
        if (data) {
          this.router.navigate([`/user-list`]);
        }
      })
    } else {
      this.userCreateService.userInsert(this.userFormGroup.value).subscribe(data => {
        if (data) {
          this.router.navigate([`/user-list`]);
        }
      })
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate([`/login-form`]);
  }
}
