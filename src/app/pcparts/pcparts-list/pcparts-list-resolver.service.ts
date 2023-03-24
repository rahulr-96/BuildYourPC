import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { PCParts } from "../pcparts.model";
import { PCPartsService } from "../pcparts.service";

@Injectable({ providedIn: 'root' })
export class PCPartsResolverService implements Resolve<PCParts> {

    constructor(private dataStorageService: DataStorageService, private pcPartsService: PCPartsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): PCParts | Observable<PCParts> | Promise<PCParts> {
        const pcparts = this.pcPartsService.getPCparts();

        if(Object.keys(pcparts).length == 0){
            return this.dataStorageService.fetchPCParts();
        }
        else{
           return pcparts;
        }

    }
}
