import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numeroFloat',
})
export class NumberFloatPipe implements PipeTransform {
  public transform(value: number): string | number {
    if (isNaN(value)) return value;

    const valueString = value.toString().replace('.', ',');
    const parts = valueString.split(',');
    const firstPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    if (!parts[1]) {
      const formatedValue = firstPart + ',' + '00';

      return formatedValue;
    }

    const formatedValue =
      firstPart + ',' + (parts[1].length < 2 ? `${parts[1]}0` : parts[1]);

    return formatedValue;
  }
}
