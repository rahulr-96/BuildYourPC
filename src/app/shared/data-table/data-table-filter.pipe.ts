import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({ name: 'dataTableFilter' })
export class DataTableFilter implements PipeTransform {
  transform(dataArr: any[], searchText: string, column:string) {

    if(!dataArr) return null;
    if(!searchText) return dataArr;
    if(!column) return dataArr;

    return dataArr.filter(data => data[column].indexOf(searchText) !== -1);
    
  }
}