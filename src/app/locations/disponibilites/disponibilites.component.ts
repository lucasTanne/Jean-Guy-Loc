import { Component, OnInit } from '@angular/core';
import { PrintMenuService } from 'src/app/services/print-menu.service';

@Component({
  selector: 'app-disponibilites',
  templateUrl: './disponibilites.component.html',
  styleUrls: ['./disponibilites.component.css']
})
export class DisponibilitesComponent implements OnInit {

  constructor(private printMenuService: PrintMenuService) {
    this.printMenuService.setPrintMenu(true)
  }

  ngOnInit(): void {
  }

}
