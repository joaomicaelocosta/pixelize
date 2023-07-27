import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ColorStateService } from '../color-state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('myCanvas') myCanvas!: ElementRef;

  constructor(private colorStateService: ColorStateService) {}

  private destroy$ = new Subject<void>();

  public context!: CanvasRenderingContext2D;

  gridSize: number = 16;

  isDrawing = false;
  defaultColor = 'red'; // Default canvas background color

  get canvasWidth() {
    return this.gridSize * this.pixelSize;
  }

  get canvasHeight() {
    return this.gridSize * this.pixelSize;
  }

  get pixelSize() {
    switch (this.gridSize as number) {
      case 16:
        return 20;
      case 32:
        return 10;
      case 64:
        return 5;
      default:
        return 10;
    }
  }

  changeGridSize() {
    this.gridSize = +this.gridSize; // Convert gridSize to a number
    // Redraw the canvas with the new grid
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    this.context = (
      this.myCanvas.nativeElement as HTMLCanvasElement
    ).getContext('2d') as CanvasRenderingContext2D;
    this.context.canvas.width = this.canvasWidth;
    this.context.canvas.height = this.canvasHeight;
    this.drawInitialGrid();
  }
  ngOnInit() {
    this.colorStateService.currentColor$
      .pipe(takeUntil(this.destroy$))
      .subscribe((color) => {
        this.defaultColor = color;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  drawInitialGrid() {
    for (let x = 0; x < this.canvasWidth; x += this.pixelSize) {
      for (let y = 0; y < this.canvasHeight; y += this.pixelSize) {
        this.context.strokeStyle = '#e0e0e0'; // Light grey or any preferred color for the grid
        this.context.strokeRect(x, y, this.pixelSize, this.pixelSize);
      }
    }
  }
  startDrawing(event: MouseEvent) {
    this.isDrawing = true;
    this.drawPixel(event);
  }

  draw(event: MouseEvent) {
    if (!this.isDrawing) return;
    this.drawPixel(event);
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  drawPixel(event: MouseEvent) {
    const rect = (
      this.myCanvas.nativeElement as HTMLCanvasElement
    ).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / this.pixelSize);
    const row = Math.floor(y / this.pixelSize);

    if (this.defaultColor === 'eraser') {
      this.context.clearRect(
        col * this.pixelSize,
        row * this.pixelSize,
        this.pixelSize,
        this.pixelSize
      );
      this.redrawGridForPixel(col, row);
    } else {
      this.context.fillStyle = this.defaultColor;
      this.context.fillRect(
        col * this.pixelSize,
        row * this.pixelSize,
        this.pixelSize,
        this.pixelSize
      );
    }
  }
  redrawGridForPixel(col: number, row: number) {
    this.context.strokeStyle = '#e0e0e0'; // Light grey or any preferred color for the grid
    this.context.strokeRect(
      col * this.pixelSize,
      row * this.pixelSize,
      this.pixelSize,
      this.pixelSize
    );
  }
  resetCanvas() {
    // Clear the entire canvas
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Redraw the initial grid
    this.drawInitialGrid();
  }
}
