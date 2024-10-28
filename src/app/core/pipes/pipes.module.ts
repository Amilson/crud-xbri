import { CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormatCurrencyPipe } from './format-currency';

@NgModule({
  declarations: [FormatCurrencyPipe],
  exports: [FormatCurrencyPipe],
  providers: [CurrencyPipe]
})
export class PipesModule {}
