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

  loginForm : FormGroup;  

  cardVisible = false;
  userdata: any;

  usuario ={
    id:0,
    username:"",
    password:"",
    email:"",
    isactive: false
  }

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

  login(){
    
    if (!this.loginForm.valid){
      return
    }

    const username=this.loginForm.value.username;
    const password=this.loginForm.value.password;

    this.authservice.getByUsername(username).subscribe(resp => { 
      this.userdata = resp;
      console.log(this.userdata);
      if (this.userdata.length === 0) {
        this.loginForm.reset();
        this.UsuarioNoExiste();
        return;
      }

      this.usuario={
        id: this.userdata[0].id,
        username: this.userdata[0].username,
        password: this.userdata[0].password,
        email:this.userdata[0].email,
        isactive: this.userdata[0].isactive
      }
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
     })
  }

  private IniciarSesion(user: any) {
    sessionStorage.setItem('username', user.username);
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión Iniciada: ' + user.username);
    
    // Redirigir a tab1 (home)
    this.router.navigate(['/tabs/tab1']);
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
  async UsuarioInactivo(){
    const alerta = await this.alertcontroller.create({ 
      header : 'Usuario inactivo',
      message : 'Contactar a admin@admin.cl',
      buttons : ['OK']
    })
    alerta.present();
  }

}


