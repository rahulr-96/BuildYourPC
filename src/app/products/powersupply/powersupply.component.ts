import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Powersupply } from "src/app/products/powersupply/powersupply.model";
import { DataTableType, rowActions } from "src/app/shared/data-table/datatabletype.model";
import { PCPART_CASE, PCPART_MOTHERBOARD, PCPART_POWERSUPPLY, PCPART_VIDEOCARD } from "../products.type";
import { PowersupplyService } from "./powersupply.service";

@Component({
    selector:'app-Powersupply',
    templateUrl:'./powersupply.component.html'
})
export class PowersupplyComponent implements OnInit, OnDestroy{
    Powersupplys: Powersupply[];
    subscription: Subscription;
    
    tableConfig: DataTableType;

    constructor(private PowersupplyService: PowersupplyService){}

    ngOnInit(): void {

        this.subscription = this.PowersupplyService.PowersupplysChanged.subscribe((data: Powersupply[])=>{
            this.Powersupplys = data;
        })
        
    
        this.Powersupplys= this.PowersupplyService.getPowersupplys();

        // this.filter.valueChanges.pipe(
        //     debounceTime(500), // delay 1000 msec
        //     distinctUntilChanged()).subscribe((val: string )=> {
        //         this.searchfilter(val);
        //     })
        

        this.tableConfig = {
            columns: [
              {title: "Name", dataProperty: "name", sortable: true, sortOrder: true, filterable: true,},
              {title: "Price", dataProperty: "price_usd", sortable: true, sortOrder: true, filterable: false},
              {title: "Chipset", dataProperty: "chipset", sortable: false, sortOrder: true, filterable: false},
              {title: "", dataProperty: "ROW_ACTIONS", sortable: false,sortOrder: false, filterable: false},
            ],
            rowActions:[
                {label: 'Add', actionFor:PCPART_POWERSUPPLY}
            ]
          }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}