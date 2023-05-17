import { ComponentHead } from "src/app/shared/component-head.model";

export class CPUCooler {
  public id: number;
  public fan_rpm: string;
  public noise_level: string;
  public rating: number;
  public rating_count: number;
  public ComponentHead: ComponentHead
}
