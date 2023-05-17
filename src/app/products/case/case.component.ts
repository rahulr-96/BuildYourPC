import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Case } from "src/app/products/case/case.model";
import { DataTableType, rowActions } from "src/app/shared/data-table/datatabletype.model";
import { PCPART_CASE, PCPART_MOTHERBOARD, PCPART_VIDEOCARD } from "../products.type";
import { CaseService } from "./case.service";
import { DataFilterService } from "src/app/shared/data-filter.service";

@Component({
    selector:'app-Case',
    templateUrl:'./case.component.html'
})
export class CaseComponent implements OnInit, OnDestroy{
    Cases: Case[];
    subscription: Subscription;
    
    tableConfig: DataTableType;

    constructor(private CaseService: CaseService, private dataFilterService: DataFilterService){}

    ngOnInit(): void {

        this.subscription = this.CaseService.CasesChanged.subscribe((data: Case[])=>{
            this.Cases = data;
        })
        
    
        this.Cases= this.CaseService.getCases();
        
        this.dataFilterService.setisFilter(PCPART_CASE);

        // this.filter.valueChanges.pipe(
        //     debounceTime(500), // delay 1000 msec
        //     distinctUntilChanged()).subscribe((val: string )=> {
        //         this.searchfilter(val);
        //     })
        

        this.tableConfig = {
            columns: [
              {title: "Name", dataProperty: "ComponentHead.ComponentName", sortable: true, sortOrder: true, filterable: true,},
              {title: "Price", dataProperty: "ComponentHead.Price", sortable: true, sortOrder: true, filterable: false},
              {title: "Chipset", dataProperty: "chipset", sortable: false, sortOrder: true, filterable: false},
              {title: "", dataProperty: "ROW_ACTIONS", sortable: false,sortOrder: false, filterable: false},
            ],
            rowActions:[
                {label: 'Add', actionFor:PCPART_CASE}
            ]
          }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}