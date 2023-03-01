import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Storage } from "src/app/products/storage/storage.model";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: 'root' })
export class StorageResolverService implements Resolve<Storage[]> {
    
    constructor(private dataStorageService: DataStorageService, private storageService: StorageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Storage[] | Observable<Storage[]> | Promise<Storage[]> {
        const storages = this.storageService.getStorages();
        if(storages.length === 0 ){
            return this.dataStorageService.fetchStorage();
        }
        else{
           return storages;
        }
        
    }
}