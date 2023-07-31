import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedDrawingsComponent } from './saved-drawings.component';

describe('SavedDrawingsComponent', () => {
  let component: SavedDrawingsComponent;
  let fixture: ComponentFixture<SavedDrawingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedDrawingsComponent]
    });
    fixture = TestBed.createComponent(SavedDrawingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
