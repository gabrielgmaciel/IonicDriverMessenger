import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the EnviarNotificacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enviar-notificacao',
  templateUrl: 'enviar-notificacao.html',
})
export class EnviarNotificacaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnviarNotificacaoPage');
  }
  openHomePage(){
    this.navCtrl.setRoot(HomePage);
  }

}
