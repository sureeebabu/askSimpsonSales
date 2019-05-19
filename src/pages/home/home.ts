import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage
  ) {
  
  }

  ionViewDidLoad() {
  }

  listRegion(){
    this.navCtrl.push('ListregionPage');
  }

  goToChangePwd(){
    this.navCtrl.push('ChangepwdPage');
  }

  logOutFn(){
  this.storage.clear().then(() => {
      console.log('all keys are cleared');
    });
  }
}
