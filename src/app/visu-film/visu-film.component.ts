import { Component, OnInit } from '@angular/core';
import { PrintMenuService } from '../services/print-menu.service';
import { faPlay} from '@fortawesome/free-solid-svg-icons';
import { library} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-visu-film',
  templateUrl: './visu-film.component.html',
  styleUrls: ['./visu-film.component.css']
})
export class VisuFilmComponent implements OnInit {
  faPlay = faPlay;
  constructor(private printMenuService : PrintMenuService) { 
    this.printMenuService.setPrintMenu(true);
  }
  
  ngOnInit(): void {
  }

}
