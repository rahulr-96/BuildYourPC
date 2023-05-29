import { Case } from "../products/case/case.model";
import { CPUCooler } from "../products/cpu-cooler/cpu-cooler.model";
import { CPU } from "../products/cpu/cpu.model";
import { Memory } from "../products/memory/memory.model";
import { MotherBoard } from "../products/motherboard/motherboard.model";
import { Powersupply } from "../products/powersupply/powersupply.model";
import { Storage } from "../products/storage/storage.model";
import { Videocard } from "../products/videocard/videocard.model";
import { ComponentHead } from "../shared/component-head.model";
import { BuildHead } from "./build-head.model";

export class BuildDetails{
    public ComponentHead: ComponentHead;
    public BuildDetailsID: number;
    constructor(
       public ComponentHeadID: number,
       public quantity: number,
       public details: CPU | Case | CPUCooler | Videocard | MotherBoard | Memory | Storage | Powersupply | Videocard,
       public build_headid: number
    ){}
}