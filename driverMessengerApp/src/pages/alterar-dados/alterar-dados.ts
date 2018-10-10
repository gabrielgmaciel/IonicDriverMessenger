import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {VeiculosCadastradosPage} from '../veiculos-cadastrados/veiculos-cadastrados';

/**
 * Generated class for the AlterarDadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alterar-dados',
  templateUrl: 'alterar-dados.html',
})
export class AlterarDadosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlterarDadosPage');
  }
  openVeiculosCadastradosPage(){
    this.navCtrl.push(VeiculosCadastradosPage);
  }

}
