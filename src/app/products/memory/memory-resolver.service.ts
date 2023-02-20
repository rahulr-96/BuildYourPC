import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Memory } from "src/app/products/memory/memory.model";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { MemoryService } from "./memory.service";

@Injectable({ providedIn: 'root' })
export class MemoryResolverService implements Resolve<Memory[]> {
    
    constructor(private dataStorageService: DataStorageService, private memoryService: MemoryService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Memory[] | Observable<Memory[]> | Promise<Memory[]> {
        const memorys = this.memoryService.getMemorys();
        if(memorys.length === 0 ){
            return this.dataStorageService.fetchMemory();
        }
        else{
           return memorys;
        }
        
    }
}