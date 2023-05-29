import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime, first, startWith } from "rxjs/operators";
import { DataFilterService } from "src/app/shared/data-filter.service";
import * as products from 'src/app/products/products.type';
import { PCParts } from "src/app/pcparts/pcparts.model";
import { PCPartsService } from "src/app/pcparts/pcparts.service";
import { SupabaseService } from "src/app/supabase.service";
import { CaseService } from "../case/case.service";
import { CPUCoolerService } from "../cpu-cooler/cpu-cooler.service";
import { CPUService } from "../cpu/cpu.service";
import { MemoryService } from "../memory/memory.service";
import { MotherBoardService } from "../motherboard/motherboard.service";
import { PowersupplyService } from "../powersupply/powersupply.service";
import { StorageService } from "../storage/storage.service";
import { VideocardService } from "../videocard/videocard.service";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { CPU } from "../cpu/cpu.model";
import { ToastService } from "src/app/shared/toast/toast.service";
import { ComponentHead } from "src/app/shared/component-head.model";

@Component({
    selector: 'app-product-search',
    templateUrl: './product-search.component.html',
  })

  export class ProductSearchComponent implements OnInit, OnDestroy{
    subscription: Subscription;
    lstSearchResults: ComponentHead[] = []
    searchCtrl = new FormControl();

    constructor(private _dataFilterService: DataFilterService,
        private _dataStorageService: DataStorageService,
        private cpuService: CPUService,
        private cpuCoolerService: CPUCoolerService,
        private motherBoardService: MotherBoardService,
        private memoryService: MemoryService,
        private storageService: StorageService,
        private videocardService: VideocardService,
        private caseService: CaseService,
        private powersupplyService: PowersupplyService,
        private pcPartsService: PCPartsService,
        private toastService: ToastService ){}

    ngOnInit(): void {

        this.searchCtrl.valueChanges.
        pipe(startWith(''), debounceTime(500))
          .subscribe((val: string) => {
              if(val != ""){
                this._dataFilterService.searchProductsAutoComplete(val)
              }
          });

        this.subscription = this._dataFilterService.searchChanged.subscribe((data: ComponentHead[])=>{

            this.lstSearchResults = data
           
          })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    setPcPart(objSearchResult: ComponentHead){
        this._dataStorageService.setPCPart(objSearchResult)
    
      }

 showToast(pcPart: string) {
        this.toastService.showInfoToast('PC Build', pcPart + ' Added');
    }

  }