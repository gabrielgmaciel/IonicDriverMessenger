import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HomePage } from "../home/home";
import { MensagensRecebidasPage } from "../mensagens-recebidas/mensagens-recebidas";
import { TesteProvider } from "./../../providers/teste/teste";

@IonicPage()
@Component({
  selector: "page-enviar-notificacao",
  templateUrl: "enviar-notificacao.html"
})
export class EnviarNotificacaoPage {
  frases: Array<any>;
  placa: any;
  codEnvio: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public fb: FormBuilder,
    public toastCtrl: ToastController,
    public testeProvider: TesteProvider
  ) {
    this.load();
    this.placa = navParams.get("placa");
    this.codEnvio = navParams.get("cod_usuario");
    this.form = fb.group({
      frase: ["", Validators.required]
    });
  }

  public form: FormGroup;

  public fraseEnvio: any;

  selectEntry(frases: any): void {
    this.fraseEnvio = frases.frase;
  }

  enviaFrase() {
    let frase = this.form.controls["frase"].value,
      placa = this.placa;
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        key: "envioMensagem",
        cod_usuario: this.codEnvio,
        frase: frase,
        placa: placa
      },
      url: any = "http://localhost/webService/manage-data.php";

    this.http.post(url, JSON.stringify(options), headers).subscribe(
      data => {
        this.enviarNotificacao(`Mensagem enviada com sucesso!`);
        this.navCtrl.setRoot(HomePage);
      },
      (error: any) => {
        this.enviarNotificacao("Ops! Algo deu errado!");
      }
    );
  }

  load(): void {
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = { key: "busaFrases" };

    this.http
      .post(
        "http://localhost/webService/retrieve-data.php",
        JSON.stringify(options),
        headers
      )
      .subscribe(
        (data: any) => {
          console.dir(data);
          this.frases = data;
        },
        (error: any) => {
          console.dir(error);
        }
      );
  }

  envia() {
    if (this.fraseEnvio == null) {
      this.enviarNotificacao(`Selecione uma frase`);
      return false;
    } else {
      this.enviaFrase();
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EnviarNotificacaoPage");
  }
  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }
  openMensagensRecebidasPage() {
    this.navCtrl.setRoot(MensagensRecebidasPage);
  }

  enviarNotificacao(message: string): void {
    let notificacao = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notificacao.present();
  }
}
