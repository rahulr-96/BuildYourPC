import { ComponentHead } from "src/app/shared/component-head.model"

export class CPU {
  public id: number;
  public boost_clock: string;
  public core_clock: string;
  public core_count: string;
  public rating: number;
  public rating_count: number;
  public smt: true;
  public tdp: string;
  public ComponentHead: ComponentHead

}
