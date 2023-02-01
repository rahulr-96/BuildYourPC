import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { CPUCooler } from "src/app/products/cpu-cooler/cpu-cooler.model";
import { DataTableType, rowActions } from "src/app/shared/data-table/datatabletype.model";
import { PCPART_CPUCOOLER } from "../products.type";
import { CPUCoolerService } from "./cpu-cooler.service";

@Component({
    selector:'app-CPUCooler',
    templateUrl:'./cpu-cooler.component.html'
})
export class CPUCoolerComponent implements OnInit, OnDestroy{
    CPUCoolers: CPUCooler[];
    subscription: Subscription;
    
    tableConfig: DataTableType;

    constructor(private CPUCoolerService: CPUCoolerService){}

    ngOnInit(): void {

        this.subscription = this.CPUCoolerService.CPUCoolersChanged.subscribe((data: CPUCooler[])=>{
            this.CPUCoolers = data;
        })
        
    
        this.CPUCoolers= this.CPUCoolerService.getCPUCoolers();

        // this.filter.valueChanges.pipe(
        //     debounceTime(500), // delay 1000 msec
        //     distinctUntilChanged()).subscribe((val: string )=> {
        //         this.searchfilter(val);
        //     })
        

        this.tableConfig = {
            columns: [
              {title: "Name", dataProperty: "name", sortable: true, sortOrder: true, filterable: true,},
              {title: "Price", dataProperty: "price_usd", sortable: true, sortOrder: true, filterable: false},
              {title: "RPM", dataProperty: "fan_rpm", sortable: false, sortOrder: true, filterable: false},
              {title: "", dataProperty: "ROW_ACTIONS", sortable: false,sortOrder: false, filterable: false},
            ],
            rowActions:[
                {label: 'Add', actionFor:PCPART_CPUCOOLER}
            ]
          }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}