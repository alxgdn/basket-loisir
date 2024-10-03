import { Component } from '@angular/core';
import { CardEventItemComponent } from '../../shared/components/card-event-item/card-event-item.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CardEventItemComponent,
  ],
  standalone: true,
})
export class HomeComponent {

  protected readonly Array = Array;
}
