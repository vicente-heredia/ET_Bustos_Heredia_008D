import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  nombreSeccion: string = ''; // Nombre de la sección recibida
  datosEscaneados: string[] = []; // Lista para almacenar los datos escaneados

  constructor(private route: ActivatedRoute, private menucontroller: MenuController) {}

  ngOnInit() {
    Camera.requestPermissions();

    // Obtiene el parámetro de la sección pasado desde el Tab 3
    this.route.paramMap.subscribe(params => {
      this.nombreSeccion = params.get('seccion') || 'Sin sección'; // Valor por defecto si no hay parámetro
    });
  }

  mostrarMenu() {
    this.menucontroller.open('first');
  }


  async abrirCamara() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
  }


  agregarDato(dato: string) {
    this.datosEscaneados.push(dato);
  }
}
