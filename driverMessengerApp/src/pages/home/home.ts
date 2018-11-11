import { Component } from '@angular/core';
import { NavController, NavOptions, NavParams, IonicPage, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigPage } from '../config/config';
import { MensagensRecebidasPage } from '../mensagens-recebidas/mensagens-recebidas';
import { EnviarNotificacaoPage } from '../enviar-notificacao/enviar-notificacao';


//@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public fb : FormBuilder, public toastCtrl  : ToastController)
    {
      this.form = fb.group({
        "letras"         : ["", Validators.required],
        "numeros"        : ["", Validators.required],
        "placa"          : ["", Validators.required]
     });
    }

   public form    : FormGroup;

   public letras  : any;

   public numeros : any;

   public placa :any;

   public alert : Array<any> = [];

   selectEntry(item : any) : void
   {
      this.letras         = item.nome;
      this.numeros        = item.email;
      this.placa          = item.placa;
   }

   private baseURI   : string  = "http://localhost/webService/";

   busca() : void
   {
        let
        letras        : string = this.form.controls["letras"].value,
        numeros       : string = this.form.controls["numeros"].value,
        placa       : string = this.form.controls["placa"].value;

      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "busca", "placa" : placa},
          url       : any   = this.baseURI + "manage-data.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         // Se o cadastro foi bem sucedido, notifique o usuário
         // Ajuste tecnico para trazer evitar que e-mail e placa já cadastrados sejam cadastrdos
        this.alert [0] = data[0].alertEmail;
        this.alert [1] = data[0].alertPlaca;


        if (this.alert[1] == 'Placa já cadastrada!')
        {
          this.enviarNotificacao(`${this.alert[1]}`);
          this.enviarNotificacao(`Placa já cadastrada!`)
        } else
        {
          this.navCtrl.push(EnviarNotificacaoPage);
        }

      },
      (error : any) =>
      {
         this.enviarNotificacao('Ops! Algo deu errado!');
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

    openConfigPage(){
        this.navCtrl.push(ConfigPage);
    }
    openMensagensRecebidasPage(){
        this.navCtrl.push(MensagensRecebidasPage);
    }
    openEnviarNotificacaoPage(){
        this.navCtrl.push(EnviarNotificacaoPage);
    }
}
