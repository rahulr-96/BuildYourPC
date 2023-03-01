import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Powersupply } from "src/app/products/powersupply/powersupply.model";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { PowersupplyService } from "./powersupply.service";

@Injectable({ providedIn: 'root' })
export class PowersupplyResolverService implements Resolve<Powersupply[]> {
    
    constructor(private dataStorageService: DataStorageService, private PowersupplyService: PowersupplyService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Powersupply[] | Observable<Powersupply[]> | Promise<Powersupply[]> {
        const Powersupplys = this.PowersupplyService.getPowersupplys();
        if(Powersupplys.length === 0 ){
            return this.dataStorageService.fetchPowersupply();
        }
        else{
           return Powersupplys;
        }
        
    }
}