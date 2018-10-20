import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

var vm = this;

 //Declaraçao de funções
 vm.criarConstantes = criarConstantes;
 vm.recuperaDadosUsuario = recuperaDadosUsuario;

 //Criação de variáveis
  vm.dadosUsuario = {};

function criarConstantes(codigoUsuario, nome, email){
  vm.dadosUsuario = {
    codigoUsuario: codigoUsuario,
    nome: nome,
    email: email
  }
}

function recuperaDadosUsuario(){
  return vm.dadosUsuario;
}

export class HomePageModule {}
