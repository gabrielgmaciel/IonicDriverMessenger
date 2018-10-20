import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VeiculosCadastradosPage } from './veiculos-cadastrados';
import { MensagensRecebidasPage } from '../mensagens-recebidas/mensagens-recebidas';

@NgModule({
  declarations: [
    VeiculosCadastradosPage,
    MensagensRecebidasPage
  ],
  imports: [
    IonicPageModule.forChild(VeiculosCadastradosPage),
  ],
})
export class VeiculosCadastradosPageModule {
  

}
