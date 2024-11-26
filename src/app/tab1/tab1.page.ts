import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  images: string[] = [
    'assets/sede.jpeg',
    'assets/personas.jpg',
    'assets/personas2.jpg',
  ];
  currentIndex: number = 0;

  constructor(
    private menuController: MenuController,
    private router: Router  
  ) {}


  ngOnInit() {
    this.startCarousel();
  }
  // Mostrar menú lateral
  mostrarMenu() {
    this.menuController.open('first');
  }


  // Navegar a Clases
  mostrarClases() {
    this.router.navigate(['/tabs/tab2']); 
  }

  // Navegar a Mi Perfil
  irAMiPerfil() {
    this.router.navigate(['/tabs/tab4']); // Ajusta la ruta según tu configuración
  }
  IrAjustificaciones() {
    this.router.navigate(['/tabs/tab8']); // Ajusta la ruta según tu configuración
  }

  // Navegar a Escanear QR
  irAEscanearQR() {
    this.router.navigate(['/tabs/tab3']); // Ajusta la ruta según tu configuración
  }
  startCarousel() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000); // Cambia cada 3 segundos
  }

  
}
