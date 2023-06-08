import { Case } from "../products/case/case.model";
import { CPUCooler } from "../products/cpu-cooler/cpu-cooler.model";
import { CPU } from "../products/cpu/cpu.model";
import { Memory } from "../products/memory/memory.model";
import { MotherBoard } from "../products/motherboard/motherboard.model";
import { Powersupply } from "../products/powersupply/powersupply.model";
import { Storage } from "../products/storage/storage.model";
import { Videocard } from "../products/videocard/videocard.model";

export class ComponentType {
    public ComponentTypeID: number;
    public ComponentTypeCode: string;
    public ComponentTypeName: string;
    public image: string;
}

export declare type AvailableComponentTypes = CPU | Case | CPUCooler | Videocard | MotherBoard | Memory | Storage | Powersupply | Videocard
