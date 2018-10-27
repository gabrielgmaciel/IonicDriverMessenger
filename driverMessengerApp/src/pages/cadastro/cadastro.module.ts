import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPage } from './cadastro';
import { BrMaskerModule } from 'brmasker-ionic-3';
import {Ionic2MaskDirective} from 'ionic2-mask-directive';

@NgModule({
  declarations: [
    CadastroPage,
    Ionic2MaskDirective
  ],
  imports: [
    IonicPageModule.forChild(CadastroPage),
    BrMaskerModule,

  ],
})
export class CadastroPageModule {}
