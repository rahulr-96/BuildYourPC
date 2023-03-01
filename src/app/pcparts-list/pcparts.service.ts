import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CPUCooler } from "../products/cpu-cooler/cpu-cooler.model";
import { CPU } from "../products/cpu/cpu.model";
import { PCPART_CASE, PCPART_CPU, PCPART_CPUCOOLER, PCPART_MEMORY, PCPART_MOTHERBOARD, PCPART_POWERSUPPLY, PCPART_STORAGE, PCPART_VIDEOCARD, Products } from "../products/products.type";
import { DataStorageService } from "../shared/data-storage.service";
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

            case PCPART_STORAGE:
                this.pcParts.Storage = objPart.Storage;
                this.pcPartsChanged.next(this.pcParts);
                break;

            case PCPART_VIDEOCARD:
                this.pcParts.Videocard = objPart.Videocard;
                this.pcPartsChanged.next(this.pcParts);
                break;

            case PCPART_CASE:
                this.pcParts.Case = objPart.Case;
                this.pcPartsChanged.next(this.pcParts);
                break;

            case PCPART_POWERSUPPLY:
                this.pcParts.Powersupply = objPart.Powersupply;
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
