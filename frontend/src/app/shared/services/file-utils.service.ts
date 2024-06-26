import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUtilsService {
  public conveteParaBase64(file: File): Promise<unknown> {
    return new Promise(
      (resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error: ProgressEvent<FileReader>) => {
          return reject(error);
        };
      }
    );
  }
  // Exemplo de função para decodificar Base64 para uma URL de dados
  public base64ToDataURL(base64: string): string {
    const byteString = window.atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return `data:${mimeString};base64,${btoa(
      String.fromCharCode(...new Uint8Array(ab))
    )}`;
  }
}
