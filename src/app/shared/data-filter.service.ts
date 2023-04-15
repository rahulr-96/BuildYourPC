import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DataFilterService{
  isFilter: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);

  getisFilter(){
    return this.isFilter.asObservable();
  }
  setisFilter(val: boolean){
    this.isFilter.next(val);
  }

  toggle(){
    this.isFilter.next(!this.isFilter.value)
  }

  getFilterCriterias(){
   let lstFilterCriteria : FilterCriteria[] = [];

   let objFilterCriteria : FilterCriteria = new FilterCriteria();
   objFilterCriteria.name = 'Manufacturer'
   objFilterCriteria.values = ['Intel', 'AMD']
   objFilterCriteria.expand = false;
   objFilterCriteria.style = 'list'

   lstFilterCriteria.push(objFilterCriteria)
   objFilterCriteria = new  FilterCriteria()
   objFilterCriteria.name = 'Core'
   objFilterCriteria.values = ['1', '2','3','4','5','6']
   objFilterCriteria.expand = false;
   objFilterCriteria.style = 'list'

   lstFilterCriteria.push(objFilterCriteria)

   objFilterCriteria = new  FilterCriteria()
   objFilterCriteria.name = 'Price'
   objFilterCriteria.style = 'price_slider'
   objFilterCriteria.expand = false;
   objFilterCriteria.minValue = 100;
   objFilterCriteria.maxValue = 500;

   lstFilterCriteria.push(objFilterCriteria)

   return lstFilterCriteria;
  }

}
export class FilterCriteria{
  name:String;
  values:String[];
  expand:boolean;
  style:string;
  minValue:number;
  maxValue:number;
}
