import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MenuController, AlertController, IonTabs } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  defaultPhotoUrl: string = 'assets/cr7.png';

  student: any = {
    photoUrl: '',
    name: '',
    email: '',
    phone: 'No disponible',
    major: 'No disponible'
  };

  user: any = {
    photoUrl: '',
    username: '',
    nombre: '',
    apellido: '',
    email: '',
    rut: ''
  };

  isCompletingAccount: boolean = false; 
  isEditingProfile: boolean = false; 

  constructor(
    private menucontroller: MenuController,
    private alertcontroller: AlertController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    
    
  }
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
      const storedUser = localStorage.getItem(username);
      this.authService.getByUsuario(username).subscribe((data) => {
        this.user = data; // Asigna el objeto completo a `user`
        console.log('Datos del usuario cargados:', this.user);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.student.name = user.nombre;
        this.student.email = user.correo;
        this.student.phone = user.phone || 'No disponible';
        this.student.major = user.major || 'No disponible';
      }

        // Si la photoUrl está vacía, usa la imagen predeterminada
        if (!this.user.photoUrl) {
          this.user.photoUrl = this.defaultPhotoUrl;
        }
      }, error => {
        console.error('Error cargando los datos del usuario:', error);
      });
    } else {
      console.log('No se encontró el nombre de usuario en sessionStorage.');
    }
  }

  toggleCompleteAccount() {
    this.isCompletingAccount = !this.isCompletingAccount;
  }

  saveChanges() {
    const username = sessionStorage.getItem('username');
    if (username) {
      const updatedUser = {
        nombre: this.student.name,
        correo: this.student.email,
        phone: this.student.phone,
        major: this.student.major,
        photoUrl: this.student.photoUrl
      };
      localStorage.setItem(username, JSON.stringify(updatedUser));
      this.isCompletingAccount = false; 
      this.showAlert('Datos guardados', 'Los datos se han guardado correctamente.');
      this.loadUserData(); 
    }
  }

  toggleEditProfile() {
    this.isEditingProfile = !this.isEditingProfile;
  }

  saveProfileChanges() {
    this.saveChanges(); 
    this.isEditingProfile = false; 
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertcontroller.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('ingresado');
    this.router.navigate(['/comienzo']);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.student.photoUrl = e.target.result; 
      };
      reader.readAsDataURL(file); 
    }
  }

  irlogin(tab: string) {
    this.router.navigate(['/comienzo']);
  }

  cerrarSesion() {
    sessionStorage.clear(); 
    this.router.navigate(['/comienzo']); 
  }

  editarPerfil() { 
    this.router.navigate(['/editarperfil']); 
  }
}
