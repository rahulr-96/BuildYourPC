import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { CPU } from "src/app/products/cpu/cpu.model";
import { DataFilterService } from "src/app/shared/data-filter.service";
import { DataTableType, rowActions } from "src/app/shared/data-table/datatabletype.model";
import { PCPART_CPU } from "../products.type";
import { CPUService } from "./cpu.service";

@Component({
    selector:'app-cpu',
    templateUrl:'./cpu.component.html'
})
export class CPUComponent implements OnInit, OnDestroy{
    cpus: CPU[];
    subscription: Subscription;

    tableConfig: DataTableType;

    constructor(private cpuService: CPUService, private dataFilterService: DataFilterService){}

    ngOnInit(): void {

        this.subscription = this.cpuService.cpusChanged.subscribe((data: CPU[])=>{
          console.log("cpusChanged")
            this.cpus = data;
        })


        this.cpus= this.cpuService.getCpus();

        this.dataFilterService.setisFilter(PCPART_CPU);

        // this.filter.valueChanges.pipe(
        //     debounceTime(500), // delay 1000 msec
        //     distinctUntilChanged()).subscribe((val: string )=> {
        //         this.searchfilter(val);
        //     })


        this.tableConfig = {
            columns: [
              {title: "Name", dataProperty: "name", sortable: true, sortOrder: true, filterable: true,},
              {title: "Price", dataProperty: "price_usd", sortable: true, sortOrder: true, filterable: false},
              {title: "Core", dataProperty: "core_count", sortable: false, sortOrder: true, filterable: false},
              {title: "Core Clock", dataProperty: "core_clock", sortable: false,sortOrder: true, filterable: false},
              {title: "", dataProperty: "ROW_ACTIONS", sortable: false,sortOrder: false, filterable: false},
            ],
            rowActions:[
                {label: 'Add', actionFor: PCPART_CPU}
            ]
          }
    }

    // searchfilter(val: string){
    //     this.cpuService.filterCpus(val);
    // }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
