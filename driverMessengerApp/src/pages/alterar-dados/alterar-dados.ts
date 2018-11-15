import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {HomePage} from "../home/home";
import { HttpClient, HttpHeaders } from '@angular/common/http';
/**
 * Generated class for the AlterarDadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-alterar-dados',
  templateUrl: 'alterar-dados.html',
})
export class AlterarDadosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http : HttpClient, public fb : FormBuilder, public toastCtrl  : ToastController) {

    this.load();
    // Criar regras de validação do construtor de formulários
    this.form = fb.group({
      "nome"          : ["", Validators.required],
      //"email"         : ["", Validators.required],
      "telefone"      : ["", Validators.required],
      "senha1"        : ["", Validators.required],
      "senha2"        : ["", Validators.required]
   });

   this.cod = navParams.get('id');

   this.enviarNotificacao(this.cod);


  }

  public cod : any;

   /**
    * @name usuario
    * @type {Array}
    * @public
    * @description     Usado para armazenar dados  PHP do usuario retornados
    */
   public usuario : Array<any> = [];

    /**
    * @name form
    * @type {FormGroup}
    * @public
    * @description Definir a propriedade FormGroup para gerenciar validação de formulário / recuperação de dados
    */
   public form                   : FormGroup;

    /**
    * @name baseURI
    * @type {String}
    * @public
    * @description     URI remoto para recuperar dados de e enviar dados para
    */
   private baseURI               : string  = "http://localhost/webService/";

   /**
    * @name alteraName
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo alteraNome
    */
   public alteraNome         : any;

   /**
    * @name alteraEmail
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo alteraEmail
    */
   public alteraEmail         : any;

   /**
    * @name alteraSenha1
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo calteraSenha1
    */
   public alteraSenha1         : any;

   /**
    * @name alteraSenha2
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo calteraSenha2
    */
   public alteraSenha2         : any;

    /**
    * @name codUser
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo hiddem cod_user
    */
   public codUser         : any;

   /**
    * Recuperar os dados codificados em JSON do servidor remoto
    * Usando a classe Http do Angular e um Observable - então
    * atribuir isso à matriz usuario para renderização no modelo HTML
    *
    * @public
    * @method load
    * @return {None}
    */

       /**
    * Atribuir os dados recuperados de navegação às propriedades
    * usado como modelos no formulário HTML da página
    *
    * @public
    * @method selectEntry
    * @param usuario 		{any} 			Navigation data
    * @return {None}
    */
   selectEntry(usuario : any) : void
   {
      this.alteraNome         = usuario.nome;
      this.alteraEmail        = usuario.email;
      this.alteraSenha1       = usuario.senha1;
      this.alteraSenha2       = usuario.senha2;
      this.codUser            = usuario.cod_user;
   }
  load() : void
   {
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {"ID" : this.cod};

    this.http
      .post('http://localhost/webService/retrieve-data.php',JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         console.dir(data);
         this.usuario = data;
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }

   /**
    * Atualize um registro existente que foi editado no formulário HTML da página
    * Use o método de postagem http do angular para enviar os dados do registro
    * para o nosso script PHP remoto
    *
    * @public
    * @method updateResitro
    * @param name 			{String} 			Name value from form field
    * @param description 	{String} 			Description value from form field
    * @return {None}
    */
   updateRegistro() : void
   {
    let
      nome        : string = this.form.controls["nome"].value,
      //email       : string = this.form.controls["email"].value,
      telefone    : string = this.form.controls["telefone"].value,
      senha       : string = this.form.controls["senha1"].value;

    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "update", "nome" : nome, "senha" : senha, "telefone" : telefone, "ID" : "2"},
        url       : any      	= this.baseURI + "manage-data.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
      {
         // Se a atualização foi bem sucedida, notifique o usuário
         //this.hideForm  =  true;
         this.enviarNotificacao(`Dados alterados com sucesso!`);
         this.navCtrl.setRoot(HomePage);
      },
      (error : any) =>
      {
         this.enviarNotificacao('Ops! Algo deu errado!');
      });
   }

   alterarDados()
   {
    if (this.alteraSenha1 == this.alteraSenha2)
     {
        //this.enviarNotificacao(`Senhas conferem!`);
        this.updateRegistro();
     } else
     {
      this.enviarNotificacao(`Senhas não conferem!`);
     }

   }

   enviarNotificacao(message : string)  : void
   {
      let notificacao = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notificacao.present();
   }

  voltarHome(){
      this.navCtrl.setRoot(HomePage);
  }

}
