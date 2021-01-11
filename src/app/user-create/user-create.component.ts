import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCreateService } from './user-create.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userFormGroup: FormGroup;
  submitted: boolean = false;

  constructor(private _formBuilder: FormBuilder, private router: Router, private userCreateService: UserCreateService) {
    this.userFormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      email_id: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      mobile: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      gender: ['', [Validators.required]],
    });
  }
  ngOnInit() {
  }

  get f() { return this.userFormGroup.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.userFormGroup.invalid) {
      return;
    }
    this.userCreateService.userInsert(this.userFormGroup.value).subscribe(data => {
      this.router.navigate([`/user-list`]);
    })
  }
}
