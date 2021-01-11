import { Component, OnInit } from '@angular/core';
import { FeedsListService } from './feeds-list.service';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-feeds-list',
  templateUrl: './feeds-list.component.html',
  styleUrls: ['./feeds-list.component.scss']
})
export class FeedsListComponent implements OnInit {
  feedData: any[] = [];
  userId: string;

  constructor(private feedsListService: FeedsListService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.getFeedList(this.userId);
  }

  getFeedList(userId) {
    this.feedsListService.getFeeds(userId).subscribe((data: any) => {
      this.feedData = [];
      data.map(list => {
        list.data.map((item) => {
          this.feedData.push(item);
        })
      })
    });
  }

  feedsSearch(event) {
    if (event.length > 2) {
      this.feedsListService.filterFeedsList(event, this.userId).pipe(debounceTime(1000)).subscribe((data: any[]) => {
        this.feedData = [];
        data.map(list => {
          list.data.map((item) => {
            this.feedData.push(item);
          })
        })
      })
    } else if (event.length == 0) {
      this.getFeedList(this.userId);
    }
  }
}
