export class CPU {
  constructor(
    public boost_clock: string,
    public core_clock: string,
    public core_count: string,
    public name: string,
    public price_usd: number,
    public rating: number,
    public rating_count: number,
    public smt: true,
    public tdp: string
  ){}
}
