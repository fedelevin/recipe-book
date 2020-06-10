import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
      });
  }
}
