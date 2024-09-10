import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comienzo',
  templateUrl: './comienzo.page.html',
  styleUrls: ['./comienzo.page.scss'],
})
export class ComienzoPage implements OnInit {

  
  cardVisible = false;

  constructor(private alertcontroller: AlertController, 
              private router: Router) { }

  ngOnInit() {
  }


  mostrarCard() {
    this.cardVisible = true;
    setTimeout(() => {
      const card = document.querySelector('.card-slide-in') as HTMLElement;
      card.classList.add('card-visible');
    }, 50);
  }

  async login() {
    const alert = await this.alertcontroller.create({
      header: 'Login',
      message: 'Bienvenido a Duoc Alumnos',

      mode: 'ios',
      buttons: [
        {
          text: 'Ingresar',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs/tab1']);
          },
        },
      ],
    });

    await alert.present();
  }

  showRegister() {
    this.router.navigate(['/register']);
  }

  


}

