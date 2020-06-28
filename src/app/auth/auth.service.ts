import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router}  from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private signUpURL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIKey;
  private signInURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseAPIKey;
  private errorMessages = {
    'EMAIL_EXISTS': 'This email already exists',
    'OPERATION_NOT_ALLOWED':'Operation not allowed',
    'TOO_MANY_ATTEMPTS_TRY_LATER': 'Too many attempts, try again later',
    'EMAIL_NOT_FOUND': 'Email not found',
    'INVALID_PASSWORD': 'Invalid password',
    'USER_DISABLED': 'User is disabled'
  }
  userSubject = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      this.signUpURL,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorResponse => this.handleError(errorResponse)),
      tap(responseData => this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn))
    );
  }

  login(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      this.signInURL,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorResponse => this.handleError(errorResponse)),
      tap(responseData => this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn))
    );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpiratonDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpiratonDate)
    );

    if (loadedUser.token) {
      this.userSubject.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpiratonDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;

    this.router.navigate(['/auth']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.userSubject.next(user);
    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if(!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    } else {
      errorMessage = this.errorMessages[errorResponse.error.error.message];
    }

    return throwError(errorMessage);
  }
}
