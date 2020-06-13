import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.login(email, password);
      this.isLoading = false;
    } else {
      //Timeout only for testing spinner
      setTimeout(() => {
        this.signup(email, password);
        this.isLoading = false;
      }, 2000);
    }

    form.reset();
  }

  signup(email: string, password: string) {
    this.authService.signup(email, password).subscribe(resData => {
      console.log(resData);
    }, errorMessage => {
      this.error = errorMessage;
    });
  }

  login(email: string, password: string) {

  }
}
