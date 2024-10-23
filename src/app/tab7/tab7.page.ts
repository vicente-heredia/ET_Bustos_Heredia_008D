import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Asignatura } from 'src/interfaces/Asignatura';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {
  justificacionForm: FormGroup;
  asignaturas: Asignatura[] = [];
  nombreProfesor: string = '';
  historialJustificaciones: any[] = []; // Propiedad para almacenar el historial

  constructor(
    private alertController: AlertController,
    private menuController: MenuController,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.justificacionForm = this.fb.group({
      fecha: ['', Validators.required],
      motivo: ['', [Validators.required, Validators.minLength(10)]],
      asignatura: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.getAllAsignaturas().subscribe((data: Asignatura[]) => {
      this.asignaturas = data;

      this.justificacionForm.get('asignatura')?.valueChanges.subscribe(selectedAsignatura => {
        const asignaturaSeleccionada = this.asignaturas.find(asignatura => asignatura.nombre === selectedAsignatura);
        this.nombreProfesor = asignaturaSeleccionada ? asignaturaSeleccionada.profesor : '';
      });

      // Cargar el historial de justificaciones al inicializar el componente
      this.cargarJustificaciones(); // Llamar a la función para cargar justificaciones
    });
  }


  cargarJustificaciones() {
    this.authService.getAllJustificaciones().subscribe((data: any[]) => {
      this.historialJustificaciones = data; // Cargar todas las justificaciones
    }, error => {
      console.error('Error al cargar justificaciones:', error);
    });
  }

  enviarJustificacion() {
    if (this.justificacionForm.valid) {
      const justificacionData = this.justificacionForm.value;

      // Crear un objeto que contenga la justificación en el formato correcto
      const nuevaJustificacion = {
        fecha: justificacionData.fecha,
        motivo: justificacionData.motivo,
        asignatura: justificacionData.asignatura,
        profesor: this.nombreProfesor,
        usuario: sessionStorage.getItem('username')
      };

      this.authService.guardarJustificacion(nuevaJustificacion).subscribe(
        async () => {
          this.historialJustificaciones.push(nuevaJustificacion); // Agregar la justificación al historial
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Justificación enviada correctamente.',
            buttons: ['OK']
          });
          await alert.present();
          this.resetForm(); // Resetea el formulario
        },
        async (error) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'No se pudo enviar la justificación. Intenta nuevamente.',
            buttons: ['OK']
          });
          await alert.present();
          console.error('Error al enviar justificación:', error);
        }
      );
    } else {
      this.mostrarAlerta('Formulario inválido', 'Por favor, completa todos los campos correctamente.');
    }
  }





  eliminarJustificacion(index: number) {
    const justificacion = this.historialJustificaciones[index];
    
    // Llamar al servicio para eliminar la justificación en el backend
    this.authService.eliminarJustificacion(justificacion.id).subscribe(
      async () => {
        this.historialJustificaciones.splice(index, 1); // Eliminar del historial local
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Justificación eliminada correctamente.',
          buttons: ['OK']
        });
        await alert.present();
      },
      async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo eliminar la justificación. Intenta nuevamente.',
          buttons: ['OK']
        });
        await alert.present();
        console.error('Error al eliminar justificación:', error);
      }
    );
  }
  

  resetForm() {
    this.justificacionForm.reset();
    this.nombreProfesor = '';
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  mostrarMenu() {
    this.menuController.open('first');
  }
}
