import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DataFilterService, FilterCriteria } from "../../shared/data-filter.service";
import { routeAnimations } from "src/app/shared/shared.module";

@Component({
  selector: 'app-product-filter',
  templateUrl:'./product-filter.component.html',
  styleUrls:['./product-filter.component.css'],
  animations: [routeAnimations]
})
export class ProductFilterComponent implements OnInit{
  lstFilterCriteria : FilterCriteria[] = [];
  @Output() close = new EventEmitter<void>();
  selectedPanel: any;
  constructor(private _dataFilterService: DataFilterService ){}


  ngOnInit(): void {
    this.lstFilterCriteria = this._dataFilterService.getFilterCriterias();
    this.selectedPanel = this.lstFilterCriteria[0];

  }
  onClose(){
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
}
