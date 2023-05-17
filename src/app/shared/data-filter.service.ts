import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { PCPART_CASE, PCPART_CPU, PCPART_CPUCOOLER } from "../products/products.type";
import { PCPartsService } from "../pcparts/pcparts.service";
import { CaseService } from "../products/case/case.service";
import { CPUCoolerService } from "../products/cpu-cooler/cpu-cooler.service";
import { CPUService } from "../products/cpu/cpu.service";
import { MemoryService } from "../products/memory/memory.service";
import { MotherBoardService } from "../products/motherboard/motherboard.service";
import { PowersupplyService } from "../products/powersupply/powersupply.service";
import { StorageService } from "../products/storage/storage.service";
import { VideocardService } from "../products/videocard/videocard.service";
import { CPU } from "../products/cpu/cpu.model";
import { SupabaseService } from "../supabase.service";

@Injectable({ providedIn: 'root' })
export class DataFilterService {

  constructor(
    private cpuService: CPUService,
    private cpuCoolerService: CPUCoolerService,
    private motherBoardService: MotherBoardService,
    private memoryService: MemoryService,
    private storageService: StorageService,
    private videocardService: VideocardService,
    private caseService: CaseService,
    private powersupplyService: PowersupplyService,
    private pcPartsService: PCPartsService,
    private supabaseService: SupabaseService
  ) { }

  isFilter: string;
  filterChanged = new Subject<string>();
  searchChanged = new Subject<SearchResult[]>();
  filterdata = new Subject<FilterCriteria[]>();

  getisFilter() {
    return this.isFilter;
  }
  setisFilter(val: string) {
    this.isFilter = val;
    this.filterChanged.next(val)
  }

  // toggle(){
  //   this.isFilter.next(!this.isFilter.value)
  // }

  getFilterCriterias() {
    let lstFilterCriteria: FilterCriteria[] = [];
    let objFilterCriteria: FilterCriteria = new FilterCriteria();
    this.getCPUFilter();

    // switch (this.getisFilter()) {
    //   case PCPART_CPU:

    //   return this.getCPUFilter()
    //     // objFilterCriteria = new FilterCriteria();

    //     // objFilterCriteria.name = 'Manufacturer'
    //     // objFilterCriteria.values = [{ valueName: 'Intel', isSelected: false }, { valueName: 'AMD', isSelected: false }]
    //     // objFilterCriteria.selectedValues = []
    //     // objFilterCriteria.expand = false;
    //     // objFilterCriteria.style = 'list'
    //     // objFilterCriteria.filterKey = 'name'
    //     // //  objFilterCriteria.query = item => item['name'].toLowerCase().indexOf(objFilterCriteria.selectedValue.toLowerCase()) > -1
    //     // //objFilterCriteria.query = (item, val:string[]) => val.indexOf(item['name'].toLowerCase()) >-1

    //     // lstFilterCriteria.push(objFilterCriteria)
    //     // objFilterCriteria = new FilterCriteria()
    //     // objFilterCriteria.name = 'Core'
    //     // //objFilterCriteria.values = ['1', '2','3','4','5','6']
    //     // objFilterCriteria.expand = false;
    //     // objFilterCriteria.style = 'price_slider'
    //     // objFilterCriteria.minValue = 1;
    //     // objFilterCriteria.maxValue = 6;
    //     // objFilterCriteria.filterKey = 'core_count';
    //     // //objFilterCriteria.query = item => parseInt(item['core_count']) <= objFilterCriteria.maxValue && parseInt(item['core_count']) >= objFilterCriteria.minValue

    //     // lstFilterCriteria.push(objFilterCriteria)

    //     // objFilterCriteria = new FilterCriteria()
    //     // objFilterCriteria.name = 'Price'
    //     // objFilterCriteria.style = 'price_slider'
    //     // objFilterCriteria.expand = false;
    //     // objFilterCriteria.minValue = 100;
    //     // objFilterCriteria.maxValue = 500;
    //     // objFilterCriteria.filterKey = 'price_usd';
    //     // //objFilterCriteria.query = item => item['price_usd'] <= objFilterCriteria.maxValue && item['price_usd'] >= objFilterCriteria.minValue

    //     // lstFilterCriteria.push(objFilterCriteria)
    //     // return lstFilterCriteria;
      
    //   case PCPART_CASE:
    //     objFilterCriteria = new FilterCriteria();
        
    //     objFilterCriteria.name = 'Manufacturer'
    //     objFilterCriteria.FilterCriteriaDetails = [{ valueName: 'Cooler Master', isSelected: false }, { valueName: 'NZXT', isSelected: false }]
    //     objFilterCriteria.selectedValues = []
    //     objFilterCriteria.expand = false;
    //     objFilterCriteria.style = 'list'
    //     objFilterCriteria.filterKey = 'name'
    //     lstFilterCriteria.push(objFilterCriteria)

    //     objFilterCriteria = new FilterCriteria()
    //     objFilterCriteria.name = 'Price'
    //     objFilterCriteria.style = 'price_slider'
    //     objFilterCriteria.expand = false;
    //     objFilterCriteria.minValue = 100;
    //     objFilterCriteria.maxValue = 500;
    //     objFilterCriteria.filterKey='price_usd'

        
    //     lstFilterCriteria.push(objFilterCriteria)

    //     objFilterCriteria = new FilterCriteria()
    //     objFilterCriteria.name = 'Type'
    //     objFilterCriteria.FilterCriteriaDetails = [{ valueName: 'ATX Mid Tower', isSelected: false }, { valueName: 'MicroATX Mini Tower', isSelected: false }]
    //     objFilterCriteria.selectedValues = []
    //     objFilterCriteria.expand = false;
    //     objFilterCriteria.style = 'list'
    //     objFilterCriteria.filterKey = 'type'
    //     lstFilterCriteria.push(objFilterCriteria)

  
    //     return lstFilterCriteria;

    //   default:
    //     return lstFilterCriteria;
    //     break;
    //}



  }

  filterProducts(lstFilterCriteria: FilterCriteria[]) {
    let result: any[] = [];

    switch (this.getisFilter()) {
      case PCPART_CPU:

        let filterCPU = this.cpuService.getCpus();

        if (lstFilterCriteria.length > 0) {
          result = [...result, ...filterCPU.filter(item => lstFilterCriteria.every(f => f.query(item)))]
        }
        else {
          result = [...filterCPU];
        }
        this.cpuService.cpusChanged.next(result);
        break;

       case PCPART_CASE:

        let filterCase = this.caseService.getCases();

        if (lstFilterCriteria.length > 0) {
          result = [...result, ...filterCase.filter(item => lstFilterCriteria.every(f => f.query(item)))]
        }
        else {
          result = [...filterCase];
        }
        this.caseService.CasesChanged.next(result);
        break

    }

  }

  async getCPUFilter(){

  let query = `name, style, minValue, maxValue, filterKey, FilterCriteriaDetails (valueName), ComponentType!inner(ComponentTypeName)`
    
  const FilterCriteriaDetails = await this.supabaseService.supabase
    .from('ComponentFilterCriteria')
    .select(query)
    .eq('ComponentType.ComponentTypeCode', this.isFilter)
    .returns<FilterCriteria[]>()
    this.filterdata.next(FilterCriteriaDetails.data)
    console.log(FilterCriteriaDetails.data)

    return FilterCriteriaDetails.data

    // const powersupplys = await this.supabaseService.supabase
    // .from('power-supply')
    // .select('*')
    // let lstpowersupplys = powersupplys.data;
    // console.log(lstpowersupplys)
  }

  async searchProductsAutoComplete(val: string){

    const searchResult = await this.supabaseService.supabase
    .rpc('component_search', {
      "searchval": val
    })
    .limit(3)
    .returns<SearchResult[]>()

    this.searchChanged.next(searchResult.data ? searchResult.data : [])
   // return searchResult.data
  }

}
export class FilterCriteria {
  name: string;
  FilterCriteriaDetails: FilterValue[];
  expand: boolean;
  style: string;
  minValue: number;
  maxValue: number;
  selectedValues: string[];
  filterKey: string;
  query: (...args: unknown[]) => boolean;

}

export class FilterValue {
  valueName: string;
  isSelected: boolean;
}

export class SearchResult{
  id: number;
  name: string;
  ComponentTypeName: string;
  ComponentTypeCode: string;
  price: string;
}


export const FILTERCRITERIA_MANUFACTURER = 'Manufacturer'
export const FILTERCRITERIA_PRICE = 'Price'
