import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {
  DataFilterService,
  FilterCriteria,
  FilterValue,
} from '../../shared/data-filter.service';
import { routeAnimations } from 'src/app/shared/shared.module';
import { RangeEvent } from 'src/app/shared/range-slider/range-slider.component';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
  animations: [routeAnimations],
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  lstFilterCriteria: FilterCriteria[] = [];
  @Output() close = new EventEmitter<void>();
  selectedPanel: any;
  filterCriterias: FilterCriteria[] = [];
  subscription: Subscription;
  checkboxID: number;
  constructor(private _dataFilterService: DataFilterService) {}

  ngOnInit(): void {
    
    this.subscription = this._dataFilterService.filterChanged.subscribe((data: string)=>{
      this._dataFilterService.getFilterCriterias()
       this._dataFilterService.filterdata
      .pipe(first())
      .subscribe(data => {
        console.log(data)
        this.lstFilterCriteria = data          
      this.selectedPanel = this.lstFilterCriteria[0];
      });

    })

    //this.lstFilterCriteria = this._dataFilterService.getFilterCriterias();
    this.selectedPanel = this.lstFilterCriteria[0];

    this.generateCheckboxID();

  }

  onClose() {
    this.close.emit();
  }

  togglePanel(button: any) {
    if (this.selectedPanel !== button) {
      this.selectedPanel = button;
    }
  }

  isPanelOpen(button: any) {
    return this.selectedPanel === button;
  }

  filterClick(event: Event, button: FilterCriteria, value: FilterValue) {
    console.log((event.target as HTMLInputElement).checked);

    let objFilterCriteria: FilterCriteria = new FilterCriteria();
    objFilterCriteria.name = button.name;
    objFilterCriteria.selectedValues = button.FilterCriteriaDetails
      .filter((a) => a.isSelected)
      .map(function (obj) {
        return obj.valueName.toLowerCase();
      });
    objFilterCriteria.query = (item) =>
      objFilterCriteria.selectedValues.some((substr) =>
        item[button.filterKey].toLowerCase().startsWith(substr)
      );

    this.filterCriterias = this.filterCriterias.filter(item => item.name != button.name)
    if (objFilterCriteria.selectedValues.length > 0) {

      this.filterCriterias = [...this.filterCriterias, objFilterCriteria]
    }

    this._dataFilterService.filterProducts(this.filterCriterias);
  }

  rangeFilter(button: FilterCriteria, rangeEvent: RangeEvent) {
    console.log('rangeFilter');

    let objFilterCriteria = this.filterCriterias.find(
      (fil) => fil.name == button.name
    );

    if (objFilterCriteria) {
      objFilterCriteria.maxValue = rangeEvent.rangeMaxValue;
      objFilterCriteria.minValue = rangeEvent.rangeMinValue;
    } else {
      let objFilterCriteria: FilterCriteria = new FilterCriteria();
      objFilterCriteria.name = button.name;
      objFilterCriteria.maxValue = rangeEvent.rangeMaxValue;
      objFilterCriteria.minValue = rangeEvent.rangeMinValue;
      objFilterCriteria.query = item => item[button.filterKey] <= objFilterCriteria.maxValue &&  item[button.filterKey] >= objFilterCriteria.minValue
      this.filterCriterias = [...this.filterCriterias, objFilterCriteria];
    }


    //console.log(objFilterCriteria)
    //this.filterCriterias = [...this.filterCriterias, objFilterCriteria]
    this._dataFilterService.filterProducts(this.filterCriterias);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  generateCheckboxID(){
    this.checkboxID = Math.random();
  }

  filterReset(){

    let val = this._dataFilterService.getisFilter();

    this._dataFilterService.setisFilter(val)
    
    this.filterCriterias = [];
    this._dataFilterService.filterProducts(this.filterCriterias);
  }
}
