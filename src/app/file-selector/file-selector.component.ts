import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss']
})
export class FileSelectorComponent {

  fileName: string;

  @Output('ready') ready = new EventEmitter<File>();

  constructor() { }

  // event handler for file input change event
  changeInputFile(fileInput: HTMLInputElement) {
    const files = fileInput.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file instanceof File) {
        this.fileName = file.name;
        this.ready.emit(file);
      }
    }
  }
}
