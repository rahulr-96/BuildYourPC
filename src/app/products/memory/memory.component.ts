import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Memory } from "src/app/products/memory/memory.model";
import { DataTableType, rowActions } from "src/app/shared/data-table/datatabletype.model";
import { PCPART_MEMORY } from "../products.type";
import { MemoryService } from "./memory.service";

@Component({
    selector:'app-Memory',
    templateUrl:'./memory.component.html'
})
export class MemoryComponent implements OnInit, OnDestroy{
    Memorys: Memory[];
    subscription: Subscription;
    
    tableConfig: DataTableType;

    constructor(private MemoryService: MemoryService){}

    ngOnInit(): void {

        this.subscription = this.MemoryService.MemorysChanged.subscribe((data: Memory[])=>{
            this.Memorys = data;
        })
        
    
        this.Memorys= this.MemoryService.getMemorys();

        // this.filter.valueChanges.pipe(
        //     debounceTime(500), // delay 1000 msec
        //     distinctUntilChanged()).subscribe((val: string )=> {
        //         this.searchfilter(val);
        //     })
        

        this.tableConfig = {
            columns: [
              {title: "Name", dataProperty: "name", sortable: true, sortOrder: true, filterable: true,},
              {title: "Price", dataProperty: "price_usd", sortable: true, sortOrder: true, filterable: false},
              {title: "Socket", dataProperty: "socket_cpu", sortable: false, sortOrder: true, filterable: false},
              {title: "", dataProperty: "ROW_ACTIONS", sortable: false,sortOrder: false, filterable: false},
            ],
            rowActions:[
                {label: 'Add', actionFor:PCPART_MEMORY}
            ]
          }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}