import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Asignatura } from '../../interfaces/Asignatura';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  claseForm: FormGroup;
  username: string = ''; 
  asignaturas: Asignatura[] = [];
  clasesSeleccionadas: Asignatura[] = [];
  areAsignaturasFinalized: boolean = false;
  userData: any;
  qrData: string[] = []; 

  constructor(
    private menucontroller: MenuController,
    private fb: FormBuilder,
    private authservice: AuthService
  ) {
    this.claseForm = this.fb.group({
      semestre: [''] 
    });
  }

  ngOnInit() {
    this.username = sessionStorage.getItem('username') || '';

    
    this.loadData();
  }

  loadData() {
    // Carga las asignaturas
    this.loadAsignaturas();
    
    // Carga los datos del usuario desde el JSON
    this.authservice.getAllUsers().subscribe(users => {
      this.userData = users.find(user => user.username === this.username);
      if (this.userData) {
        console.log('Datos del usuario cargados:', this.userData);
      }
    });
  }

  loadAsignaturas() {
    this.authservice.getAllAsignaturas().subscribe(
      (asignaturas: Asignatura[]) => {
        this.asignaturas = asignaturas;
      },
      (error) => {
        console.error('Error al cargar las asignaturas:', error);
      }
    );
  }

  mostrarMenu() {
    this.menucontroller.open('first');
  }

  selectAsignatura(asignatura: Asignatura) {
    const index = this.clasesSeleccionadas.indexOf(asignatura);
    if (index === -1) {
      this.clasesSeleccionadas.push(asignatura); 
    } else {
      this.clasesSeleccionadas.splice(index, 1); 
    }
    this.generateQrData();
  }

  registerAsignaturas() {
    const data = {
      username: this.username,
      clasesSeleccionadas: this.clasesSeleccionadas 
    };
    
    this.authservice.saveSelectedAsignaturas(data).subscribe(
      response => {
        console.log('Asignaturas registradas:', response);
        this.areAsignaturasFinalized = true;
        this.generateQrData(); // Generar datos para el QR
      },
      error => {
        console.error('Error al registrar asignaturas:', error);
      }
    );
  }

  resetSelection() {
    this.clasesSeleccionadas = [];
    this.areAsignaturasFinalized = false;
    this.loadAsignaturas(); 
  }

  generateQrData() {
    if (this.clasesSeleccionadas.length > 0 && this.userData) {
      this.qrData = this.clasesSeleccionadas.map(asignatura => {
        const profesorNombre = asignatura.profesor;
        const userRut = this.userData.rut.split('-')[0];
        const userEmail = this.userData.email;

        const qrInfo = `Asignatura: ${asignatura.nombre}\nProfesor: ${profesorNombre}\nRUT: ${userRut}\nEmail: ${userEmail}`;
        console.log('QR Data generada para:', asignatura.nombre, qrInfo);
        return qrInfo;
      });
    } else {
      console.log('No hay asignaturas seleccionadas o datos del usuario.');
    }
  }
}
