import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TesteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TesteProvider {

  constructor(public http: HttpClient) {

  }

  /**
    * @name codigoUsuario
    * @type {number}
    * @public
    * @description     Usado para armazenar dados  PHP do usuario retornados
    */
   public codigoUsuario : number;

  public usuario(codigo: number) {
    this.codigoUsuario = codigo;
  }

  /**
   * recuperaUsuario
   */
  public recuperaUsuario() {
    return this.codigoUsuario;
  }

  /**
   * excluirUsuario
   */
  public excluirUsuario() {
    this.codigoUsuario = 0;
  }

}
