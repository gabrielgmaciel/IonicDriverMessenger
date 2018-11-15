import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class UsuarioProvider {

  constructor(private dbProvider: DatabaseProvider) {}


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





  public insert(codigoUsuario: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into dadosUsuario (codigoUsuario) values (?)';
        let data = [codigoUsuario];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'truncate table dadosUsuario';
        return db.executeSql(sql)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public recuperaCodigo() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from dadosUsuario';
        return db.executeSql(sql)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              var codigo = '';
              codigo = item.codigoUsuario;
              return codigo;
            }
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
    }

}
