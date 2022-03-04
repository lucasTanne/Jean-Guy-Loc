import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintMenuService {
  printMenu: boolean = false
  admin: boolean =false;
  connected: boolean = false

  constructor() { }

  setPrintMenu(value: boolean): void {
    this.printMenu = value
  }

  getPrintMenu(): boolean {
    return this.printMenu
  }

  setConnected(value: boolean): void {
    this.connected = value
  }

  getConnected(): boolean {
    return this.connected
  }

  setAdmin(value: boolean): void {
    this.admin = value;
  }

  getAdmin(): boolean {
    return this.admin;
  }
}
