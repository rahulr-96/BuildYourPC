import { Component } from "@angular/core";
import { CPU } from "../products/cpu/cpu.model";
import { PCParts } from "./pcparts.model";
import { PCPartsService } from "./pcparts.service";

@Component({
    selector:'app-pcparts-list',
    templateUrl:'./pcparts-list.component.html'
})
export class PCPartsListComponent{  

    constructor(private pcPartsService: PCPartsService){}

    _pcparts: PCParts

    ngOnInit(){
        this._pcparts = this.pcPartsService.getPCparts();
    }

}