import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CommfunProvider } from '../../providers/commfun/commfun';
@IonicPage()
@Component({
  selector: 'page-listcustomer',
  templateUrl: 'listcustomer.html',
})
export class ListcustomerPage {
public regMasterID:number;
public custJson:any;
public isRecordAvailable:boolean =false;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public http:HttpClient,
      public alertCtrl: AlertController,
      private myFunc: CommfunProvider,
      private loadingCtrl: LoadingController,
      ) {
        this.regMasterID = this.navParams.get('regMasterID');
  }

  ionViewDidLoad() {    
    this.getCustomerList(this.regMasterID);
  }

  goToClaimPage(custCode:string){
    this.navCtrl.push('ListclaimPage',{
      "custCode" : custCode
    });
  }

  goToRegionPage() {
    this.navCtrl.setRoot('ListregionPage');
  }

  getCustomerList(regMasterID) {
    let data: Observable<any>;
    let url = this.myFunc.domainURL + "SalesAppAPI/list_customer.php?cid=" + regMasterID;
    let loader = this.loadingCtrl.create({
      content: 'Fetching Data From Server...'
    });
    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.isRecordAvailable = false;
        this.custJson = result;
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
      this.custJson = this.custJson.filter((item) => {
        return item.customer_name.toLowerCase().indexOf(searchTxt.toLowerCase()) > -1 || item.city.toLowerCase().indexOf(searchTxt.toLowerCase()) > -1 || item.state.toLowerCase().indexOf(searchTxt.toLowerCase()) > -1;
      });
    }else{
      this.custJson= null;
      this.getCustomerList(this.regMasterID);
    }
  }

}
