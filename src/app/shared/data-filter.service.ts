import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PCPART_CPU } from "../products/products.type";
import { PCPartsService } from "../pcparts/pcparts.service";
import { CaseService } from "../products/case/case.service";
import { CPUCoolerService } from "../products/cpu-cooler/cpu-cooler.service";
import { CPUService } from "../products/cpu/cpu.service";
import { MemoryService } from "../products/memory/memory.service";
import { MotherBoardService } from "../products/motherboard/motherboard.service";
import { PowersupplyService } from "../products/powersupply/powersupply.service";
import { StorageService } from "../products/storage/storage.service";
import { VideocardService } from "../products/videocard/videocard.service";

@Injectable({ providedIn: 'root' })
export class DataFilterService{

  constructor(
    private cpuService: CPUService,
    private cpuCoolerService: CPUCoolerService,
    private motherBoardService: MotherBoardService,
    private memoryService: MemoryService,
    private storageService: StorageService,
    private videocardService: VideocardService,
    private caseService: CaseService,
    private powersupplyService: PowersupplyService,
    private pcPartsService: PCPartsService
  ) {}

  isFilter: string;

  getisFilter(){
    return this.isFilter;
  }
  setisFilter(val: string){
    this.isFilter = val;
  }

  // toggle(){
  //   this.isFilter.next(!this.isFilter.value)
  // }

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

  filterProducts(objFilterCriteria:FilterCriteria){
    switch(this.getisFilter()){
      case PCPART_CPU:
        switch(objFilterCriteria.name){
          case FILTERCRITERIA_MANUFACTURER:
          this.cpuService.filterCpus(objFilterCriteria.selectedValue, "name")
          break
        }
        break
    }
  }

}
export class FilterCriteria{
  name:String;
  values:String[];
  expand:boolean;
  style:string;
  minValue:number;
  maxValue:number;
  selectedValue: string;
}

export const FILTERCRITERIA_MANUFACTURER='Manufacturer'
