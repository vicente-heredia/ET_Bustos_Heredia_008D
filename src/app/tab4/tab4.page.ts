import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  student = {
    name: 'Vicente Heredia',
    email: 'Vi.bustosa@duocuc.cl',
    phone: '+1234567890',
    major: 'Ingeniería Informatica',
    photoUrl: 'assets/cr7.png' 
  };

  constructor(private menucontroller: MenuController) {}



  mostrarMenu() {
    this.menucontroller.open('first');
  }

  ngOnInit() {

  }

}
