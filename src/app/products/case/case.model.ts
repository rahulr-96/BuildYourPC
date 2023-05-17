import { ComponentHead } from "src/app/shared/component-head.model";

export class Case {
  public id: number;
  public color: string;
  public chipset: string;
  public memory: string;
  public rating: number;
  public rating_count: number;
  public core_clock: string;
  public boost_clock: string;
  public length: string;
  public ComponentHead: ComponentHead
}
