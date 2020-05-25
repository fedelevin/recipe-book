import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostData } from './post-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private baseURL = 'https://angular-complete-guide-ca57c.firebaseio.com/';
  private postsURL = this.baseURL + 'posts.json';
  loadedPosts: PostData[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: PostData) {
    // Send Http request
    this.httpClient
      .post<{ name: string }>(
        this.postsURL,
        postData
      )
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

  private fetchPosts() {
    // Send Http request
    this.httpClient
      .get<{ [key: string]: PostData }>(this.postsURL)
      .pipe(
        map(responseData => {
          const postsArray: PostData[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({...responseData[key], id: key});
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => {
        this.loadedPosts = posts;
      });
  }

  trackByKey(index: number, item: PostData) {
    return item.id;
  }
}
