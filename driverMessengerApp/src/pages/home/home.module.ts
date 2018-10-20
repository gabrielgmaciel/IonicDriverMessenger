import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ConfigPage } from '../config/config';
import { MensagensRecebidasPage } from '../mensagens-recebidas/mensagens-recebidas';
import { EnviarNotificacaoPage } from '../enviar-notificacao/enviar-notificacao';

@NgModule({
  declarations: [
    HomePage,
    ConfigPage,
    MensagensRecebidasPage,
    EnviarNotificacaoPage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
