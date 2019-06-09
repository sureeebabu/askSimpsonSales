import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CommfunProvider } from '../../providers/commfun/commfun';
@IonicPage()
@Component({
  selector: 'page-claimdetails',
  templateUrl: 'claimdetails.html',
})
export class ClaimdetailsPage {

  public claimID:number;
  public claimDetJson:any;
  public isRecordAvailable:boolean =false;
  public warrantyStatus:string;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public http:HttpClient,
      public alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      private myFunc: CommfunProvider
  ) {
    this.claimID = this.navParams.get('claimID')
  }

  ionViewDidLoad() {
    this.getClaimDetailsByID(this.claimID);
  }

  goToRegionPage() {
    this.navCtrl.setRoot('ListregionPage');
  }

  goToReviewPage(claimDetailsID,Svalue){
    this.navCtrl.push('ReviewdetailsPage',{
      "claimDetailsID" :claimDetailsID,
      "Svalue": Svalue
    });
  }

  uploadData(claimDetailsID){
    this.navCtrl.push('FileuploadPage',{
      "claimDetailsID":claimDetailsID,
      "claimID" : this.claimID
    });
  }

  getClaimDetailsByID(claimID) {
    let data: Observable<any>;
    let url = this.myFunc.domainURL + "SalesAppAPI/WarrentyList.php?Sid=" + claimID;
    let loader = this.loadingCtrl.create({
      content: 'Fetching Data From Server...'
    });
    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.isRecordAvailable = false;
        this.claimDetJson = result;
        loader.dismiss();
      }, error => {
        this.isRecordAvailable = true;
        loader.dismiss();        
        console.log(error);
        //alert('Error in Invoice');
      });
    });
  }

  onChange(ClaimValue) {
    if (ClaimValue != 'Empty') {
      var splitData = ClaimValue.split('~');

      let altsuccess = this.alertCtrl.create({
        title: 'Alert',
        message: 'Are you sure to update status..!',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              var link = this.myFunc.domainURL +  'SalesAppAPI/ClaimStatusUp.php';
              var myData = JSON.stringify({
                 WarrantyClaim: splitData[0],
                 InvoiceNo: splitData[1],
                 ClaimDetId: splitData[2] 
                });
              this.http.post(link, myData)
                .subscribe(data => {

                }, error => {
                  console.log(error);
                });
                this.getClaimDetailsByID(this.claimID);

            }
          },
          {
            text: 'Cancel',
            handler: () => {
            }
          }
        ]
      });
      altsuccess.present();
    }
  }

}
