import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { SavedDrawingsComponent } from './saved-drawings/saved-drawings.component';

@NgModule({
  declarations: [AppComponent, CanvasComponent, ColorPickerComponent, SavedDrawingsComponent],
  imports: [BrowserModule, AppRoutingModule, ColorPickerModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
