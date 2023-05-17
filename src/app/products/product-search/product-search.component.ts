import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime, first, startWith } from "rxjs/operators";
import { DataFilterService, SearchResult } from "src/app/shared/data-filter.service";
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

@Component({
    selector: 'app-product-search',
    templateUrl: './product-search.component.html',
  })

  export class ProductSearchComponent implements OnInit, OnDestroy{
    subscription: Subscription;
    lstSearchResults: SearchResult[] = []
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

        this.subscription = this._dataFilterService.searchChanged.subscribe((data: SearchResult[])=>{

            this.lstSearchResults = data
           
          })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    setPcPart(objSearchResult: SearchResult){
        const actionFor = objSearchResult.ComponentTypeCode

        switch(actionFor){
    
          case products.PCPART_CPU:
            var objPcParts = new PCParts();
            const cpus =  this.cpuService.getCpus()
            if(cpus.length === 0){
                this._dataStorageService.fetchCPU()
                this.cpuService.cpusChanged.pipe(first())
                .subscribe(data => {
            
                    console.log('data')
                    const cpu =  data.find(obj => obj.id == objSearchResult.id)
                    objPcParts.CPU = cpu;
                    this.pcPartsService.storePCparts(actionFor, objPcParts);
                });
            }
            else{
               
                console.log('cpus')
                const cpu =  cpus.find(obj => obj.id == objSearchResult.id)
                objPcParts.CPU = cpu;
                this.pcPartsService.storePCparts(actionFor, objPcParts);
            }  

            break;
    
        //   case products.PCPART_CPUCOOLER:
        //     var objPcParts = new PCParts();
        //     objPcParts.CPUCooler = columnData;
        //     this.pcPartsService.storePCparts(actionFor, objPcParts);
        //     this.router.navigate(['/list']);
        //     break;
    
        //   case products.PCPART_MOTHERBOARD:
        //     var objPcParts = new PCParts();
        //     objPcParts.MotherBoard = columnData;
        //     this.pcPartsService.storePCparts(actionFor, objPcParts);
        //     this.router.navigate(['/list']);
        //     break;
    
        //   case products.PCPART_MEMORY:
        //     var objPcParts = new PCParts();
        //     objPcParts.Memory = columnData;
        //     this.pcPartsService.storePCparts(actionFor, objPcParts);
        //     this.router.navigate(['/list']);
        //     break;
    
        //   case products.PCPART_STORAGE:
        //     var objPcParts = new PCParts();
        //     objPcParts.Storage = columnData;
        //     this.pcPartsService.storePCparts(actionFor, objPcParts);
        //     this.router.navigate(['/list']);
        //     break;
    
        //   case products.PCPART_VIDEOCARD:
        //     var objPcParts = new PCParts();
        //     objPcParts.Videocard = columnData;
        //     this.pcPartsService.storePCparts(actionFor, objPcParts);
        //     this.router.navigate(['/list']);
        //     break;
    
        //   case products.PCPART_CASE:
        //     var objPcParts = new PCParts();
        //     objPcParts.Case = columnData;
        //     this.pcPartsService.storePCparts(actionFor, objPcParts);
        //     this.router.navigate(['/list']);
        //     break;
    
        //   case products.PCPART_POWERSUPPLY:
        //     var objPcParts = new PCParts();
        //     objPcParts.Powersupply = columnData;
        //     this.pcPartsService.storePCparts(actionFor, objPcParts);
        //     this.router.navigate(['/list']);
        //     break;
        }
    
        this.showToast(actionFor);
    
      }

 showToast(pcPart: string) {
        this.toastService.showInfoToast('PC Build', pcPart + ' Added');
    }

  }