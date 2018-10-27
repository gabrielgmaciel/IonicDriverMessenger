import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
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
import { SQLite } from '@ionic-native/sqlite'
import { DatabaseProvider } from '../providers/database/database';

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
      AddTechnologyPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),

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
      MensagensRecebidasPage,
      EnviarNotificacaoPage,
      AddTechnologyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // Grande sacada para formatar numeros e datas no formato brasileiro
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider
  ]
})
export class AppModule {}
