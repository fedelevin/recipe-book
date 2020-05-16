import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-username-form',
  templateUrl: './username-form.component.html',
  styleUrls: ['./username-form.component.scss']
})
export class UsernameFormComponent implements OnInit {
  username: string;

  constructor() { }

  ngOnInit(): void {
    this.resetUsername();
  }

  private setUsername(username: string): void {
    this.username = username;
  }

  resetUsername(): void {
    this.setUsername('');
  }
}
