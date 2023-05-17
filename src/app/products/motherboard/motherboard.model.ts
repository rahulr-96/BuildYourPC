import { ComponentHead } from "src/app/shared/component-head.model";

export class MotherBoard {
  public id: number;
  public color: string;
  public form_factor: string;
  public memory_max: string;
  public memory_slots: string;
  public rating: number;
  public rating_count: number;
  public socket_cpu: string;
  public ComponentHead: ComponentHead
}
