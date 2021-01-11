import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  constructor(private userListService: UserListService,) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.getUserList(this.userId);
  }

  getUserList(userId) {
    this.userListService.getUsers(userId).subscribe((data: any) => {
      data.map((list) => {
        if (list.followed.length > 0) {
          list.followed.map((value) => {
            list.isFollowed = (value.follows == this.userId) ? true : false;
          })
        } else {
          list.isFollowed = false;
        }
      })
      this.userData = data;
    });
  }

  followUsers(item, data) {
    let userDetails = {
      'follower_userId': item._id,
      'current_userId': this.userId,
      'followed': (data === true) ? true : false
    }
    this.userListService.followUser(userDetails).subscribe((list: any) => {
      if (data) {
        alert('This User has been followed')
      } else {
        alert('This User has been Unfollowed')
      }
      this.getUserList(this.userId);
    });
  }

  userSearch(event) {
    if (event.length > 2) {
      this.userListService.filterUserList(event, this.userId).subscribe((data: any[]) => {
        this.userData = data;
      })
    } else if (event.length == 0) {
      this.getUserList(this.userId);
    }
  }

}
