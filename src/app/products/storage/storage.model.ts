export class Storage {
  constructor(
    public form_factor: string,
    public cache: string,
    public type: string,
    public name: string,
    public price_usd: number,
    public rating: number,
    public rating_count: number,
    public capacity: string,
  ){}
}
