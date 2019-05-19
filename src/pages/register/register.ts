import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { CommfunProvider } from '../../providers/commfun/commfun';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  authForm: FormGroup;
  public userPassword: string;
  public userName: string;
  public fullUserName: string;
  public custCode: string;
  public type = 'password';
  public showPass = false;
  public mobileNo: string;
  public mobileModel: string;
  public mobileSerialNo:string;
  public FCMID: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public sim: Sim,
    public device: Device,
    public http: HttpClient,
    private toastCtrl: ToastController,
    public app: App, 
    private storage: Storage,
    public myFunc: CommfunProvider,
    public loadingCtrl: LoadingController,
    ) {
      this.authForm = fb.group({
        'chkFullUserName': [null, Validators.compose([Validators.required])],
        'chkCustCode': [null, Validators.compose([Validators.required])],
        'chkUserName': [null, Validators.compose([Validators.required])],
        'chkUserPassword': [null, Validators.compose([Validators.required])]
      });
  }

  ionViewDidLoad() {
    
  }

}
