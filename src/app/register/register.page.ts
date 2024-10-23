import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Users, UserNuevo } from '../../interfaces/users';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registroForm: FormGroup;
  usuarios: Users[] = [];
  
  nuevoUsuario: UserNuevo = {
    id: 0, 
    username: "",
    photoUrl: "",
    nombre: "", 
    apellido: "",
    email: "",
    password: "",
    rut: "",
    isactive: false
  };

  userdata: any;

  constructor(
    private fBuilder: FormBuilder,
    private alertcontroller: AlertController,
    private router: Router,
    private http: HttpClient,
    private authservice: AuthService
  ) {
    this.registroForm = this.fBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      photoUrl:"",
      rut: ['', [Validators.required, Validators.pattern('^\\d{1,8}-[\\dkK]{1}$')]], 
      nombre: ['', [Validators.required, Validators.minLength(2)]], 
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.http.get<Users[]>('data/almacen.json').subscribe(data => {
      this.usuarios = data;
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


    const existingUser = this.usuarios.find(user => user.username === username);
    if (existingUser) {
      const alert = await this.alertcontroller.create({
        header: 'Error',
        message: 'Este nombre de usuario ya está registrado',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const photoUrl=""


    const nuevoUsuario: UserNuevo = {
      id: this.usuarios.length + 1,
      username,
      photoUrl,
      nombre, 
      rut,
      apellido,
      email: correo,
      password,
      isactive: true
    };

    this.nuevoUsuario = nuevoUsuario;
    this.usuarios.push(this.nuevoUsuario);
    
    this.authservice.postUsuario(this.nuevoUsuario).subscribe(() => {
      this.registroForm.reset();
      this.mostrarMensaje();
      this.router.navigate(['/comienzo']);
    });
  }

  async mostrarMensaje() {
    const alerta = await this.alertcontroller.create({
      header: 'Usuario creado',
      message: ' Bienvenid@ ' + this.nuevoUsuario.username,
      buttons: ['OK']
    });
    alerta.present();
  }

  async errorDuplicidad() {
    const alerta = await this.alertcontroller.create({
      header: 'ERROR',
      message: 'El usuario ' + this.nuevoUsuario.username + ' ya está registrado en el sistema',
      buttons: ['OK']
    });
    alerta.present();
  }
}
