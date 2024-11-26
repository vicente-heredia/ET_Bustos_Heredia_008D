import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  defaultPhotoUrl: string = 'assets/nelson.jpeg';

  user: any = {
    photoUrl: this.defaultPhotoUrl,
    username: '',
    nombre: '',
    apellido: '',
    email: '',
    rut: '',
  };

  constructor(
    private menucontroller: MenuController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}


  
ionViewWillEnter() {
  console.log("hola")
  
  this.loadUserData();
}

  mostrarMenu() {
    this.menucontroller.open('first');
  }

  loadUserData() {
    const username = sessionStorage.getItem('username');
    console.log('Nombre de usuario obtenido:', username);

    if (username) {
      this.authService.getProfesorByUsuario(username).subscribe(
        (data) => {
          this.user = { ...data }; // Copia los datos al objeto `user`
          console.log('Datos del usuario cargados:', this.user);

          // Si la foto no está definida, usa la imagen predeterminada
          if (!this.user.photoUrl) {
            this.user.photoUrl = this.defaultPhotoUrl;
          }
        },
        (error) => {
          console.error('Error cargando los datos del usuario:', error);
        }
      );
    } else {
      console.log('No se encontró el nombre de usuario en sessionStorage.');
    }
  }

  editarPerfil() {
    this.router.navigate(['/editarperfil']);
  }
  

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/comienzo']);
  }
}
