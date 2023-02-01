import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CPU } from "src/app/products/cpu/cpu.model";

@Injectable()
export class CPUService{
    private cpus: CPU[] = [];
    cpusChanged = new Subject<CPU[]>();

    getCpus(){
        return this.cpus;
    }

    setCpus(cpus: CPU[]){
        this.cpus = cpus;
        this.cpusChanged.next(this.cpus.slice());
    }

    filterCpus(val: string){

        if(val != ''){
            this.cpusChanged.next(this.cpus.filter(cpu => cpu.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ));
        }
        else{
            this.cpusChanged.next(this.cpus.slice());
        }
    }
}