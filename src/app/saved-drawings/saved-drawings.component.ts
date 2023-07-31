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
    for (let i = 1; i <= 5; i++) {
      const savedDrawingStr = localStorage.getItem(`savedDrawing${i}`);
      if (savedDrawingStr) {
        const savedDrawingData = JSON.parse(savedDrawingStr);
        console.log('saved drawings', savedDrawingData.data);
        let imgData = new ImageData(
          new Uint8ClampedArray(savedDrawingData.data),
          savedDrawingData.width,
          savedDrawingData.height
        );
        this.savedDrawings.push(imgData);
      }
    }
    console.log('saved drawings', this.savedDrawings);
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
}
