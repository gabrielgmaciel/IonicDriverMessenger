import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from '../home/home';
import { AddTechnologyPage } from '../add-technology/add-technology';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  openCadastroPage(){
   this.navCtrl.setRoot(CadastroPage);
  }
  openHomePage(){
    this.navCtrl.setRoot(HomePage);
  }
}
