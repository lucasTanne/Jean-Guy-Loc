import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compteur',
  templateUrl: './compteur.component.html',
  styleUrls: ['./compteur.component.css']
})
export class CompteurComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterContentChecked(): void {
    const counters = document.querySelectorAll('.value');
    const speed = 20;

    counters.forEach( counter => {
    const animate = () => {
        const value : string | null= counter.getAttribute('akhi');
        const data = +counter.innerHTML;
        if (value !== null){
          const time = +value / speed;
        
          if(data < +value) {
              counter.innerHTML = Math.ceil(data + time).toString();
              setTimeout(animate, 1);
            }else{
              counter.innerHTML = value;
            }
        
          }
        }
    animate();
    });

  }

}
