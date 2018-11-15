import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { Ionic2MaskDirective } from 'ionic2-mask-directive';
//import {Md5} from '';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { ConfigPage} from '../pages/config/config';
import { AlterarDadosPage } from '../pages/alterar-dados/alterar-dados';
import { VeiculosCadastradosPage } from '../pages/veiculos-cadastrados/veiculos-cadastrados';
import { MensagensRecebidasPage } from '../pages/mensagens-recebidas/mensagens-recebidas';
import { EnviarNotificacaoPage } from '../pages/enviar-notificacao/enviar-notificacao';
import { AddTechnologyPage } from '../pages/add-technology/add-technology';
import { ExcluirContaPage } from "../pages/excluir-conta/excluir-conta";

import { SQLite } from "@ionic-native/sqlite";
import { DatabaseProvider } from "../providers/database/database";
import { UsuarioProvider } from '../providers/usuario/usuario';
import { TesteProvider } from '../providers/teste/teste';



@NgModule({
  declarations: [
      MyApp,
      HomePage,
      LoginPage,
      CadastroPage,
      ConfigPage,
      AlterarDadosPage,
      VeiculosCadastradosPage,
      MensagensRecebidasPage,
      EnviarNotificacaoPage,
      ExcluirContaPage,
      AddTechnologyPage,
      Ionic2MaskDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    BrMaskerModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      HomePage,
      LoginPage,
      CadastroPage,
      ConfigPage,
      AlterarDadosPage,
      VeiculosCadastradosPage,
      ExcluirContaPage,
      MensagensRecebidasPage,
      EnviarNotificacaoPage,
      AddTechnologyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,

    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    UsuarioProvider,
    TesteProvider
  ]
})
export class AppModule {}
