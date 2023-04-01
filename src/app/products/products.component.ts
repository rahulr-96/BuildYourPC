import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { DataFilterService } from "../shared/data-filter.service";
import {routeAnimations} from "../shared/shared.module";
@Component({
    selector:'app-products',
    templateUrl:'./products.component.html',
    animations: [routeAnimations]
})
export class ProductsComponent implements OnInit, OnDestroy{

  isSticky: boolean = false;

  constructor(private dataFilterService: DataFilterService){}

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }

  ngOnDestroy(): void {

    //this.isFilterSub.unsubscribe();

  }
  private isFilterSub: Subscription;
  public isFilter$: Observable<boolean>;


  ngOnInit(): void {
    this.isFilter$ = this.dataFilterService.getisFilter();

  }

  toggle(){
    this.dataFilterService.toggle();
  }


}
