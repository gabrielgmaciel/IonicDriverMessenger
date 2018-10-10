import { Component } from '@angular/core';
<<<<<<< Updated upstream
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

=======
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigPage } from '../config/config';
import { MensagensRecebidasPage } from '../mensagens-recebidas/mensagens-recebidas';
import { EnviarNotificacaoPage } from '../enviar-notificacao/enviar-notificacao';
>>>>>>> Stashed changes

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

<<<<<<< Updated upstream


   /**
    * @name items
    * @type {Array}
    * @public
    * @description     Used to store returned PHP data
    */
   public items : Array<any> = [];



   constructor(public navCtrl: NavController,
               public http   : HttpClient)
   {

   }




   /**
    * Triggered when template view is about to be entered
    * Returns and parses the PHP data through the load() method
    *
    * @public
    * @method ionViewWillEnter
    * @return {None}
    */
   ionViewWillEnter() : void
   {
      this.load();
   }




   /**
    * Retrieve the JSON encoded data from the remote server
    * Using Angular's Http class and an Observable - then
    * assign this to the items array for rendering to the HTML template
    *
    * @public
    * @method load
    * @return {None}
    */
   load() : void
   {
      this.http
      .get('http://localhost/webService/retrieve-data.php')
      .subscribe((data : any) =>
      {
         console.dir(data);
         this.items = data;
      },
      (error : any) =>
      {
         //console.dir(error);
      });
   }




   /**
    * Allow navigation to the AddTechnologyPage for creating a new entry
    *
    * @public
    * @method addEntry
    * @return {None}
    */
   addEntry() : void
   {
      this.navCtrl.push('AddTechnologyPage');
   }




   /**
    * Allow navigation to the AddTechnologyPage for amending an existing entry
    * (We supply the actual record to be amended, as this method's parameter,
    * to the AddTechnologyPage
    *
    * @public
    * @method viewEntry
    * @param param 		{any} 			Navigation data to send to the next page
    * @return {None}
    */
   viewEntry(param : any) : void
   {
      this.navCtrl.push('AddTechnologyPage', param);
   }

=======
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  openConfigPage(){
    this.navCtrl.push(ConfigPage);
  }
  openMensagensRecebidasPage(){
    this.navCtrl.push(MensagensRecebidasPage);
  }
  openEnviarNotificacaoPage(){
    this.navCtrl.push(EnviarNotificacaoPage);
  }
>>>>>>> Stashed changes

}
