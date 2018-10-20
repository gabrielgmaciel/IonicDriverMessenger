import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigPage } from './config';
import { AlterarDadosPage } from '../alterar-dados/alterar-dados';
import { VeiculosCadastradosPage } from '../veiculos-cadastrados/veiculos-cadastrados';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@NgModule({
  declarations: [
    ConfigPage,
    AlterarDadosPage,
    VeiculosCadastradosPage,
    HomePage,
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(ConfigPage),
  ],
})
export class ConfigPageModule {}
