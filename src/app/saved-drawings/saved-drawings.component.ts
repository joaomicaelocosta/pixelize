import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'app-saved-drawings',
  templateUrl: './saved-drawings.component.html',
  styleUrls: ['./saved-drawings.component.css'],
})
export class SavedDrawingsComponent implements OnInit {
  @Output() drawingSelected = new EventEmitter<ImageData>();
  @ViewChildren('savedCanvas') canvases!: QueryList<ElementRef>;

  savedDrawings: ImageData[] = [];
  drawingWidth: number = 360; // for displaying purpose
  drawingHeight: number = 360; // for displaying purpose

  ngOnInit() {
    this.loadSavedDrawings();
  }

  ngAfterViewInit() {
    this.renderSavedDrawings();
  }

  loadSavedDrawings() {
    this.savedDrawings = [];
    for (let i = 1; i <= 5; i++) {
      const savedDrawingStr = localStorage.getItem(`savedDrawing${i}`);
      if (savedDrawingStr) {
        const savedDrawingData = JSON.parse(savedDrawingStr);
        let imgData = new ImageData(
          new Uint8ClampedArray(savedDrawingData.data),
          savedDrawingData.width,
          savedDrawingData.height
        );
        this.savedDrawings.push(imgData);
      }
    }
    setTimeout(() => {
      this.renderSavedDrawings();
    }, 100);
  }

  renderSavedDrawings() {
    this.canvases.toArray().forEach((canvasRef, index) => {
      const canvas = canvasRef.nativeElement;
      const ctx = canvas.getContext('2d');
      ctx.putImageData(this.savedDrawings[index], 0, 0);
    });
  }
  loadDrawing(index: number) {
    this.drawingSelected.emit(this.savedDrawings[index]);
  }

  update() {
    this.loadSavedDrawings();
  }
}
