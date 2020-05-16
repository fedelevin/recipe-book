import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.scss']
})
export class SuccessAlertComponent implements OnInit {
  @Input() message: String;
  
  constructor() { }

  ngOnInit(): void {
  }

}
