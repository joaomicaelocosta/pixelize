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
    this.isEraserActive = !this.isEraserActive; // This will toggle between true and false
    this.colorSelected.emit(
      this.isEraserActive ? 'eraser' : this.selectedColor
    ); // Emit eraser if active, else emit the selected color
  }

  // Whenever color changes, emit the new color value
  colorChange() {
    this.colorSelected.emit(this.selectedColor);
  }
  colorChanged(newColor: string) {
    this.isEraserActive = false;
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
