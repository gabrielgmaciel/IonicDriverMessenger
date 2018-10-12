import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

    constructor(public navCtrl: NavController) {
  
    }

    voltarLogin(){
        this.navCtrl.setRoot(LoginPage);
    }
   
  }