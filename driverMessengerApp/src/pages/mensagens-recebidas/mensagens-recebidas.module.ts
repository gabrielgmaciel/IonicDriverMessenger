import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MensagensRecebidasPage } from './mensagens-recebidas';
import { HomePage } from '../home/home';

@NgModule({
  declarations: [
    MensagensRecebidasPage,
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(MensagensRecebidasPage),
  ],
})
export class MensagensRecebidasPageModule {}
