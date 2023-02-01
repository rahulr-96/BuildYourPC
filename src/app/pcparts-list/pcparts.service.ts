import { Injectable } from "@angular/core";
import { CPUCooler } from "../products/cpu-cooler/cpu-cooler.model";
import { CPU } from "../products/cpu/cpu.model";
import { PCPART_CPU, PCPART_CPUCOOLER, Products } from "../products/products.type";
import { PCParts } from "./pcparts.model";

@Injectable()
export class PCPartsService{

    pcParts: PCParts = new PCParts();

    storePCparts(part: string, objPart:PCParts){
        switch(part){
            case PCPART_CPU:
                this.pcParts.CPU = objPart.CPU
                break;
            case PCPART_CPUCOOLER:
                this.pcParts.CPUCooler = objPart.CPUCooler;
                break;            
        }
    }

    getPCparts(){
        return this.pcParts;
    }

}