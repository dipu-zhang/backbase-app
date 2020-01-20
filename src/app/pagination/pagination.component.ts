import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input('max-size') maxSize: number;
  @Input('page-count') totalPageCount: number;
  @Input('current-page') currentPage: number;

  @Output('change') change = new EventEmitter();

  constructor() { }

  // event handler for page change
  changePage(pageNum: number) {
    this.currentPage = pageNum;
    this.change.emit(this.currentPage);
  }

  // generate a pages array for use in *ngFor and bootstrap pagination
  generatePagesArray() {
    const pageArray = [];
    if (this.totalPageCount <= this.maxSize) {
      for (let i = 1; i <= this.totalPageCount; i++) {
        pageArray.push(i);
      }
    } else {
      // find the least possible starting page number
      let pageNumber = Math.ceil(this.currentPage - this.maxSize / 2);
      if (pageNumber > this.totalPageCount - this.maxSize + 1) {
        pageNumber = this.totalPageCount - this.maxSize + 1;
      }
      pageNumber = pageNumber > 1 ? pageNumber : 1;
      
      for (let i = 1; i <= this.maxSize; i++) {
        if (pageNumber > this.totalPageCount) break;
        pageArray.push(pageNumber++);
      }
    }
    return pageArray;
  }

}
