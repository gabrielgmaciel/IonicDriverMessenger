import { TesteProvider } from './../../providers/teste/teste';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MensagensRecebidasPage } from '../mensagens-recebidas/mensagens-recebidas';
import { LoginPage } from './../login/login';
import { HttpHeaders, HttpClient } from '@angular/common/http';

/**
 * Generated class for the ExcluirContaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-excluir-conta',
  templateUrl: 'excluir-conta.html',
})
export class ExcluirContaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl  : ToastController, public http : HttpClient, public testeProvider: TesteProvider) {
  }

    /**
    *Salvar um novo registro que foi adicionado ao formulário HTML da página
    * Use o método de postagem http do angular para enviar os dados do registro
    *
    * @public
    * @method excluirVeiculo
    * @param name 			{String} 			Nome do valor do campo de formulário
    * @param description 	{String} 	  Valor da descrição do campo de formulário
    * @return {None}
    */

    /**
    *Salvar um novo registro que foi adicionado ao formulário HTML da página
    * Use o método de postagem http do angular para enviar os dados do registro
    *
    * @public
    * @method cancelar
    * @param name 			{String} 			Nome do valor do campo de formulário
    * @param description 	{String} 	  Valor da descrição do campo de formulário
    * @return {None}
    */

    /**
    * @name baseURI
    * @type {String}
    * @public
    * @description     URI remoto para recuperar dados de e enviar dados para
    */
   private baseURI : string  = "http://localhost/webService/";

  excluirVeiculo(){

    let
        codigo : number = this.testeProvider.recuperaUsuario();

    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {"key" : "excluirConta", "codigoUsuario" : codigo},
        url       : any   = this.baseURI + "manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>
    {
      this.enviarNotificacao(data.message);
      this.navCtrl.push(LoginPage);
    },
    (error : any) =>
    {
       this.enviarNotificacao(`Erro ao excluir conta!`);
    });
}

  enviarNotificacao(message : string)  : void {
    let notificacao = this.toastCtrl.create({
        message       : message,
        duration      : 3000
    });
    notificacao.present();
  }
  openMensagensRecebidasPage(){
    this.navCtrl.push(MensagensRecebidasPage);
  }

  cancelar(){
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExcluirContaPage');
  }

}
