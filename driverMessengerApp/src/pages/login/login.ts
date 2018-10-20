import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from '../home/home';
import { AddTechnologyPage } from '../add-technology/add-technology';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http : HttpClient, public fb : FormBuilder, public toastCtrl  : ToastController)
  {
    // Criar regras de validação do construtor de formulários
    this.form = fb.group({
      "email"          : ["", Validators.required],
      "senha"          : ["", Validators.required]
    });

  }

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
    * @name loginEmail
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo loginEmail
    */
   public loginEmail         : any;

   /**
    * @name loginSenha
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo loginSenha
    */
   public loginSenha         : any;

    /**
    * @name baseURI
    * @type {String}
    * @public
    * @description     URI remoto para recuperar dados de e enviar dados para
    */
   private baseURI               : string  = "http://localhost/webService/";

   /**
    * Atribuir os dados recuperados de navegação às propriedades
    * usado como modelos no formulário HTML da página
    *
    * @public
    * @method selectEntry
    * @param item 		{any} 			Navigation data
    * @return {None}
    */
   selectEntry(item : any) : void
   {
      this.loginEmail        = item.email;
      this.loginSenha        = item.senha;
   }

    /**
    *Salvar um novo registro que foi adicionado ao formulário HTML da página
    * Use o método de postagem http do angular para enviar os dados do registro
    *
    * @public
    * @method login
    * @param name 			{String} 			Nome do valor do campo de formulário
    * @param description 	{String} 	  Valor da descrição do campo de formulário
    * @return {None}
    */
   loginUser() : void
   {
      let
        email       : string = this.form.controls["email"].value,
        senha       : string = this.form.controls["senha"].value;

      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "email" : email, "senha" : senha },
          url       : any   = this.baseURI + "login-data.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {

        // Se o cadastro foi bem sucedido, notifique o usuário
        this.usuario = data.cod_usuario;
        console.log("data====="+data);
        console.log("he======"+headers);
        console.log("op====="+options);
        console.log("sfjgsdf"+this.usuario);

        /*
        if (this.usuario != null)
        {
          this.enviarNotificacao(`Parabéns ${this.usuario}, seu login foi realizado com sucesso!`);
        } else
        {
          this.enviarNotificacao(`Usuário / senha inválido!`);
        }*/

        //this.navCtrl.setRoot(LoginPage);
      },
      (error : any) =>
      {
         this.enviarNotificacao(`Ops! Algo deu errado!`);
      });
   }

   /**
    * Verificar se as senhas digitadas são iguais, antes de efetuar
    * o registro no BD
    *
    * @public
    * @method login
    * @return {None}
    */
   login()
   {
    if (this.validaDados())
     {
        //this.enviarNotificacao(`Senhas conferem!`);
        this.loginUser();
     }
   }
   /**
    * Validações para evitar que o usuario tente logar sem inserir 'email' e 'senha'
    * @public
    * @method validaDados
    * @return {none}
    */
   validaDados(){
     if(this.loginEmail === ''){
      this.enviarNotificacao(`Preencha o campo Login!`);
      return false;
     } else if (this.loginSenha === ''){
      this.enviarNotificacao(`Preencha o campo Senha!`);
      return false;
     }else {
       return true;
     }
   }

   /**
    * Gerenciar notificando o usuário sobre o resultado de operações remotas
    *
    * @public
    * @method enviarNotificacao
    * @param message 	{String} 		Mensagem a ser exibida na notificação
    * @return {None}
    */
   enviarNotificacao(message : string)  : void
   {
      let notificacao = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notificacao.present();
   }
  openCadastroPage(){
   this.navCtrl.setRoot(CadastroPage);
  }
  openHomePage(){
    this.navCtrl.setRoot(HomePage);
  }
}
