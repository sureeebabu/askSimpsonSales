import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CommfunProvider } from '../../providers/commfun/commfun';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-listclaim',
  templateUrl: 'listclaim.html',
})
export class ListclaimPage {
  public strCustCode:string;
  public claimJson:any;
  public isRecordAvailable:boolean =false;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public http:HttpClient,
      public alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      private myFunc: CommfunProvider
      ) 
    {
      this.strCustCode = this.navParams.get('custCode');
  }

  ionViewDidLoad() {
    this.getClaimDetailsByCustCode(this.strCustCode);
  }


  goToRegionPage() {
    this.navCtrl.setRoot('ListregionPage');
  }

  goToClaimDetailsPage(claimID:number){
    this.navCtrl.push('ClaimdetailsPage',{
      "claimID" :claimID
    });
  }

  getClaimDetailsByCustCode(custCode) {
    let data: Observable<any>;
    let url = this.myFunc.domainURL + "SalesAppAPI/RequestClaim.php?AdminData=Admin&custcode=" + custCode;
    let loader = this.loadingCtrl.create({
      content: 'Fetching Data From Server...'
    });
    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        if(result.length != 0){
          this.claimJson = result;
        }else{
          this.isRecordAvailable = true;
        }
        
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
      this.claimJson = this.claimJson.filter((item) => {
        return item.invoice_no.toLowerCase().indexOf(item.toLowerCase()) > -1 || item.claim_status.toLowerCase().indexOf(item.toLowerCase()) > -1;
      });
    }else{
      this.claimJson= null;
      this.getClaimDetailsByCustCode(this.strCustCode);
    }
  }


}
