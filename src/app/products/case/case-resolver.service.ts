import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Case } from "src/app/products/case/case.model";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { CaseService } from "./case.service";

@Injectable({ providedIn: 'root' })
export class CaseResolverService implements Resolve<Case[]> {
    
    constructor(private dataStorageService: DataStorageService, private CaseService: CaseService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Case[] | Observable<Case[]> | Promise<Case[]> {
        const Cases = this.CaseService.getCases();
        if(Cases.length === 0 ){
            return this.dataStorageService.fetchCase();
        }
        else{
           return Cases;
        }
        
    }
}