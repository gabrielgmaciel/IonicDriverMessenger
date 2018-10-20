import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LoginPage} from "../login/login";
import { variable } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

   /**
    * @name form
    * @type {FormGroup}
    * @public
    * @description Definir a propriedade FormGroup para gerenciar validação de formulário / recuperação de dados
    */
   public form                   : FormGroup;

   /**
    * @name cadastroName
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo cadastroName
    */
   public cadastroNome         : any;

   /**
    * @name cadastroEmail
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo cadastroEmail
    */
   public cadastroEmail         : any;

   /**
    * @name cadastroTelefone
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo cadastroTelefone
    */
   public cadastroTelefone         : any;

    /**
    * @name cadastroSenha1
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo cadastroSenha
    */
   public cadastroSenha1         : any;

   /**
    * @name cadastroSenha2
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo cadastroSenha
    */
   public cadastroSenha2         : any;

    /**
    * @name cadastroTipoVeiculo
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo cadastroTipoVeiculo
    */
   public cadastroTipoVeiculo         : any;

      /**
    * @name cadastroPlaca
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo cadastroPlaca
    */
   public cadastroPlaca         : any;

      /**
    * @name cadastroModelo
    * @type {Any}
    * @public
    * @description     Modelo para gerenciar o campo cadastroModelo
    */
   public cadastroModelo         : any;

   /**
    * @name isEdited
    * @type {Boolean}
    * @public
    * @description     Sinalizador a ser usado para verificar se estamos adicionando / editando uma entrada
    */

   public isEdited               : boolean = false;

   /**
    * @name hideForm
    * @type {Boolean}
    * @public
    * @description     Sinalizar para ocultar o formulário após a conclusão bem-sucedida da operação remota
    */
   public hideForm               : boolean = false;

   /**
    * @name pageTitle
    * @type {String}
    * @public
    * @description     Propriedade para ajudar a definir o título da página
    */
   public pageTitle              : string;

   /**
    * @name ID
    * @type {String}
    * @public
    * @description     Propriedade para armazenar o ID para quando uma entrada existente está sendo editada
    */
   public ID               : any = null;

   /**
    * @name baseURI
    * @type {String}
    * @public
    * @description     URI remoto para recuperar dados de e enviar dados para
    */
   private baseURI               : string  = "http://localhost/webService/";

   // Inicializar classes de módulo
   constructor(public navCtrl    : NavController,
               public http       : HttpClient,
               public NP         : NavParams,
               public fb         : FormBuilder,
               public toastCtrl  : ToastController)
   {

      // Criar regras de validação do construtor de formulários
      this.form = fb.group({
         "nome"         : ["", Validators.required],
         "email"        : ["", Validators.required],
         "telefone"     : ["", Validators.required],
         "senha1"       : ["", Validators.required],
         "senha2"       : ["", Validators.required],
         "tipoVeiculo"  : ["", Validators.required],
         "placa"        : ["", Validators.required],
         "modelo"       : ["", Validators.required]
      });
   }

   /**
    * Disparado quando a visualização de modelo está prestes a ser inserida
    * Determine se adicionamos ou editamos um registro
    * baseado em qualquer parâmetro de navegação fornecido
    *
    * @public
    * @method ionViewWillEnter
    * @return {None}
    */
   ionViewWillEnter() : void
   {
      this.resetFields();

      if(this.NP.get("record"))
      {
         this.isEdited      = true;
         this.selectEntry(this.NP.get("record"));
         this.pageTitle     = 'Amend entry';
      }
      else
      {
         this.isEdited      = false;
         this.pageTitle     = 'Create entry';
      }
   }

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
      this.cadastroNome         = item.nome;
      this.cadastroEmail        = item.email;
      this.cadastroTelefone     = item.telefone;
      this.cadastroSenha1       = item.senha1;
      this.cadastroSenha2       = item.senha2;
      this.cadastroTipoVeiculo  = item.tipoVeiculo;
      this.cadastroPlaca        = item.placa;
      this.cadastroModelo       = item.modelo;
      this.ID                   = item.id;
   }

   /**
    *Salvar um novo registro que foi adicionado ao formulário HTML da página
    * Use o método de postagem http do angular para enviar os dados do registro
    *
    * @public
    * @method insertRegistro
    * @param name 			{String} 			Nome do valor do campo de formulário
    * @param description 	{String} 	  Valor da descrição do campo de formulário
    * @return {None}
    */
   insertRegistro() : void
   {
        let
        nome        : string = this.form.controls["nome"].value,
        email       : string = this.form.controls["email"].value,
        telefone    : string = this.form.controls["telefone"].value,
        senha       : string = this.form.controls["senha1"].value,
        tipoVeiculo : string = this.form.controls["tipoVeiculo"].value,
        placa       : string = this.form.controls["placa"].value,
        modelo      : string = this.form.controls["modelo"].value;

      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "insert", "nome" : nome, "email" : email, "telefone" : telefone, "senha1" : senha, "tipoVeiculo" : tipoVeiculo, "placa" : placa, "modelo" : modelo},
        url       : any   = this.baseURI + "manage-data.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         // Se o cadastro foi bem sucedido, notifique o usuário
         //this.hideForm   = true;
         this.enviarNotificacao(`Parabéns ${nome}, seu cadastro foi realizado com sucesso!`);
         //this.enviarNotificacao(`nome: ${nome}, email: ${email}, telefone: ${telefone}, senha: ${senha}, tipoVeiculo: ${tipoVeiculo}, placa: ${placa}, modelo: ${modelo}`);
         this.navCtrl.setRoot(LoginPage);
      },
      (error : any) =>
      {
         this.enviarNotificacao('Ops! Algo deu errado!');
      });
   }

   /**
    * Verificar se as senhas digitadas são iguais, antes de efetuar
    * o registro no BD
    *
    * @public
    * @method cadastrarDados
    * @return {None}
    */
   cadastrarDados()
   {
    if (this.validaDados())
     {
        //this.enviarNotificacao(`Senhas conferem!`);
        this.insertRegistro();
     }
   }

   validaDados(){
     if(this.cadastroNome === ''){
      this.enviarNotificacao(`Usuário não pussui nome!`);
      return false;
     } else if (this.cadastroEmail === ''){
      this.enviarNotificacao(`Usuário não pussui e-mail`);
      return false;
     } else if (this.cadastroTelefone === ''){
      this.enviarNotificacao(`Usuário não pussui telefone`);
      return false;
     } else if (this.cadastroSenha1 === '' || this.cadastroSenha2 === ''){
      this.enviarNotificacao(`Senhas não foram digitadas`);
      return false;
     } else
     if(this.cadastroSenha1 !== this.cadastroSenha2){
      this.enviarNotificacao(`Senhas estão diferentes`);
      return false;
     } else if (this.cadastroTipoVeiculo === ''){
      this.enviarNotificacao(`Selecione um carro ou uma moto`);
      return false;
     } else if (this.cadastroPlaca === ''){
      this.enviarNotificacao(`Digite a placa do veiculo`);
      return false;
     } else if (this.cadastroModelo === ''){
      this.enviarNotificacao(`Digite o modelo do veículo`);
      return false;
     } else {
       return true;
     }
   }

   /**
    * Clear values in the page's HTML form fields
    *
    * @public
    * @method resetFields
    * @return {None}
    */
   resetFields() : void
   {
      this.cadastroNome           = "";
      this.cadastroEmail          = "";
      this.cadastroTelefone       = "";
      this.cadastroSenha1         = "";
      this.cadastroSenha2         = "";
      this.cadastroTipoVeiculo    = "";
      this.cadastroPlaca          = "";
      this.cadastroModelo         = "";
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

   limpar(){
    //this.enviarNotificacao(`Cadastro cancelado`);
    this.resetFields();
    this.voltarLogin();
   }

/*Controladores dos links entre as paginas*/
    voltarLogin(){
        this.navCtrl.setRoot(LoginPage);
    }

  }
