import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface PostData {
  title: string;
  content: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private baseURL = 'https://angular-complete-guide-ca57c.firebaseio.com/';
  private postsURL = this.baseURL + 'posts.json';
  loadedPosts = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: PostData) {
    // Send Http request
    this.httpClient.post(
      this.postsURL,
      postData
    ).subscribe(responseData => {
      console.log(responseData);
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
    this.httpClient.get(
      this.postsURL
    ).subscribe(responseData => {
      console.log(responseData);
    });
  }
}
