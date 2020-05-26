import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Subject, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {PostData} from './post-data.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseURL = 'https://angular-complete-guide-ca57c.firebaseio.com/';
  private postsURL = this.baseURL + 'posts.json';
  error = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: PostData = {
      title: title,
      content: content
    };

    this.httpClient
      .post<{ name: string }>(
        this.postsURL,
        postData)
      .subscribe(responseData => {
          console.log(responseData);
      }, (error: HttpErrorResponse) => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    return this.httpClient
      .get<{ [key: string]: PostData }>(
        this.postsURL
      )
      .pipe(
        map(responseData => {
          const postsArray: PostData[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorResponse => {
          return throwError(errorResponse);
        })
      );
  }

  clearPosts() {
    return this.httpClient.delete(this.postsURL);
  }
}
