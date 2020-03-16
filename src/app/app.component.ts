import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  section: string = "recipes";

  showSection(section: string) {
    return this.section === section;
  }

  onSectionChanged(section: string) {
    this.section = section;
  }
}
