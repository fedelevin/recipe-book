import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
  styleUrls: ['./warning-alert.component.scss']
})
export class WarningAlertComponent implements OnInit {
  @Input() message: String;

  constructor() { }

  ngOnInit(): void {
  }

}
