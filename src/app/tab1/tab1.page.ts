import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private menucontroller: MenuController,
    private router: Router  
  ) {}

  mostrarMenu(){
    this.menucontroller.open('first');
  }

  mostrarEventos(){
    this.router.navigate(['/tabs/tab3']); 
    
  }

  mostrarClases(){
    this.router.navigate(['/tabs/tab2']); 

  }

  mostrarNotas(){
    this.router.navigate(['/tabs/tab6']); 

  }



}
