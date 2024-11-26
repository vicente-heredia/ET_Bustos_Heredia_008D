import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {
  seccionSeleccionada: string = '';

  
  qrCode: string | null = null;

  
  selectedDay: string = 'lunes'; 

  
  estudiantes: any[] = [
    { nombre: 'Juan Pérez', notas: [6.5, 4.2, 5.8] },
    { nombre: 'María Rodríguez', notas: [6.5, 4.2, 5.8] },
    { nombre: 'Pedro García', notas: [6.5, 4.2, 5.8] },
    { nombre: 'Ana López', notas: [6.5, 4.2, 5.8] },
    { nombre: 'Carlos Díaz', notas: [6.5, 4.2, 5.8] },
    { nombre: 'Sofía Gómez', notas: [6.5, 4.2, 5.8] },
    { nombre: 'Miguel Hernández', notas: [6.5, 4.2, 5.8] },
    { nombre: 'Elena Martínez', notas: [6.5, 4.2, 5.8] },
    { nombre: 'Daniel Sánchez', notas: [6.5, 4.2, 5.8] },
    { nombre: 'Isabel González', notas: [6.5, 4.2, 5.8] },
    { nombre: 'Francisco Ramírez', notas: [6.5, 4.2, 5.8] },
    { nombre: 'Cristina Moreno', notas: [6.5, 4.2, 5.8] },
    { nombre: 'Javier Álvarez', notas: [6.5, 4.2, 5.8] },
    { nombre: 'Verónica Torres', notas: [6.5, 4.2, 5.8] },
    { nombre: 'Rafael Reyes', notas: [6.5, 4.2, 5.8] },
  ];

  expandedIndex: number | null = null;

  promedio: string = '';

  constructor(private alertController: AlertController,
              private menuController: MenuController,
               private router: Router,
              private navController: NavController) { }

  ngOnInit() {
    const estudiante = this.estudiantes[0]; // selecciona el primer estudiante
    this.promedio = this.calcularPromedio(estudiante).toString();
    console.log(`El promedio del primer estudiante es: ${this.promedio}`);

    
  }
  

  
  mostrarMenu() {
    this.menuController.open('first');
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

  calcularPromedio(estudiante: any) {
    if (!estudiante || !estudiante.notas) {
      return 0;
    }
    const sum = estudiante.notas.reduce((a: number, b: number) => a + b, 0);
    return (sum / estudiante.notas.length).toFixed(1);
  }

  toggleNotas(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
 
 
}