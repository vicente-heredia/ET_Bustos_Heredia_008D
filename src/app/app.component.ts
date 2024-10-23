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
      icon:'sunny-outline',
      name:'Home',
      redirecTo:'/tabs/tab1'
    },
    {
      icon:'briefcase-outline',
      name:'Clases',
      redirecTo:'/tabs/tab2'
    },
    {
      icon:'school-outline',
      name:'Notas',
      redirecTo:'/tabs/tab6'
    },
    {
      icon:'calendar-number-outline',
      name:'Justificar',
      redirecTo:'/tabs/tab7'
    },
    {
      icon:'calendar-outline',
      name:'Eventos',
      redirecTo:'/tabs/tab3'
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
