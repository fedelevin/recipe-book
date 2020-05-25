import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PostData } from './post-data.model';
import {PostsService} from './posts.service';
import {NgForm} from '@angular/forms';

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

  onCreatePost(form: NgForm) {
    const postData: PostData = {
      title: form.value.title,
      content: form.value.content
    };

    this.postsService.createAndStorePost(postData.title, postData.content)
      .subscribe(responseData => {
        if (responseData) {
          this.fetchPosts();
          form.reset();
        }
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postsService.clearPosts().subscribe(() => {
      this.fetchPosts();
    });
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
