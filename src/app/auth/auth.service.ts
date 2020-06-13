import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = "AIzaSyAVm4fVw-U0IwghT730mmKlf1txBMxx2oU";
  private signUpURL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.apiKey;
  private signInURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.apiKey;
  private errorMessages = {
    'EMAIL_EXISTS': 'This email already exists',
    'OPERATION_NOT_ALLOWED':'Operation not allowed',
    'TOO_MANY_ATTEMPTS_TRY_LATER': 'Too many attempts, try again later',
    'EMAIL_NOT_FOUND': 'Email not found',
    'INVALID_PASSWORD': 'Invalid password',
    'USER_DISABLED': 'User is disabled'
  }

  constructor(private httpClient: HttpClient) { }

  signup(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      this.signUpURL,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorResponse => this.handleError(errorResponse)));
  }

  login(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      this.signInURL,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorResponse => this.handleError(errorResponse)));
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
