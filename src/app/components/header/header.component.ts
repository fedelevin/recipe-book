import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sectionChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  
  goTo(section: string): void {
    this.sectionChanged.emit(section);
  }
}
