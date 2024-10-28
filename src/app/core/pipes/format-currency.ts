import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {
    // not to do
  }

  transform(value: any, symbol = 'symbol') {
    try {
      return this.currencyPipe.transform(value, 'BRL', symbol, '', 'pt-BR');
    } catch (e) {
      // not to do
    }
    return value;
  }
}
