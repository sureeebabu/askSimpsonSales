import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { CommfunProvider } from '../../providers/commfun/commfun';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@IonicPage()
@Component({
  selector: 'page-fileupload',
  templateUrl: 'fileupload.html',
})
export class FileuploadPage {
  public claimID: number;
  public claimDetailsID: number;
  public json:any;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public http:HttpClient,
      public alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      private myFunc: CommfunProvider
  ) {
    this.claimID = this.navParams.get('claimID');
    this.claimDetailsID = this.navParams.get('claimDetailsID');
  }

  ionViewDidLoad() {
    this.GetImageData(this.claimDetailsID);
  }

  GetImageData(claimDetailsID) {
    let data: Observable<any>;
    let url = this.myFunc.domainURL + "WarrantyAppAPI/RequestClaim.php?DataImg=" + claimDetailsID;
    let loader = this.loadingCtrl.create({
      content: 'Fetching Data From Server...'
    });
    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.json = result;
        loader.dismiss();
      }, error => {
        loader.dismiss();        
        console.log(error);
        //alert('Error in Invoice');
      });
    });
  }


}
