import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { CommfunProvider } from '../../providers/commfun/commfun';

@IonicPage()
@Component({
  selector: 'page-listregion',
  templateUrl: 'listregion.html',
})
export class ListregionPage {
  public regionJson: any;
  public isRecordAvailable:boolean =false;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private http: HttpClient,
      private storage: Storage,
      private loadingCtrl: LoadingController,
      private myFunc: CommfunProvider
    ) {
      
  }

  ionViewDidLoad() {
    this.storage.get('lsUserID').then((userID) => {
      this.getRegionListByUserID(userID);
    });
  }
  
  settingFn(){
    this.navCtrl.push('SettingsPage');
  }

goToCustomerList(regMasterID:number){
  this.navCtrl.push('ListcustomerPage',{
    "regMasterID" :regMasterID
  });
}

  getRegionListByUserID(userID) {
    let data: Observable<any>;
    let url = this.myFunc.domainURL + "SalesAppAPI/list_region.php?rid=" + userID;
    let loader = this.loadingCtrl.create({
      content: 'Fetching Data From Server...'
    });
    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.isRecordAvailable = false;
        this.regionJson = result;
        loader.dismiss();
      }, error => {
        this.isRecordAvailable = true;
        loader.dismiss();        
        console.log(error);
        //alert('Error in Invoice');
      });
    });
  }

  onSearch(event) {
    console.log(event.target.value);
    var searchTxt = event.target.value;
    if (searchTxt != '' && searchTxt != null && searchTxt != undefined){
      this.regionJson = this.regionJson.filter((item) => {
        return item.region_name.toLowerCase().indexOf(searchTxt.toLowerCase()) > -1;
      });
    }else{
      this.regionJson= null;
      this.storage.get('lsUserID').then((userID) => {
        this.getRegionListByUserID(userID);
      });
    }
  }

}
