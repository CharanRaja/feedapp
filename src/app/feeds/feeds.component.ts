import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedsService } from './feeds.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  feedPost: FormGroup;
  submitted: boolean = false;
  constructor(private _formBuilder: FormBuilder, private feedsService: FeedsService, private router: Router) {
    this.feedPost = this._formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      uploadedBy: [localStorage.getItem('user_id')]
    });
  }

  ngOnInit() {
  }

  get f() { return this.feedPost.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.feedPost.invalid) {
      return;
    }
    this.feedsService.feedPost(this.feedPost.value).subscribe(data => {
      this.router.navigate([`/feeds-list`]);
    })
  }

}
