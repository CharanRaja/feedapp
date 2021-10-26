import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UserListService } from './user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userData: any[] = [];
  userId: string;
  userList = new FormControl(null);

  constructor(private userListService: UserListService, private router: Router) { 
    if (!sessionStorage.getItem('token')) {
      this.router.navigate([`/login-form`]);
      return;
    }
  }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.getUserList();
  }

  getUserList() {
    this.userListService.getAllUsers().subscribe((response: any) => {
      this.userData = response.data.user;
    });
  }

  editUser(value) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        Id: value._id,
      },
    };
    this.router.navigate(["/user-create"], navigationExtras);
  }

  deleteUser(value) {
    this.userListService.deleteUser(value._id).subscribe((response: any) => {
      if(response.success) {
        this.getUserList();
      }
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate([`/login-form`]);
  }
}
