import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  qrCode: string | null = null;
  selectedDay: string = 'lunes'; 

  constructor(private alertcontroller: AlertController
              ,private menucontroller: MenuController,
               private router: Router
              ,private navcontroller: NavController) { }
  
  mostrarMenu() {
    this.menucontroller.open('first');
  }

  seleccionarSeccion(seccion: string) {
    // Navegamos a Tab7 y pasamos el parámetro 'seccion' en la ruta
    this.router.navigate(['/tabs/tab7'], { queryParams: { seccion: seccion } });
  }

  

  

  async enviarJustificacion() {
    const alert = await this.alertcontroller.create({
      header: 'Justificacion',
      message: 'Su Justificacion ha sido enviada!',
      mode: 'ios',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs/tab2']);
          },
        },
      ],
    });

    await alert.present();
  }

  async verInasistencias() {
    const alert = await this.alertcontroller.create({
      header: 'Inasistencias',
      message: '¿Desea ver las inasistencias?',
      mode: 'ios',
      buttons: [
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            const inasistencias = this.getInasistencias();
            const mensaje = `Usted tiene ${inasistencias.length} inasistencias`;
            this.mostrarMensaje(mensaje);
            this.navcontroller.navigateForward('/tabs/tab8'); // Agregamos esta línea para navegar a tab8
          },
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          },
        },
      ],
    });
  
    await alert.present();
  }

  getInasistencias(): string[] {
   
    return [];
  }

  async mostrarMensaje(mensaje: string) {
    
  }

  verCurso(cursoId: string) {
    this.navcontroller.navigateForward('tabs/tab7', {
      queryParams: {
        cursoId: cursoId
      }
    });
  }

  
}