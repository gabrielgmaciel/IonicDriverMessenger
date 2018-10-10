import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MensagensRecebidasPage } from '../mensagens-recebidas/mensagens-recebidas';
/**
 * Generated class for the VeiculosCadastradosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-veiculos-cadastrados',
  templateUrl: 'veiculos-cadastrados.html',
})
export class VeiculosCadastradosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VeiculosCadastradosPage');
  }
  openMensagensRecebidasPage(){
    this.navCtrl.push(MensagensRecebidasPage);
  }


}
