import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { MotherBoard } from "src/app/products/motherboard/motherboard.model";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { MotherBoardService } from "./motherboard.service";

@Injectable({ providedIn: 'root' })
export class MotherBoardResolverService implements Resolve<MotherBoard[]> {
    
    constructor(private dataStorageService: DataStorageService, private MotherBoardService: MotherBoardService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MotherBoard[] | Observable<MotherBoard[]> | Promise<MotherBoard[]> {
        const MotherBoards = this.MotherBoardService.getMotherBoards();
        if(MotherBoards.length === 0 ){
            return this.dataStorageService.fetchMotherBoard();
        }
        else{
           return MotherBoards;
        }
        
    }
}