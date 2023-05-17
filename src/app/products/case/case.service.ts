import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Case } from "./case.model";

@Injectable()
export class CaseService{
    private Cases: Case[] = [];
    CasesChanged = new Subject<Case[]>();

    getCases(){
        return this.Cases;
    }

    setCases(Cases: Case[]){
        this.Cases = Cases;
        this.CasesChanged.next(this.Cases.slice());
    }
}