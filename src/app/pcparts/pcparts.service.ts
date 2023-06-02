import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { CPUCooler } from "../products/cpu-cooler/cpu-cooler.model";
import { CPU } from "../products/cpu/cpu.model";
import { PCPART_CASE, PCPART_CPU, PCPART_CPUCOOLER, PCPART_MEMORY, PCPART_MOTHERBOARD, PCPART_POWERSUPPLY, PCPART_STORAGE, PCPART_VIDEOCARD, Products } from "../products/products.type";
import { DataStorageService } from "../shared/data-storage.service";
import { PCParts } from "./pcparts.model";
import { BuildDetails } from "./build-details.model";
import { MotherBoard } from "../products/motherboard/motherboard.model";
import { Memory } from "../products/memory/memory.model";
import { Storage } from "../products/storage/storage.model";
import { Videocard } from "../products/videocard/videocard.model";
import { Case } from "../products/case/case.model";
import { Powersupply } from "../products/powersupply/powersupply.model";
import { ComponentType } from "../shared/component-type.model";

@Injectable()
export class PCPartsService{

    //pcParts: PCParts = new PCParts();
    build: BuildDetails[];

    //pcPartsChanged = new Subject<PCParts>();
    buildChanged = new Subject<BuildDetails[]>();

    _currentBuildHeadID: number;

    ObslstComponentType = new BehaviorSubject<ComponentType[]>([]);
    lstComponentType : ComponentType[]

    constructor(){

    }

    // storePCparts(part: string, objPart:PCParts){

    //     switch(part){
    //         case PCPART_CPU:
    //             this.pcParts.CPU = objPart.CPU;
    //             this.pcPartsChanged.next(this.pcParts)
    //             break;
    //         case PCPART_CPUCOOLER:
    //             this.pcParts.CPUCooler = objPart.CPUCooler;
    //             this.pcPartsChanged.next(this.pcParts);
    //             break;

    //         case PCPART_MOTHERBOARD:
    //             this.pcParts.MotherBoard = objPart.MotherBoard;
    //             this.pcPartsChanged.next(this.pcParts);
    //             break;

    //         case PCPART_MEMORY:
    //             this.pcParts.Memory = objPart.Memory;
    //             this.pcPartsChanged.next(this.pcParts);
    //             break;

    //         case PCPART_STORAGE:
    //             this.pcParts.Storage = objPart.Storage;
    //             this.pcPartsChanged.next(this.pcParts);
    //             break;

    //         case PCPART_VIDEOCARD:
    //             this.pcParts.Videocard = objPart.Videocard;
    //             this.pcPartsChanged.next(this.pcParts);
    //             break;

    //         case PCPART_CASE:
    //             this.pcParts.Case = objPart.Case;
    //             this.pcPartsChanged.next(this.pcParts);
    //             break;

    //         case PCPART_POWERSUPPLY:
    //             this.pcParts.Powersupply = objPart.Powersupply;
    //             this.pcPartsChanged.next(this.pcParts);
    //             break;
    //     }

    // }

    // storeAllPCparts(objParts:PCParts){
    //     this.pcParts = objParts;
    //     this.pcPartsChanged.next(this.pcParts);
    // }
    //todo make a common model or type for these parts
    setBuilld(objParts:CPU | CPUCooler | MotherBoard | Memory | Storage | Videocard | Case | Powersupply){

        const objBuild = new BuildDetails(objParts.ComponentHead.ComponentHeadID, 1, objParts, this.currentBuildHeadID)
        objBuild.ComponentHead = objParts.ComponentHead;
        this.storeBuild(objBuild)
    }

    // getPCparts(){
    //     return this.pcParts;
    // }

    getBuild(){
        return this.build;
    }

    storeBuild(objPart:BuildDetails){
        if(!this.build){
            this.build = []
        }
        this.build = [...this.build.filter(a => a.ComponentHead.ComponentTypeID != objPart.ComponentHead.ComponentTypeID), objPart ]
        this.buildChanged.next(this.build)
    }

    updateBuild(lstBuildDetails: BuildDetails[]){
        this.build = lstBuildDetails;
        this.buildChanged.next(this.build);
    }

    get currentBuildHeadID(){
        if(this._currentBuildHeadID){
            return this._currentBuildHeadID;
        }
        else{
            return 0;
        }
    }
    set currentBuildHeadID(val: number){
        this._currentBuildHeadID = val;
    }



}
