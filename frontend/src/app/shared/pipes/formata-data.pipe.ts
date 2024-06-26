import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { DateFormats } from '../enums';

@Pipe({
  name: 'formataData',
})
export class FormataDataPipe implements PipeTransform {
  public transform(data?: string, formato?: string): string | undefined {
    if (!data || !formato) return data;

    if (formato === DateFormats.AAAA_MM_DD) {
      return format(parseISO(data), 'dd/MM/yyyy');
    } else if (formato === DateFormats.DD_MM_AAAA) {
      const dataSeparada = data.split('-');

      return `${dataSeparada[0]}/${dataSeparada[1]}/${dataSeparada[2]}`;
    } else if (formato === DateFormats.AAAA_MM_DD_TIMESTEMP) {
      const dataFormatada = new Date(data).toLocaleDateString();

      return dataFormatada;
    } else if (formato === DateFormats.ISO) {
      const dataParaFormatar = new Date(data);
      const primParteOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };
      const segParteOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };

      const primParteDataFormatada = this.formatadorData(
        dataParaFormatar,
        primParteOptions
      );
      const segParteDataFormatada = this.formatadorData(
        dataParaFormatar,
        segParteOptions
      );

      return `${primParteDataFormatada} ${segParteDataFormatada}`;
    }

    return;
  }

  private formatadorData(
    dataParaFormatar: Date,
    options: Intl.DateTimeFormatOptions
  ): string {
    const formatadorData = new Intl.DateTimeFormat('pt-BR', options);
    return formatadorData.format(dataParaFormatar);
  }
}
