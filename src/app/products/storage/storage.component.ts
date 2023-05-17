import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Storage } from "src/app/products/storage/storage.model";
import { DataTableType, rowActions } from "src/app/shared/data-table/datatabletype.model";
import { PCPART_STORAGE } from "../products.type";
import { StorageService } from "./storage.service";

@Component({
    selector:'app-Storage',
    templateUrl:'./storage.component.html'
})
export class StorageComponent implements OnInit, OnDestroy{
    Storages: Storage[];
    subscription: Subscription;
    
    tableConfig: DataTableType;

    constructor(private StorageService: StorageService){}

    ngOnInit(): void {

        this.subscription = this.StorageService.StoragesChanged.subscribe((data: Storage[])=>{
            this.Storages = data;
        })
        
    
        this.Storages= this.StorageService.getStorages();
        

        this.tableConfig = {
            columns: [
              {title: "Name", dataProperty: "ComponentHead.ComponentName", sortable: true, sortOrder: true, filterable: true,},
              {title: "Price", dataProperty: "ComponentHead.Price", sortable: true, sortOrder: true, filterable: false},
              {title: "Capacity", dataProperty: "capacity", sortable: false, sortOrder: true, filterable: false},
              {title: "Type", dataProperty: "type", sortable: false, sortOrder: true, filterable: false},
              {title: "", dataProperty: "ROW_ACTIONS", sortable: false,sortOrder: false, filterable: false},
            ],
            rowActions:[
                {label: 'Add', actionFor:PCPART_STORAGE}
            ]
          }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}