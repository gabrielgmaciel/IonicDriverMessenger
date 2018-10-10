import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// local de inserção das paginas
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { HomePage } from '../pages/home/home';
<<<<<<< Updated upstream
=======
import { ConfigPage} from '../pages/config/config';
import { AlterarDadosPage } from '../pages/alterar-dados/alterar-dados';
import { VeiculosCadastradosPage } from '../pages/veiculos-cadastrados/veiculos-cadastrados';
import { MensagensRecebidasPage } from '../pages/mensagens-recebidas/mensagens-recebidas';
import { EnviarNotificacaoPage } from '../pages/enviar-notificacao/enviar-notificacao';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
>>>>>>> Stashed changes


@NgModule({
  declarations: [
    MyApp,
<<<<<<< Updated upstream
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
=======
    LoginPage,
    CadastroPage,
    HomePage,
    ConfigPage, 
    AlterarDadosPage, 
    VeiculosCadastradosPage, 
    MensagensRecebidasPage,
    EnviarNotificacaoPage
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    
>>>>>>> Stashed changes
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
<<<<<<< Updated upstream
    HomePage
=======
    LoginPage,
    CadastroPage,
    HomePage,
    ConfigPage, 
    AlterarDadosPage,
    VeiculosCadastradosPage,
    MensagensRecebidasPage,
    EnviarNotificacaoPage  
>>>>>>> Stashed changes
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
