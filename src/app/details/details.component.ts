import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  showSecret: boolean;
  logDetails: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setShowSecret(true);
  }

  setShowSecret(showSecret): void {
    this.showSecret = showSecret;
  }

  toggleText() {
    this.logNewDetail();
    this.setShowSecret(!this.showSecret);
  }

  logNewDetail() {
    this.logDetails.push(new Date());
  }
}
