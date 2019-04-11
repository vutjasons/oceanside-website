import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-carousel',
  templateUrl: './bs-carousel.component.html',
  styleUrls: ['./bs-carousel.component.css']
})
export class BsCarouselComponent implements OnInit {

  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor() { }

  ngOnInit() {
  }

}
