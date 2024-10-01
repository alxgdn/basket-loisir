import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {

  transform(myArray: any[], searchText: string, fieldNames: string[], subFieldName: string = ''): any[] {
    if (!myArray) {
      return [];
    }

    if (!searchText) {
      return myArray;
    }

    searchText = searchText.toLowerCase();

    return myArray.filter(item => {
      for (const fieldName of fieldNames) {
        let fieldValue: any;

        if (subFieldName !== '') {
          fieldValue = item[fieldName] ? item[fieldName][subFieldName] : null;
        } else {
          fieldValue = item[fieldName];
        }

        if (fieldValue && fieldValue.toString().toLowerCase().includes(searchText)) {
          return true;
        }
      }

      return false;
    });
  }

}
