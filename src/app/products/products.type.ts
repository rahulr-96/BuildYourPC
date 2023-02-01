import { CPU } from "./cpu/cpu.model";
import { CPUCooler } from "./cpu-cooler/cpu-cooler.model";

export const PCPART_CPU='cpu'
export const PCPART_CPUCOOLER='cpuCooler'

export class Products{
    CPU: CPU;
    CPUCooler: CPUCooler
}