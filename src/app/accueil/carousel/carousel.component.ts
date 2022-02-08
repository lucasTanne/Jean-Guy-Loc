import { Component, Input } from '@angular/core';
import { FilmCaroussel } from 'src/types/film-item';



@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() public films: FilmCaroussel[] = []

  constructor() {
  }

  ngAfterContentChecked(): void {
    let items = document.querySelectorAll('.carousel .carousel-item')

    items.forEach((el) => {
        const minPerSlide = 5
        let next = el.nextElementSibling
        for (var i=1; i<minPerSlide; i++) {
            if (!next) {
                // wrap carousel by using first child
              next = items[0]
            }
            let cloneChild = next.cloneNode(true)
            el.appendChild(cloneChild.childNodes[0])
            next = next.nextElementSibling
        }
    })

  }


}
