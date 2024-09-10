import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  eventos = [
    {
      titulo: 'Prueba de Matemáticas',
      fecha: '2024-09-15',
      descripcion: 'Examen final de la materia de Matemáticas. Revisa los temas de álgebra, geometría y trigonometría.'
    },
    {
      titulo: 'Entrega de Proyecto ',
      fecha: '2024-09-25',
      descripcion: 'Fecha límite para entregar el proyecto final de programación. Asegúrate de incluir todas las funcionalidades requeridas y pruebas unitarias.'
    },
    {
      titulo: 'Prueba oral de inglés',
      fecha: '2024-09-30',
      descripcion: 'Prepárate para la prueba oral de inglés. Revisa los temas de gramática, vocabulario y pronunciación.'
    }
  ];

  constructor(private menucontroller: MenuController) {}

  mostrarMenu() {
    this.menucontroller.open('first');
  }

  agregarEvento() {
    const nuevoEvento = {
      titulo: 'Nuevo evento',
      fecha: '',
      descripcion: ''
    };
    this.eventos.push(nuevoEvento);
  }

  eliminarEvento(index: number) {
    this.eventos.splice(index, 1);
  }
}

