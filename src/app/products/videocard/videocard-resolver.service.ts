import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Videocard } from "src/app/products/videocard/videocard.model";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { VideocardService } from "./videocard.service";

@Injectable({ providedIn: 'root' })
export class VideocardResolverService implements Resolve<Videocard[]> {
    
    constructor(private dataStorageService: DataStorageService, private VideocardService: VideocardService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Videocard[] | Observable<Videocard[]> | Promise<Videocard[]> {
        const Videocards = this.VideocardService.getVideocards();
        if(Videocards.length === 0 ){
            return this.dataStorageService.fetchVideocard();
        }
        else{
           return Videocards;
        }
        
    }
}