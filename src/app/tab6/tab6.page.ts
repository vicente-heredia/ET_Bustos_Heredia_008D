import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {

  calificaciones = [
    {
      materia: 'Estadistica',
      calificaciones: [
        { num: '1', nota: 3.5 },
        { num: '2', nota: 6.9 },
        { num: '3', nota: 7 }
      ]
    },
    {
      materia: 'Antropologia',
      calificaciones: [
        { num: '1', nota: 6.7 },
        { num: '2', nota: 4.0 },
        { num: '3', nota: 3.0 }
      ]
    },
    {
      materia: 'Programacion',
      calificaciones: [
        { num: '1', nota: 4 },
        { num: '2', nota: 6 },
        { num: '3', nota: 5.0 }
      ]
    },
    {
      materia: 'Base de Datos',
      calificaciones: [
        { num: '1', nota: 5.9 },
        { num: '2', nota: 6 },
        { num: '3', nota: 5.0 }
      ]
    },
    {
      materia: 'Ingles II',
      calificaciones: [
        { num: '1', nota: 7 },
        { num: '2', nota: 7 },
        { num: '3', nota: 6.2 }
      ]
    }
  ];

  constructor(private menuController: MenuController) { }

  ngOnInit() {
  }

  mostrarMenu() {
    this.menuController.open('first');
  }


  
}
