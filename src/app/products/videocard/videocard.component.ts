import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Videocard } from "src/app/products/videocard/videocard.model";
import { DataTableType, rowActions } from "src/app/shared/data-table/datatabletype.model";
import { PCPART_MOTHERBOARD, PCPART_VIDEOCARD } from "../products.type";
import { VideocardService } from "./videocard.service";

@Component({
    selector:'app-Videocard',
    templateUrl:'./videocard.component.html'
})
export class VideocardComponent implements OnInit, OnDestroy{
    Videocards: Videocard[];
    subscription: Subscription;
    
    tableConfig: DataTableType;

    constructor(private VideocardService: VideocardService){}

    ngOnInit(): void {

        this.subscription = this.VideocardService.VideocardsChanged.subscribe((data: Videocard[])=>{
            this.Videocards = data;
        })
        
    
        this.Videocards= this.VideocardService.getVideocards();

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
                {label: 'Add', actionFor:PCPART_VIDEOCARD}
            ]
          }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}