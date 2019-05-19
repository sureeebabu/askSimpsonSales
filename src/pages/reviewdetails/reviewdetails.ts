import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { CommfunProvider } from '../../providers/commfun/commfun';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-reviewdetails',
  templateUrl: 'reviewdetails.html',
})
export class ReviewdetailsPage {
	public SValue:any;
  public claimDetailsID:number;
  public materialCode:any;
	public materialName:any;
	public materialDate:any;
	public materialQty:any;
	public materialWarrenty:any;
	public materialUpload:any;
	public materialFile:any;
	public remarks:any;
	public reviewDetailsJson:any;
	public refNo:any;
	public createdDate:any;
	public invoiceNo:any;
	public claimStatus:any;
	public masterID:any;
	public detailID:any;	
		
	warrentyData: any = [];	

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public http:HttpClient,
      public sqlite: SQLite,
      public storage: Storage,
      public alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      private myFunc: CommfunProvider
      ) {
        this.SValue = this.navParams.get('Svalue');
        this.claimDetailsID = this.navParams.get('claimDetailsID');
  }

  ionViewDidLoad() {
    if(this.SValue=='Local') {
	    this.ReviewDetails(this.claimDetailsID);
	  }
	  else if(this.SValue=='Server') {
    	this.ReviewServeDetails(this.claimDetailsID);
	  }

  } 

  ReviewDetails(claimDetailsID) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM WarrentyRequest WHERE rowid=?', [claimDetailsID]).then(res => {
        this.materialCode = res.rows.item(0).MaterialCode;
        this.createdDate = res.rows.item(0).timestamp;
        this.materialName = res.rows.item(0).MaterialName;
        this.materialDate = res.rows.item(0).timestamp;
        this.materialWarrenty = res.rows.item(0).warrenty;
        this.materialQty = res.rows.item(0).Quantity;
        this.remarks = res.rows.item(0).Remarks;
        this.invoiceNo = res.rows.item(0).InvoiceNo;

      }).catch(e => console.log(e));
    }).catch(e => console.log(e));
  }  

  ReviewServeDetails(claimDetailsID) {
    let data: Observable<any>;
    data = this.http.get(this.myFunc.domainURL  +'WarrantyAppAPI/RequestClaim.php?Vid=' + claimDetailsID);
    data.subscribe(result => {

      this.materialCode = result[0].item_code;
      this.materialName = result[0].item_name;
      this.materialWarrenty = result[0].warranty_request_type;
      this.materialQty = result[0].item_qty;
      this.remarks = result[0].remarks;
      this.refNo = result[0].ref_no;
      this.createdDate = result[0].created_date;
      this.invoiceNo = result[0].invoice_no;
      this.claimStatus = result[0].claim_status;
      this.masterID = result[0].claim_master_id;
      this.detailID = result[0].claim_details_id;
      this.ReviewTrackDetails();
    }, (error) => {
      //alert(JSON.stringify(error));
    });

  }

  ReviewTrackDetails() {
    let data: Observable<any>;
    let url = this.myFunc.domainURL + 'WarrantyAppAPI/RequestClaim.php?MasterId=' + this.masterID + '&DetailId=' + this.detailID
    let loader = this.loadingCtrl.create({
      content: 'Fetching Data From Server...'
    });
    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.reviewDetailsJson = result;
        loader.dismiss();
      }, error => {
        loader.dismiss();        
        console.log(error);
        //alert('Error in Invoice');
      });
    });
  }

}
