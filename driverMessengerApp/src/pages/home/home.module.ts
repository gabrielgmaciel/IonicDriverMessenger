import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ConfigPage } from '../config/config';
import { BrMaskerModule } from 'brmasker-ionic-3';
import {Ionic2MaskDirective} from 'ionic2-mask-directive';
import { MensagensRecebidasPage } from '../mensagens-recebidas/mensagens-recebidas';
import { EnviarNotificacaoPage } from '../enviar-notificacao/enviar-notificacao';

@NgModule({
  declarations: [
    HomePage,
    ConfigPage,
    MensagensRecebidasPage,
    EnviarNotificacaoPage,
    Ionic2MaskDirective
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    BrMaskerModule,
  ],
})
export class HomePageModule {}
