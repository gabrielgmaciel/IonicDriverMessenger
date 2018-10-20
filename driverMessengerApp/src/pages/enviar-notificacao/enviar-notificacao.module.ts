import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnviarNotificacaoPage } from './enviar-notificacao';
import { HomePage } from '../home/home';

@NgModule({
  declarations: [
    EnviarNotificacaoPage,
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(EnviarNotificacaoPage),
  ],
})
export class EnviarNotificacaoPageModule {}
