import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PostData } from './post-data.model';
import {PostsService} from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: PostData[] = [];
  isFetching = false;

  constructor(private httpClient: HttpClient,
              private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: PostData) {
    this.postsService.createAndStorePost(postData.title, postData.content)
      .subscribe(responseData => {
        if (responseData) {
          this.fetchPosts();
        }
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  fetchPosts() {
    this.isFetching = true;

    this.postsService.fetchPosts().subscribe(posts => {
      this.loadedPosts = posts;
      this.isFetching = false;
    })
  }

  trackByKey(index: number, item: PostData) {
    return item.id;
  }
}
