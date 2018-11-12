import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExcluirContaPage } from './excluir-conta';

@NgModule({
  declarations: [
    ExcluirContaPage,
  ],
  imports: [
    IonicPageModule.forChild(ExcluirContaPage),
  ],
})
export class ExcluirContaPageModule {}
