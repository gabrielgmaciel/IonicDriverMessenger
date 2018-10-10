import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnviarNotificacaoPage } from '../enviar-notificacao/enviar-notificacao';
import { HomePage } from '../home/home';


/**
 * Generated class for the MensagensRecebidasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mensagens-recebidas',
  templateUrl: 'mensagens-recebidas.html',
})
export class MensagensRecebidasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MensagensRecebidasPage');
  }

  openEnviarNotificacaoPage(){
    this.navCtrl.push(EnviarNotificacaoPage);
  }
  openHomePage(){
    this.navCtrl.push(HomePage);
  }
}
