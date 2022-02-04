import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  private nbWords: number = 300

  constructor() { }

  formatSynopsis(text: string): string{
    let cutedText: string = text.substring(0, this.nbWords)
    return cutedText + " ..."
  }
}
