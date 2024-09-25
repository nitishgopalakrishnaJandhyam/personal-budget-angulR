import { Component } from '@angular/core';

@Component({
  selector: 'pb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'personal-budget';

  // Define your configuration values directly in the component
  apiUrl: string = 'https://your-api-url.com';
  // Add more configuration values as needed
  anotherConfigValue: string = 'Some value';

  constructor() {
    console.log('API URL:', this.apiUrl);
    // You can log or use other configuration values here
  }
}
