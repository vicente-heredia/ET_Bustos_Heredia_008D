import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Clase {
  nombre: string;
  horario: string;
  profesor: string;
  sala: string ;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  qrCode: string | null = null;
  selectedDay: string = 'lunes';

  constructor(private alertcontroller: AlertController,
    private menucontroller: MenuController,
    private router: Router) { }

  mostrarMenu() {
    this.menucontroller.open('first');
  }

  getDayName(day: string): string {
    const days: { [key: string]: string } = {
      lunes: 'Lunes',
      martes: 'Martes',
      miércoles: 'Miércoles',
      jueves: 'Jueves',
      viernes: 'Viernes'
    };
    return days[day] || 'Desconocido';
  }

  getClassesForDay(day: string): Clase[] {
    const schedule: { [key: string]: Clase[] } = {
      lunes: [
        {
          nombre: 'Matemática Aplicada',
          horario: '10:00 AM',
          profesor: 'Carla Caceres',
          sala: '224'
        },
        {
          nombre: 'Programación',
          horario: '12:00 PM',
          profesor: 'Mariangeles Robinson',
          sala: '202'
        }
      ],
      martes: [
        {
          nombre: 'Antropología',
          horario: '2:00 PM',
          profesor: 'Pedro García',
          sala: '303'
        },
        {
          nombre: 'Portafolio',
          horario: '4:00 PM',
          profesor: 'Daniel Montero',
          sala: '441'
        }
      ],
      miércoles: [
        {
          nombre: 'Base de Datos',
          horario: '10:00 AM',
          profesor: 'Alex Aguilera',
          sala: '208'
        },
        {
          nombre: 'Ingles',
          horario: '12:00 PM',
          profesor: 'Roberto Becerra',
          sala: '223'
        }
      ],
      jueves: [
        {
          nombre: 'Programacion App Moviles',
          horario: '2:00 PM',
          profesor: 'Viviana Poblete',
          sala: '209'
        },
        {
          nombre: 'Programacion App Moviles',
          horario: '4:00 PM',
          profesor: 'Viviana Poblete',
          sala: '209'
        }
      ],
      viernes: [
        {
          nombre: 'Ingles',
          horario: '10:00 AM',
          profesor: 'Roberto Becerra',
          sala: '223'
        },
        {
          nombre: 'Matemática Aplicada',
          horario: '12:00 PM',
          profesor: 'Carla Caceres',
          sala: '224'
        }
      ]
    };
    return schedule[day] || [];
  }

  marcarAsistencia() {
    this.router.navigate(['tabs', 'tab7']);
  }
}

