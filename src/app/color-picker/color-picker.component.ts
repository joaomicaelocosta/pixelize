import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
})
export class ColorPickerComponent {
  @Output() colorSelected = new EventEmitter<string>();
  selectedColor: string = '#FF0000'; // Default color
  colorHistory: string[] = [];
  isEraserActive = false;

  activateEraser() {
    this.isEraserActive = true;
    this.colorSelected.emit('eraser'); // Emit a special value for eraser mode
  }

  // Whenever color changes, emit the new color value
  colorChange() {
    this.colorSelected.emit(this.selectedColor);
  }
  colorChanged(newColor: string) {
    this.selectedColor = newColor;
    this.colorChange();

    // Add color to history if it's not already present
    if (!this.colorHistory.includes(newColor)) {
      this.colorHistory.unshift(newColor);

      // Limit history size to, say, 5 entries for now
      if (this.colorHistory.length > 5) {
        this.colorHistory.pop();
      }
    }
  }
  selectFromHistory(color: string) {
    this.selectedColor = color;
    this.colorChange();
  }
}
