import { Case } from "../products/case/case.model";
import { CPUCooler } from "../products/cpu-cooler/cpu-cooler.model";
import { CPU } from "../products/cpu/cpu.model";
import { Memory } from "../products/memory/memory.model";
import { MotherBoard } from "../products/motherboard/motherboard.model";
import { Powersupply } from "../products/powersupply/powersupply.model";
import { Storage } from "../products/storage/storage.model";
import { Videocard } from "../products/videocard/videocard.model";



export class PCParts{
    CPUCooler: CPUCooler; 
    CPU: CPU;   
    MotherBoard: MotherBoard;
    Memory: Memory;
    Storage: Storage;
    Videocard: Videocard;
    Case: Case;
    Powersupply: Powersupply;
      
}