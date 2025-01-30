import { Component } from '@angular/core';
import { OrderListComponent } from './components/order-list/order-list.component';

@Component({
  selector: 'app-root',
  imports: [OrderListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'order-manager';
}
