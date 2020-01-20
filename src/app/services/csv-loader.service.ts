import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CSVLoaderService {

  constructor(private papa: Papa) { }

  // use Papaparse https://www.papaparse.com/ to load CSV data from file
  // return an Observable
  loadCSVDataFromFile(file: File, fileHasHeader: boolean): Observable<any> {
    return new Observable(observer => {
      this.papa.parse(file, {
        header: fileHasHeader,
        skipEmptyLines: true,
        complete: result => {
          observer.next(result);
          observer.complete();
        },
        error: error => observer.error(error)
      });
    })
  }

}
