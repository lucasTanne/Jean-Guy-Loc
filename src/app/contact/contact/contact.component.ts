import { Component, OnInit } from '@angular/core';
import { PrinterService } from 'src/app/film/services/printer.service';
import { PrintMenuService } from 'src/app/services/print-menu.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private printMenuService : PrintMenuService ) { 
    this.printMenuService.setPrintMenu(true)
  }

  ngOnInit(): void {
  }

}
