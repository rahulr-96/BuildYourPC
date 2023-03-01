import { CPU } from "./cpu/cpu.model";
import { CPUCooler } from "./cpu-cooler/cpu-cooler.model";
import { MotherBoard } from "./motherboard/motherboard.model";
import { Memory } from "./memory/memory.model";
import { Storage } from "./storage/storage.model";
import { Videocard } from "./videocard/videocard.model";
import { Case } from "./case/case.model";
import { Powersupply } from "./powersupply/powersupply.model";

export const PCPART_CPU='cpu'
export const PCPART_CPUCOOLER='cpuCooler'
export const PCPART_MOTHERBOARD='motherboard'
export const PCPART_MEMORY='memory'
export const PCPART_STORAGE='storage'
export const PCPART_VIDEOCARD='videocard'
export const PCPART_CASE='case'
export const PCPART_POWERSUPPLY='powersupply'

export class Products{
    CPU: CPU;
    CPUCooler: CPUCooler;
    MotherBoard: MotherBoard;
    Memory: Memory;
    Storage: Storage;
    Videocard: Videocard;
    Case: Case;
    Powersupply: Powersupply;
}