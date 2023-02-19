import { CPU } from "./cpu/cpu.model";
import { CPUCooler } from "./cpu-cooler/cpu-cooler.model";
import { MotherBoard } from "./motherboard/motherboard.model";

export const PCPART_CPU='cpu'
export const PCPART_CPUCOOLER='cpuCooler'
export const PCPART_MOTHERBOARD='motherboard'

export class Products{
    CPU: CPU;
    CPUCooler: CPUCooler;
    MotherBoard: MotherBoard;
}