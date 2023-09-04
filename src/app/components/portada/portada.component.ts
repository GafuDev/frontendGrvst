import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent {
  carouselImages = [
    'assets/images/carousel-image1.jpg',
    'assets/images/carousel-image2.jpg',
    'assets/images/carousel-image3.jpg'
  ];
  cardImages = [
    'assets/images/card-image1.jpg',
    'assets/images/card-image2.jpg'
  ];
}
