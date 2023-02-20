import { Component, OnDestroy } from "@angular/core";
import { CPU } from "../products/cpu/cpu.model";
import { PCParts } from "./pcparts.model";
import { PCPartsService } from "./pcparts.service";
import { Router } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Subscription } from "rxjs";

@Component({
    selector:'app-pcparts-list',
    templateUrl:'./pcparts-list.component.html'
})
export class PCPartsListComponent implements OnDestroy{  

    subscription: Subscription;
    
    constructor(private pcPartsService: PCPartsService, private router:Router, private dataStorageService: DataStorageService){}

    _pcparts: PCParts

    ngOnInit(){
        this._pcparts = this.pcPartsService.getPCparts();
        this.subscription = this.pcPartsService.pcPartsChanged.subscribe(data =>{
            this._pcparts=data
        })
    }

    addPcPart(rowIndex: number){
        switch(rowIndex){
            case 1:
                this.router.navigate(['/products/cpu'])
                break;
            case 2:
                this.router.navigate(['/products/cpuCooler'])
                break;
            case 3:
                this.router.navigate(['/products/motherboard'])
                break;
            case 4:
                this.router.navigate(['/products/memory'])
                break;               
        }
    }

    save(){
        this.dataStorageService.savePCParts();
    }

    fetch(){
        this.dataStorageService.fetchPCParts();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}