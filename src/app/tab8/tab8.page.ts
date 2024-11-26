import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { justificacion } from '../../interfaces/justificacion';
import { Observable } from 'rxjs';  // Importar Observable
import { map, switchMap, catchError } from 'rxjs/operators';  // Importar operadores rxjs
import { HttpClient } from '@angular/common/http';  // Importar HttpClient
import { environment } from '../../environments/environment';  // Importar environment
import { of } from 'rxjs';  // Importar of

@Component({
  selector: 'app-tab8',
  templateUrl: './tab8.page.html',
  styleUrls: ['./tab8.page.scss'],
})
export class Tab8Page implements OnInit {
  justificacion: justificacion[] = [];

  constructor(
    private authservice: AuthService,
    private alertController: AlertController,
    private menuController: MenuController,
    private router: Router,
    private navController: NavController,
    private httpclient: HttpClient  // Asegúrate de inyectar HttpClient aquí
  ) { }

  ngOnInit() {
    this.cargarJustificaciones(); // Llama al método para cargar las justificaciones
  }

  // Método para cargar las justificaciones desde el servicio
  cargarJustificaciones() {
    this.authservice.getJustificaciones().subscribe(
      (data: justificacion[]) => {
        this.justificacion = data; // Asigna las justificaciones al arreglo
      },
      (error) => {
        console.error('Error al cargar las justificaciones', error); // Manejo de errores
      }
    );
  }

  guardarComentario(id: string, comentario: string) {
    if (comentario) {
      this.authservice.agregarComentario(id, comentario).subscribe(
        (updatedJustificacion) => {
          if (updatedJustificacion) {  // Verifica si la respuesta no es null o undefined
            // Actualiza solo el comentario sin modificar el resto de los datos
            const index = this.justificacion.findIndex(j => j.id === id);
            if (index !== -1) {
              // Actualiza solo el comentario
              this.justificacion[index].comentario = updatedJustificacion.comentario;
              console.log('Comentario guardado exitosamente');
            }
          } else {
            console.error('No se pudo actualizar la justificación, respuesta vacía.');
          }
        },
        (error) => {
          console.error('Error al guardar el comentario', error);
        }
      );
    } else {
      console.error('Debe ingresar un comentario');
    }
  }
  
  
  

  // Método para abrir el menú
  mostrarMenu() {
    this.menuController.open('first');
  }
}
