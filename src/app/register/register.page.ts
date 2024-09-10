import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private alertcontroller: AlertController,private router: Router) { }

  ngOnInit() {
  }

  async register() {
    const alert = await this.alertcontroller.create({
      header: 'Registrarse',
      message: 'Registro Exitoso!',

      mode: 'ios',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/comienzo']);
          },
        },
      ],
    });

    await alert.present();
  }

}
