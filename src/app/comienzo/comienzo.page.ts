import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-comienzo',
  templateUrl: './comienzo.page.html',
  styleUrls: ['./comienzo.page.scss'],
})
export class ComienzoPage implements OnInit {

  loginForm: FormGroup;  

  cardVisible = false;
  userdata: any;

  usuario = {
    id: 0,
    username: "",
    password: "",
    email: "",
    isactive: false,
    role: "" // Añadido para diferenciar alumnos y profesores
  };

  constructor(
    private authservice: AuthService,
    private alertcontroller: AlertController,
    private toast: ToastController,
    private router: Router,
    private fbuilder: FormBuilder
  ) {
    this.loginForm = this.fbuilder.group({
      'username': new FormControl("", [Validators.required, Validators.minLength(6)]),
      'password': new FormControl("", [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit() {}

  irARegistro() {
    this.router.navigate(['/register']); 
  }

  mostrarCard() {
    this.cardVisible = true;
    setTimeout(() => {
      const card = document.querySelector('.card-slide-in') as HTMLElement;
      card.classList.add('card-visible');
    }, 50);
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    // Consultar primero en alumnos
    this.authservice.getByUsername(username).subscribe(resp => {
      this.userdata = resp;

      // Si no existe el usuario en alumnos, consultar en profesores
      if (this.userdata.length === 0) {
        this.authservice.getProfesorByUsername(username).subscribe(profResp => {
          if (profResp.length === 0) {
            this.loginForm.reset();
            this.UsuarioNoExiste();
            return;
          }

          // Validar el usuario profesor
          this.procesarLogin(profResp[0], password, "profesor");
        });
        return;
      }

      // Validar el usuario alumno
      this.procesarLogin(this.userdata[0], password, "alumno");
    });
  }

  private procesarLogin(user: any, password: string, role: string) {
    this.usuario = {
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      isactive: user.isactive,
      role: role
    };

    if (this.usuario.password !== password) {
      this.loginForm.reset();
      this.ErrorUsuario();
      return;
    }

    if (!this.usuario.isactive) {
      this.loginForm.reset();
      this.UsuarioInactivo();
      return;
    }

    this.IniciarSesion(this.usuario);
  }

  private IniciarSesion(user: any) {
    sessionStorage.setItem('username', user.username);
    sessionStorage.setItem('role', user.role); // Guardar el rol (alumno/profesor)
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión Iniciada: ' + user.username);
    
    // Redirigir según el rol
    if (user.role === "profesor") {
      this.router.navigate(['/tabs/tab1']);
    }
  }

  async showToast(msg: any) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async UsuarioNoExiste() {
    const alerta = await this.alertcontroller.create({
      header: 'No existe...',
      message: 'Debe registrarse.',
      buttons: ['OK']
    });
    alerta.present();
  }

  async ErrorUsuario() {
    const alerta = await this.alertcontroller.create({
      header: 'Error..',
      message: 'Revise sus credenciales.',
      buttons: ['OK']
    });
    alerta.present();
  }

  async UsuarioInactivo() {
    const alerta = await this.alertcontroller.create({ 
      header : 'Usuario inactivo',
      message : 'Contactar a admin@admin.cl',
      buttons : ['OK']
    });
    alerta.present();
  }

}
