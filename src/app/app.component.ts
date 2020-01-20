import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'VisualizeCSV';

  // take file from file selector and pass on to other child components 
  inputFile: File;

  inputFileReady(file: File) {
    this.inputFile = file;
  }
}
