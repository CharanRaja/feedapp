import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const baseAPI = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private http: HttpClient) { }

  getUsers(userId) {
    const params = new HttpParams()
      .set("user_id", userId)
    return this.http.get(baseAPI + '/users', { params });
  }

  followUser(userList) {
    return this.http.post(baseAPI + '/followUser', userList);
  }

  filterUserList(userSearch, userId) {
    const params = new HttpParams()
      .set("userName", userSearch)
      .set("user_id", userId)
    return this.http.get(baseAPI + '/filterByUser', { params });
  }
}
