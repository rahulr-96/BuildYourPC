import { Case } from "../products/case/case.model";
import { CPUCooler } from "../products/cpu-cooler/cpu-cooler.model";
import { CPU } from "../products/cpu/cpu.model";
import { Videocard } from "../products/videocard/videocard.model";
import { ComponentType } from "./component-type.model";

export class ComponentHead{
    public ComponentHeadID: number;
    public ComponentName: string;
    public Price: number;
    public ComponentTypeID: number;
    public ComponentTypeCode: string;
    public ComponentTypeName: string;
    public image: string;
    public ComponentType: ComponentType
}