import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {
  clases = [
    { nombre: 'Matemáticas', asistencia: 80 },
    { nombre: 'Ciencias', asistencia: 90 },
    { nombre: 'Lengua', asistencia: 70 },
    { nombre: 'Historia', asistencia: 85 },
  ];
  qrCode: string | null = null;

  constructor(private alertcontroller: AlertController
    ,private menucontroller: MenuController,
     private router: Router) { }

  ngOnInit() {
  }

  mostrarMenu() {
    this.menucontroller.open('first');
  }

  async generateQRCode() {
    const studentName = 'Vicente Heredia';
    const currentDateTime = new Date().toLocaleString();
    const qrData = `Asistencia registrada en: ${currentDateTime}\nAlumno: ${studentName}`;
    try {
      this.qrCode = await QRCode.toDataURL(qrData);
    } catch (error) {
      console.error('Error generando código QR:', error);
    }
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
            this.router.navigate(['/tabs/tab7']);
          },
        },
      ],
    });

    await alert.present();
  }

}
