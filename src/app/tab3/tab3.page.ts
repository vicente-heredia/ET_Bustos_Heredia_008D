import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  mostrarSecciones = false;  // Controla si mostrar las secciones
  secciones: string[] = ['Programación (001D)', 'Programación (002D)', 'Programación (003D)', 'Portafolio (013D)'];

  constructor(private menucontroller: MenuController, private router: Router) {}

  mostrarMenu() {
    this.menucontroller.open('first');
  }

  // Muestra u oculta las secciones al hacer clic en "INICIAR"
  mostrarListaSecciones() {
    this.mostrarSecciones = true;
  }

  // Redirige a la página de asistencia con la sección seleccionada
  redirigir(seccion: string) {
    this.router.navigate(['/asistencia', { seccion }]);
  }
}
