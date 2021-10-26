import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const baseAPI = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {

  constructor(private http: HttpClient) { }

  loginUser(userData) {
    return this.http.post(baseAPI + '/auth/login', userData).pipe(
      catchError(error => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
              errorMsg = `Error: ${error.error.message}`;
          } else {
              errorMsg = error.error.message;
          }
          return throwError(errorMsg);
      })
  );;
  }
}
