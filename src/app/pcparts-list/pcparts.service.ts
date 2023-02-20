import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CPUCooler } from "../products/cpu-cooler/cpu-cooler.model";
import { CPU } from "../products/cpu/cpu.model";
import { PCPART_CPU, PCPART_CPUCOOLER, PCPART_MEMORY, PCPART_MOTHERBOARD, Products } from "../products/products.type";
import { PCParts } from "./pcparts.model";

@Injectable()
export class PCPartsService{

    pcParts: PCParts = new PCParts();
    pcPartsChanged = new Subject<PCParts>();

    storePCparts(part: string, objPart:PCParts){
        switch(part){
            case PCPART_CPU:
                this.pcParts.CPU = objPart.CPU;
                this.pcPartsChanged.next(this.pcParts)
                break;
            case PCPART_CPUCOOLER:
                this.pcParts.CPUCooler = objPart.CPUCooler;
                this.pcPartsChanged.next(this.pcParts);
                break;   
                
            case PCPART_MOTHERBOARD:
                this.pcParts.MotherBoard = objPart.MotherBoard;
                this.pcPartsChanged.next(this.pcParts);
                break;

            case PCPART_MEMORY:
                this.pcParts.Memory = objPart.Memory;
                this.pcPartsChanged.next(this.pcParts);
                break; 
        }
    }

    storeAllPCparts(objParts:PCParts){
        this.pcParts = objParts;
        this.pcPartsChanged.next(this.pcParts);
    }

    getPCparts(){
        return this.pcParts;
    }

}