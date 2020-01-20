import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { VisTableComponent } from './vis-table/vis-table.component';
import { PaginationComponent } from './pagination/pagination.component';

import { CSVLoaderService } from './services/csv-loader.service';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectorComponent,
    VisTableComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    CSVLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
