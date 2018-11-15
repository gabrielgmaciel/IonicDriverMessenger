import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ExcluirContaPage } from "../pages/excluir-conta/excluir-conta";
import { LoginPage } from '../pages/login/login';
//import { CadastroPage } from '../pages/cadastro/cadastro';
//import { ConfigPage} from '../pages/config/config';
import {AlterarDadosPage} from "../pages/alterar-dados/alterar-dados";
import {VeiculosCadastradosPage} from "../pages/veiculos-cadastrados/veiculos-cadastrados";

import { DatabaseProvider } from "../providers/database/database";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, dbProvider: DatabaseProvider ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
        { title: 'Alterar Dados', component: AlterarDadosPage},
        { title: 'Veículos Cadastrados', component: VeiculosCadastradosPage},
        { title: 'Apagar Conta', component: ExcluirContaPage},
        { title: 'Logoff', component: LoginPage}
    ];

    var teste = '';

    //Criando o banco de dados
    dbProvider.createDatabase()
    .then(() => {
      // fechando a SplashScreen somente quando o banco for criado
      this.openLoginPage(splashScreen);
      console.log('Banco de Dados Criado com sucesso!');
    })
    .catch(() => {
      // ou se houver erro na criação do banco
      this.openLoginPage(splashScreen);
      console.log('Erro ao Criar Banco de Dados!');
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private openLoginPage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = LoginPage;
  }
}

