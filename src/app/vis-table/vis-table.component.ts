import { Component, OnChanges, Input } from '@angular/core';
import { CSVLoaderService } from '../services/csv-loader.service';

@Component({
  selector: 'vis-table',
  templateUrl: './vis-table.component.html',
  styleUrls: ['./vis-table.component.scss']
})
export class VisTableComponent implements OnChanges {

  @Input('data-file') dataFile: File;

  isValidDataFile: boolean;
  fileHasHeader = true;

  fields = [];
  rows = [];

  // properties to support sorting
  sortField: string;
  sortOrder: number; // 1 for ASC / -1 for DESC

  // properties to support paging
  rowsPerPage = 10;
  numberOfPages = 0;
  currentPageNum = 0;
  rowsOnCurrentPage = [];

  // properties to support filtering
  filterField = 'Issue count';
  filterMax = 0;
  filterValue = 0;
  filteredRows = [];

  constructor(private csvLoader: CSVLoaderService) { }

  ngOnChanges() {
    // triggered when new file is uploaded
    if (this.dataFile) {
      this.resetTable();
      this.isValidDataFile = this.isValidCSVFile(this.dataFile);
      if (this.isValidDataFile) {
        this.loadCSVData();
      }
    }
  }

  private isValidCSVFile(file: File) {
    return file.name.toLowerCase().endsWith('.csv');
  }

  // compareFn for keyvalue pipe returns 1 for no ordering by keys
  compareFn(a, b) {
    return 1;
  }

  performSorting() {
    if (!this.sortField || !this.sortOrder) return;

    // sort the rows based on filedName and sortOrder
    this.filteredRows.sort((a, b) => {
      // compare numbers
      const aNumber = Number(a[this.sortField]);
      const bNumber = Number(b[this.sortField]);
      if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
        return aNumber <= bNumber ? this.sortOrder * (-1) : this.sortOrder;
      }

      // compare dates
      const aDate = new Date(a[this.sortField]);
      const bDate = new Date(b[this.sortField]);
      if (!Number.isNaN(aDate.getTime()) && !Number.isNaN(bDate.getTime())) {
        return aDate <= bDate ? this.sortOrder * (-1) : this.sortOrder;
      }

      // compare standard strings
      return a[this.sortField] <= b[this.sortField] ? this.sortOrder * (-1) : this.sortOrder;
    });

    this.resetPagination();
    this.populateRowsOnCurrentPage();
  }

  // event handler for fileHasHeader checkbox
  changeFileHasHeader(newValue: boolean) {
    this.fileHasHeader = newValue;
    this.resetTable();
    this.loadCSVData();
  }

  // event handler for rows per page selector
  changeRowsPerPage(newValue: string) {
    this.rowsPerPage = Number.parseInt(newValue);
    this.resetPagination();
    this.populateRowsOnCurrentPage();
  }

  // event handler for change page number using Bootstrap pagination
  changePageNum(newValue: number) {
    this.currentPageNum = newValue;
    this.populateRowsOnCurrentPage();
  }

  // event handler for filter change
  changeFilter() {
    if (this.filterValue < 0) this.filterValue = 0;
    if (this.filterValue > this.filterMax) this.filterValue = this.filterMax;
    if (this.filterValue !== null) {
      this.applyFilter();
    }
  }

  // event hanlder for sorting button click
  sortByField(field: string) {
    if (field === this.sortField) {
      this.sortOrder = this.sortOrder ? this.sortOrder * (-1) : 1
    } else {
      this.sortField = field;
      this.sortOrder = 1;
    }

    // perform sorting by new sort by
    this.performSorting();
  }

  loadCSVData() {
    this.csvLoader.loadCSVDataFromFile(this.dataFile, this.fileHasHeader)
      .subscribe((result: CSVData) => {
        this.fields = result.meta.fields || [];
        // store all rows to this.rows
        this.rows = result.data;
        // initialize this.filteredRows
        this.filteredRows = this.rows;

        this.resetFilter();
        this.resetPagination();
        this.populateRowsOnCurrentPage();
      });
  }

  resetFilter() {
    if (this.fields && this.fields.indexOf(this.filterField) !== -1) {
      this.rows.forEach(row => {
        // row[this.filterField] is of type string
        const value = Number.parseInt(row[this.filterField]);
        if (!Number.isNaN(value)) {
          this.filterMax = value > this.filterMax ? value : this.filterMax;
        }
      });
    }
  }

  // filter on this.rows based on this.rowsPerPage and this.currentPageNum
  populateRowsOnCurrentPage() {
    this.rowsOnCurrentPage = this.filteredRows.filter((row, rowIndex) => {
      return rowIndex >= this.rowsPerPage * (this.currentPageNum - 1) && rowIndex < this.rowsPerPage * this.currentPageNum
    });
  }

  applyFilter() {
    // if filterField cannot be found
    if (this.fields.indexOf(this.filterField) === -1) return;

    this.filteredRows = this.rows.filter(row => {
      let value = Number(row[this.filterField]);
      return Number.isNaN(value) ? false : value >= this.filterValue // filter value is minimal value
    });

    this.performSorting();
    this.resetPagination();
    this.populateRowsOnCurrentPage();
  }

  // reset all table properties
  resetTable() {
    this.fields = [];
    this.rows = [];

    // sorting properties
    this.sortField = '';
    this.sortOrder = undefined;

    // pagination properties
    //this.rowsPerPage = 10; // rowsPerPage does not need to be reset
    this.numberOfPages = 0;
    this.currentPageNum = 0;
    this.rowsOnCurrentPage = [];

    // filtering properties
    this.filterMax = 0;
    this.filterValue = 0;
    this.filteredRows = [];
  }

  // reset pagination
  resetPagination() {
    // reset current page to page 1
    this.currentPageNum = 1;
    // recalculate number of pages
    this.numberOfPages = Math.ceil(this.filteredRows.length / this.rowsPerPage);
  }

}

interface CSVData {
  data: any[];
  meta: {
    fields?: any[]
  }
}
