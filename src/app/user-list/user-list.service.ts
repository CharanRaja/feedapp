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

  getAllUsers() {
    return this.http.get(baseAPI + '/user', {});
  }

  deleteUser(userId) {
    return this.http.delete(baseAPI + '/user/' + userId);
  }
}
