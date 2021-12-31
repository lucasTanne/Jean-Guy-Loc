import { Component, Input } from '@angular/core';
import { FilmItem } from 'src/types/film-item';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() public films: FilmItem[] = []

  constructor() {
  }

}
