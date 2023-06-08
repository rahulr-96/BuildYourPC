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
import { AvailableComponentTypes, ComponentType } from "../shared/component-type.model";
import { BuildCommandFactory, BuildCommandMap } from "../shared/build-commands";
import { CommandService } from "../shared/command.service";

@Injectable()
export class PCPartsService {

    //pcParts: PCParts = new PCParts();
    build: BuildDetails[];

    //pcPartsChanged = new Subject<PCParts>();
    buildChanged = new Subject<BuildDetails[]>();

    _currentBuildHeadID: number;

    ObslstComponentType = new BehaviorSubject<ComponentType[]>([]);
    lstComponentType: ComponentType[];

    private commandFactory: BuildCommandFactory;

    constructor(private commandService: CommandService) {
        this.commandFactory = new BuildCommandFactory();
    }

    setBuilld(objParts: AvailableComponentTypes) {

        const objBuild = new BuildDetails(objParts.ComponentHead.ComponentHeadID, 1, objParts, this.currentBuildHeadID)
        objBuild.ComponentHead = objParts.ComponentHead;
        this.storeBuild(objBuild)
    }

    getBuild() {
        return this.build;
    }

    storeBuild(objPart: BuildDetails) {
        if (!this.build) {
            this.build = []
        }
        this.build = [...this.build.filter(a => a.ComponentHead.ComponentTypeID != objPart.ComponentHead.ComponentTypeID), objPart]
        this.buildChanged.next(this.build)
    }

    updateBuild(lstBuildDetails: BuildDetails[]) {
        this.build = lstBuildDetails;
        this.buildChanged.next(this.build);
    }

    get currentBuildHeadID() {
        if (this._currentBuildHeadID) {
            return this._currentBuildHeadID;
        }
        else {
            return 0;
        }
    }
    set currentBuildHeadID(val: number) {
        this._currentBuildHeadID = val;
    }

    public executeCommand<K extends keyof BuildCommandMap>(key: K, commandData: BuildCommandMap[K]) {
        const command = this.commandFactory.create(key, commandData);
        this.commandService.execute(key, command);
    }

    public deletePart(item: BuildDetails): void {
        this.executeCommand('remove-from-collection', { collection: this.build, element: item });
      }

}
