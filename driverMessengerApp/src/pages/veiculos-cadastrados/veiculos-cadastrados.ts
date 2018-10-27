import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MensagensRecebidasPage } from '../mensagens-recebidas/mensagens-recebidas';
import {HomePage} from "../home/home";
import { HttpHeaders, HttpClient } from '@angular/common/http';
/**
 * Generated class for the VeiculosCadastradosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 this.placa  = '';
 this.modelo = '';
 this.tipo   = '';

@IonicPage()
@Component({
  selector: 'page-veiculos-cadastrados',
  templateUrl: 'veiculos-cadastrados.html',
})
export class VeiculosCadastradosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb : FormBuilder, public toastCtrl  : ToastController, public http : HttpClient) {
    this.form = fb.group({
      "placa"          : ["", Validators.required],
      "modelo"         : ["", Validators.required],
      "tipo"           : ["", Validators.required]
    });
  }

      /**
    *Salvar um novo registro que foi adicionado ao formulário HTML da página
    * Use o método de postagem http do angular para enviar os dados do registro
    *
    * @public
    * @method validaCampos
    * @param name 			{String} 			Nome do valor do campo de formulário
    * @param description 	{String} 	  Valor da descrição do campo de formulário
    * @return {None}
    */

    /**
    * @name form
    * @type {FormGroup}
    * @public
    * @description Definir a propriedade FormGroup para gerenciar validação de formulário / recuperação de dados
    */
    public form                   : FormGroup;

    /**
    * @name placa
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo placa
    */
   public placa         : any;

   /**
    * @name modelo
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo modelo
    */
   public modelo         : any;

      /**
    * @name tipo
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo modelo
    */
   public tipo         : any;

   /**
    * @name baseURI
    * @type {String}
    * @public
    * @description     URI remoto para recuperar dados de e enviar dados para
    */
   private baseURI               : string  = "http://localhost/webService/";



  selectEntry(item : any) : void
   {
      this.placa  = item.placa;
      this.modelo = item.modelo;
      this.tipo   = item.tipo;
   }

  validaCampos(){
    console.log('Placa: ' + this.placa);
    console.log('modelo: ' + this.modelo);
    console.log('tipo: ' + this.tipo);

      if(this.placa == ''){
        this.enviarNotificacao(`Digite a placa do seu veículo`);
      } else if (this.modelo == ''){
        this.enviarNotificacao(`Digite o modelo do seu veículo`);
      } else if (this.tipo == ''){
        this.enviarNotificacao(`Digite o tipo do veículo`);
      } else {
        this.cadastrarVeiculo();
      }
  }

  cadastrarVeiculo()
   {
      let
        placa       : string = this.placa,
        modelo      : string = this.modelo,
        tipo        : string = this.tipo;

      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {"key" : "veiculo", "placa" : placa, "modelo" : modelo, "tipo" : tipo, "codigoUsuario" : '1' },
          url       : any   = this.baseURI + "manage-data.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
        this.enviarNotificacao(data.message);
      },
      (error : any) =>
      {
         this.enviarNotificacao(`Erro ao cadastrar veículo!`);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad VeiculosCadastradosPage');
  }
  openMensagensRecebidasPage(){
    this.navCtrl.push(MensagensRecebidasPage);
  }
    openHomePage(){
        this.navCtrl.setRoot(HomePage);
    }


}
