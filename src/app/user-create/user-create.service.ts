import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const baseAPI = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserCreateService {

  constructor(private http: HttpClient) { }

  userInsert(userData) {
    return this.http.post(baseAPI + '/user', userData);
  }
}
