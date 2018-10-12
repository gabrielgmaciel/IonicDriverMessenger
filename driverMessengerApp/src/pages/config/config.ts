import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlterarDadosPage} from '../alterar-dados/alterar-dados';
import { VeiculosCadastradosPage} from '../veiculos-cadastrados/veiculos-cadastrados';
import { HomePage } from '../home/home';
import { LoginPage} from '../login/login';
/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }

  
  openAlterarDadosPage(){
    this.navCtrl.push(AlterarDadosPage);
  }
  
  openVeiculosCadastradosPage(){
    this.navCtrl.push(VeiculosCadastradosPage);
  }
  openHomePage(){
    this.navCtrl.push(HomePage);
  }
  openLoginPage(){
    this.navCtrl.push(LoginPage);
  }


}    
    
