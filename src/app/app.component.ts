import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

import { PostData } from './post-data.model';
import {PostsService} from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: PostData[] = [];
  isFetching = false;
  error = null;
  private errorSubscription: Subscription;

  constructor(private httpClient: HttpClient,
              private postsService: PostsService) {}

  ngOnInit() {
    this.errorSubscription = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.fetchPosts();
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  onCreatePost(form: NgForm) {
    const postData: PostData = {
      title: form.value.title,
      content: form.value.content
    };

    this.postsService.createAndStorePost(postData.title, postData.content);
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
      this.error = null;
      this.loadedPosts = posts;
      this.isFetching = false;
    }, (error: HttpErrorResponse) => {
      this.error = error.message;
    });
  }

  trackByKey(index: number, item: PostData) {
    return item.id;
  }
}
