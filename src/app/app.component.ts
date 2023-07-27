import { Component } from '@angular/core';
import { ColorStateService } from './color-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pixelize';
  constructor(private colorStateService: ColorStateService) {}

  onColorSelected(newColor: string) {
    console.log('New color selected: ', newColor);
    this.colorStateService.setColor(newColor);
  }
}
