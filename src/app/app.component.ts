import { Component } from '@angular/core';

interface Menu{
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menu: Menu[]=[
    {
      icon:'home-outline',
      name:'Home',
      redirecTo:'/tabs/tab1'
    },
    
    {
      icon:'briefcase-outline',
      name:'Cursos',
      redirecTo:'/tabs/tab2'
    },
    {
      icon:'qr-code-outline',
      name:'Escanear QR',
      redirecTo:'/tabs/tab3'
    },
    {
      icon:'file-tray-full-outline',
      name:'Justificaciones',
      redirecTo:'/tabs/tab8'
    },
    {
      icon:'calendar-outline',
      name:'Mi Horario',
      redirecTo:'/tabs/tab6'
    },
    
    {
      icon:'person-circle-outline',
      name:'Mi Perfil',
      redirecTo:'/tabs/tab4'
    },
    {
      icon:'settings-outline',
      name:'Configuracion',
      redirecTo:'/tabs/tab5'
    }

  ]



  constructor() {}
}
