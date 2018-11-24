import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { EnviarNotificacaoPage } from '../enviar-notificacao/enviar-notificacao';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomePage } from "../home/home";
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { TesteProvider } from "../../providers/teste/teste";


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb : FormBuilder, public toastCtrl  : ToastController, public http : HttpClient, public testeProvider: TesteProvider) {
    this.listaMensagens();
  }

  /**
    * @name mensagens
    * @type {Array}
    * @public
    * @description     Usado para armazenar dados  PHP do usuario retornados
    */
   public mensagens : Array<any> = [];

   /**
   * @public
   * @method excluirMensagem
   * @param codigoMensagem
   * @return {None}
   */

      /**
    * @name baseURI
    * @type {String}
    * @public
    * @description     URI remoto para recuperar dados de e enviar dados para
    */
   private baseURI               : string  = "http://localhost/webService/";


  ionViewDidLoad() {
    console.log('ionViewDidLoad MensagensRecebidasPage');
  }

  listaMensagens(){

    let
        codigo : number = this.testeProvider.recuperaUsuario();

    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= {"key" : "buscarMensagens",  "codigoUsuario" : codigo },
    url       : any   = this.baseURI + "retrieve-data.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>
    {
      this.mensagens = data;
      console.log(data);

    },
    (error : any) =>
    {
      this.enviarNotificacao(`Erro ao recuperar informações!`);
    });
  }

  excluirMensagem(codigoMensagem){

    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {"key" : "excluirMensagem", "codigoMensagem" : codigoMensagem},
        url       : any   = this.baseURI + "manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>
    {
      this.enviarNotificacao(data.message);
      this.navCtrl.push(MensagensRecebidasPage);
    },
    (error : any) =>
    {
       this.enviarNotificacao(`Erro ao excluir mensagem!`);
    });
}

  enviarNotificacao(message : string)  : void
   {
      let notificacao = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notificacao.present();
   }

  openMensagensRecebidasPage(){
    this.navCtrl.push(MensagensRecebidasPage);
  }
  openHomePage(){
    this.navCtrl.setRoot(HomePage);
  }

}
