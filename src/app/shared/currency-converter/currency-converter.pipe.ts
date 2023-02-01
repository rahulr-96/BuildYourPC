import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'currencyConverter'
})
export class CurrencyConverterPipe implements PipeTransform{
    transform(value: any) {
        return (value * 80.98).toFixed(2);
    }
}