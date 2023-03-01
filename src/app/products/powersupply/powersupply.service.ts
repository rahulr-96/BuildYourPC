import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Powersupply } from "src/app/products/Powersupply/Powersupply.model";

@Injectable()
export class PowersupplyService{
    private Powersupplys: Powersupply[] = [];
    PowersupplysChanged = new Subject<Powersupply[]>();

    getPowersupplys(){
        return this.Powersupplys;
    }

    setPowersupplys(Powersupplys: Powersupply[]){
        this.Powersupplys = Powersupplys;
        this.PowersupplysChanged.next(this.Powersupplys.slice());
    }
}