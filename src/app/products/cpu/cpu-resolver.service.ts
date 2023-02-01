import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CPU } from "src/app/products/cpu/cpu.model";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { CPUService } from "./cpu.service";

@Injectable({ providedIn: 'root' })
export class CPUResolverService implements Resolve<CPU[]> {
    
    constructor(private dataStorageService: DataStorageService, private cpuService: CPUService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CPU[] | Observable<CPU[]> | Promise<CPU[]> {
        const cpus = this.cpuService.getCpus();
        if(cpus.length === 0 ){
            return this.dataStorageService.fetchCPU();
        }
        else{
           return cpus;
        }
        
    }
}