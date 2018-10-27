import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MensagensRecebidasPage } from '../mensagens-recebidas/mensagens-recebidas';
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

  frases: any;
  mensagem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnviarNotificacaoPage');
  }
  openHomePage(){
    this.navCtrl.setRoot(HomePage);
  }
  openMensagensRecebidasPage(){
    this.navCtrl.setRoot(MensagensRecebidasPage);
  }

 /* isReadonly() {
    return this.isReadonly;   //return true/false
  }

  getRetornar(){

    this.servidor.getReceber()
    .subscribe(
      data => this.frases = data,
      err => console.log(err)
    );
  }
  getEnviar(){
    this.servidor.getEnviar()
    .subscribe(
      data => this.mensagem = data,
      err => console.log(err)
    );
  }
*/
}
