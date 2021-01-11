import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const baseAPI = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FeedsListService {

  constructor(private http: HttpClient) { }


  getFeeds(userId) {
    const params = new HttpParams()
      .set("user_id", userId)
    return this.http.get(baseAPI + '/feeds', { params });
  }

  filterFeedsList(event, userId) {
    const params = new HttpParams()
      .set("feedsSearch", event)
      .set("user_id", userId)
    return this.http.get(baseAPI + '/filterByFeeds', { params });
  }

}
