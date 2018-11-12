import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
