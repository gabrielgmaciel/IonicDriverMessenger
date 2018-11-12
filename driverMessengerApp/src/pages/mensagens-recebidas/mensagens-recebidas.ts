import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { EnviarNotificacaoPage } from '../enviar-notificacao/enviar-notificacao';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomePage } from "../home/home";
import { HttpHeaders, HttpClient } from '@angular/common/http';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb : FormBuilder, public toastCtrl  : ToastController, public http : HttpClient) {
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

    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= {"key" : "buscarMensagens",  "codigoUsuario" : '1' },
    url       : any   = this.baseURI + "retrieve-data.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>
    {
      this.mensagens = data;
    },
    (error : any) =>
    {
      this.enviarNotificacao(`Erro ao recuperar informações!`);
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
