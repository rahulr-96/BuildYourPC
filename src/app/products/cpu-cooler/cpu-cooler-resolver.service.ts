import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CPUCooler } from "src/app/products/cpu-cooler/cpu-cooler.model";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { CPUCoolerService } from "./cpu-cooler.service";

@Injectable({ providedIn: 'root' })
export class CPUCoolerResolverService implements Resolve<CPUCooler[]> {
    
    constructor(private dataStorageService: DataStorageService, private CPUCoolerService: CPUCoolerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CPUCooler[] | Observable<CPUCooler[]> | Promise<CPUCooler[]> {
        const CPUCoolers = this.CPUCoolerService.getCPUCoolers();
        if(CPUCoolers.length === 0 ){
            return this.dataStorageService.fetchCPUCooler();
        }
        else{
           return CPUCoolers;
        }
        
    }
}