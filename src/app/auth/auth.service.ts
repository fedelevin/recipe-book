import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = "AIzaSyAVm4fVw-U0IwghT730mmKlf1txBMxx2oU";
  private signUpURL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.apiKey;

  constructor(private httpClient: HttpClient) { }

  signup(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      this.signUpURL,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(errorResponse => {
        let errorMessage = 'An unknown error occurred!';

        if(!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage);
        }

        switch (errorResponse.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists';
            break;
          case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'Operatin not allowed'
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'Too many attempts, try again layer'
            break;
        }

        return throwError(errorMessage);
    }));
  }
}
