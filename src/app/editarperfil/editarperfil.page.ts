import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { forkJoin, of } from 'rxjs'; // Asegúrate de importar 'of'

@Component({
  selector: 'editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {
  user: any = {
    username: '',
    apellido: '',
    email: '',
    rut: ''
  };
  selectedFile: File | null = null; // Para almacenar el archivo de imagen seleccionado
  idUser: any

  constructor(
    private menucontroller: MenuController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserData(); 
  }

  

  mostrarMenu() {
    this.menucontroller.open('first');
  }

  loadUserData() {
    const username = sessionStorage.getItem('username');
    console.log('Nombre de usuario obtenido:', username);

    if (username) {
      this.authService.getProfesorByUsuario(username).subscribe((data) => {
        this.user = data; 
        console.log(data)
        console.log('Datos del usuario cargados:', this.user);
      }, error => {
        console.error('Error cargando los datos del usuario:', error);
      });
    } else {
      console.log('No se encontró el nombre de usuario en sessionStorage.');
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.selectedFile = target.files[0]; // Almacena el archivo seleccionado
    }
  }

  onSubmit() {
    // Verifica que haya datos de usuario para actualizar
    if (!this.user.username || !this.user.apellido || !this.user.email || !this.user.rut) {
      console.error('Por favor completa todos los campos requeridos');
      return;
    }
  
    const updateUser$ = this.authService.updateUser(this.user.id, this.user);
    const uploadImage$ = this.selectedFile ? this.authService.uploadProfileImage(this.user.username, this.selectedFile) : of(null);
  
    // Usa forkJoin para esperar ambos procesos
    forkJoin([updateUser$, uploadImage$]).subscribe(
      ([updateResponse, uploadResponse]) => {
        sessionStorage.setItem('username', this.user.username);
        console.log('Usuario actualizado con éxito', updateResponse);
        if (uploadResponse) {
          console.log('Imagen subida con éxito', uploadResponse);
        }
        this.Volver(); // Volver a la página anterior después de guardar
      },
      error => {
        console.error('Error al actualizar el usuario', error);
      }
    );
  }
  
  Volver() {
    this.router.navigate(['/tabs/tab4']); 
  }
}
