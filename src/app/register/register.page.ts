import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { UserNuevo } from '../../interfaces/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registroForm: FormGroup;
  usuariosDOC: UserNuevo[] = []; // Arreglo para usuarios docentes
  
  constructor(
    private fBuilder: FormBuilder,
    private alertcontroller: AlertController,
    private router: Router,
    private http: HttpClient,
    private authservice: AuthService
  ) {
    this.registroForm = this.fBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      rut: ['', [Validators.required, Validators.pattern('^\\d{1,8}-[\\dkK]{1}$')]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // Carga inicial del archivo JSON
    this.http.get<UserNuevo[]>('assets/data/almacen.json').subscribe((data: any) => {
      this.usuariosDOC = data.usuariosDoc || []; // Carga solo usuarios docentes
    });
  }

  passwordsDontMatch(): boolean {
    return this.registroForm.get('password')?.value !== this.registroForm.get('confirmPassword')?.value;
  }

  async register() {
    if (this.registroForm.invalid || this.passwordsDontMatch()) {
      return;
    }

    const { username, rut, nombre, apellido, correo, password } = this.registroForm.value;

    // Validar si el usuario ya existe en usuariosDoc
    const existingUser = this.usuariosDOC.find(user => user.username === username);
    if (existingUser) {
      const alert = await this.alertcontroller.create({
        header: 'Error',
        message: 'Este nombre de usuario ya está registrado',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const nuevoUsuario: UserNuevo = {
      id: this.usuariosDOC.length + 1,
      username,
      photoUrl: "",
      nombre,
      apellido,
      rut,
      email: correo,
      password,
      isactive: true,
    };

    // Agregar el nuevo usuario al arreglo `usuariosDOC`
    this.usuariosDOC.push(nuevoUsuario);

    // Enviar el nuevo usuario al servicio de autenticación
    this.authservice.postUsuarioDoc(nuevoUsuario).subscribe(() => {
      this.registroForm.reset();
      this.mostrarMensaje(nuevoUsuario.username);
      this.router.navigate(['/comienzo']);
    });
  }

  async mostrarMensaje(username: string) {
    const alerta = await this.alertcontroller.create({
      header: 'Usuario creado',
      message: 'Bienvenid@ ' + username,
      buttons: ['OK'],
    });
    await alerta.present();
  }
}
