import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorStateService {
  private colorSubject = new BehaviorSubject<string>('#FF0000'); // default color
  currentColor$ = this.colorSubject.asObservable();

  constructor() {}

  setColor(color: string) {
    this.colorSubject.next(color);
  }
}
