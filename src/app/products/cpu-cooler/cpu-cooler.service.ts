import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CPUCooler } from "src/app/products/cpu-cooler/cpu-cooler.model";

@Injectable()
export class CPUCoolerService{
    private CPUCoolers: CPUCooler[] = [];
    CPUCoolersChanged = new Subject<CPUCooler[]>();

    getCPUCoolers(){
        return this.CPUCoolers;
    }

    setCPUCoolers(CPUCoolers: CPUCooler[]){
        this.CPUCoolers = CPUCoolers;
        this.CPUCoolersChanged.next(this.CPUCoolers.slice());
    }
}