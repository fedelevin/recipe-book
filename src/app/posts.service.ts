import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

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
        postData,
        {
          observe: 'response'
        }
      )
      .subscribe(responseData => {
          console.log(responseData);
      }, (error: HttpErrorResponse) => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');

    return this.httpClient
      .get<{ [key: string]: PostData }>(
        this.postsURL,
        {
          headers: new HttpHeaders({"Custom-Header": 'Hello'}),
          params: searchParams,
          responseType: 'json'
        }
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
    return this.httpClient
      .delete(this.postsURL, {
        observe: 'events'
      })
      .pipe(
        tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // ... waiting response
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
