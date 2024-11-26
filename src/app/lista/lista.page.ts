import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  alumnos = [
    { nombre: 'Juan', apellido: 'Perez', codigo: '001D', asistencia: 'presente' },
    { nombre: 'Maria', apellido: 'Rodriguez', codigo: '002D', asistencia: 'presente' },
    { nombre: 'Carlos', apellido: 'Garcia', codigo: '003D', asistencia: 'ausente' },
    { nombre: 'Ana', apellido: 'Hernandez', codigo: '004D', asistencia: 'presente' },
    { nombre: 'Pedro', apellido: 'Lopez', codigo: '005D', asistencia: 'ausente' },
    { nombre: 'Sofia', apellido: 'Martinez', codigo: '006D', asistencia: 'presente' },
    { nombre: 'Luis', apellido: 'Gonzalez', codigo: '007D', asistencia: 'ausente' },
    { nombre: 'Isabel', apellido: 'Sanchez', codigo: '008D', asistencia: 'presente' },
    { nombre: 'Fernando', apellido: 'Diaz', codigo: '009D', asistencia: 'ausente' },
    { nombre: 'Elena', apellido: 'Romero', codigo: '010D', asistencia: 'presente' },
];

  constructor(private menuController: MenuController, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  mostrarMenu() {
    this.menuController.open('first');
  }
  async pasarAsistenciaManual() {
   
    this.alumnos.forEach(alumno => {
      const asistencia = alumno.asistencia; 
      console.log(`Alumno ${alumno.nombre} ${alumno.apellido} - Asistencia: ${asistencia}`);
    });
    
    this.router.navigate(['/tab1']);
  }
  




 
}