import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MotherBoard } from "src/app/products/motherboard/motherboard.model";
import { DataTableType, rowActions } from "src/app/shared/data-table/datatabletype.model";
import { PCPART_MOTHERBOARD } from "../products.type";
import { MotherBoardService } from "./motherboard.service";

@Component({
    selector:'app-MotherBoard',
    templateUrl:'./motherboard.component.html'
})
export class MotherBoardComponent implements OnInit, OnDestroy{
    MotherBoards: MotherBoard[];
    subscription: Subscription;
    
    tableConfig: DataTableType;

    constructor(private MotherBoardService: MotherBoardService){}

    ngOnInit(): void {

        this.subscription = this.MotherBoardService.MotherBoardsChanged.subscribe((data: MotherBoard[])=>{
            this.MotherBoards = data;
        })
        
    
        this.MotherBoards= this.MotherBoardService.getMotherBoards();

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
                {label: 'Add', actionFor:PCPART_MOTHERBOARD}
            ]
          }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}