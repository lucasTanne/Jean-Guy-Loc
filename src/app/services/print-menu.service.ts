import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintMenuService {
  printMenu: boolean = false

  constructor() { }

  setPrintMenu(value: boolean): void {
    this.printMenu = value
  }

  getPrintMenu(): boolean {
    return this.printMenu
  }
}
