import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Memory } from "src/app/products/memory/memory.model";

@Injectable()
export class MemoryService{
    private Memorys: Memory[] = [];
    MemorysChanged = new Subject<Memory[]>();

    getMemorys(){
        return this.Memorys;
    }

    setMemorys(Memorys: Memory[]){
        this.Memorys = Memorys;
        this.MemorysChanged.next(this.Memorys.slice());
    }
}