import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { PCParts } from "../pcparts.model";
import { PCPartsService } from "../pcparts.service";
import { BuildDetails } from "../build-details.model";

@Injectable({ providedIn: 'root' })
export class PCPartsResolverService implements Resolve<BuildDetails[]> {

    constructor(private dataStorageService: DataStorageService, private pcPartsService: PCPartsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): BuildDetails[] | Observable<BuildDetails[]> | Promise<BuildDetails[]> {
        // const pcparts = this.pcPartsService.getPCparts();
        const build = this.pcPartsService.getBuild();

        if(!build){
            this.dataStorageService.getAllComponentTypes();
            return this.dataStorageService.getBuild();
        }
        else{
            if(JSON.parse(localStorage.getItem('userData'))){
                this.dataStorageService.getAllComponentTypes();
                return this.pcPartsService.getBuild();
            }
            if(!this.pcPartsService.lstComponentType){
                this.dataStorageService.getAllComponentTypes();
            }
           return build;
        }

    }
}
