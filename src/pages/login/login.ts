import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { CommfunProvider } from '../../providers/commfun/commfun';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  authForm: FormGroup;
  public userPassword: string;
  public userMobile: string;
  public type = 'password';
  public showPass = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    private storage: Storage,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public myFunc: CommfunProvider
    )
     {
      this.authForm = fb.group({
        'chkUserMobile': [null, Validators.compose([Validators.required])],
        'chkUserPassword': [null, Validators.compose([Validators.required])]
      });      
  }

  ionViewDidLoad() {
  }

  goToRegister(){
    this.navCtrl.push('RegisterPage');
  }

  chkLogin() {
    //this.navCtrl.push('Homepage');
    // console.log(this.userName);
    // console.log(this.userPassword);
    let data: Observable<any>;
    let url = this.myFunc.domainURL + 'SalesAppAPI/LoginApi.php?LGP=1';
    let queryParams = JSON.stringify({ Mobile: this.userMobile, Password: this.userPassword });

    let loader = this.loadingCtrl.create({
      content: 'Verifying User'
    });

    data = this.http.post(url, queryParams);
    loader.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        if (result != 0) {
          if (result[0].status != '0') {
            this.storage.set('lsUserID', result[0].sales_person_master_id);
            this.storage.set('lsUserPwd', result[0].password);
            this.storage.set('lsUserName', result[0].sales_person_name);
            this.storage.set('lsMobileNo', this.userMobile);
            this.navCtrl.setRoot('HomePage');
          } else {
            this.toastMsgFn('Account In-Active');
          }
        } else {
          this.toastMsgFn('User Name or Password is Invalid');
        }
        loader.dismiss();
      }, error => {
        console.log(error);
        loader.dismiss();
      });
    });
  }

  toastMsgFn(msg: string) {
    this.toast.create({
      message: msg,
      position: 'bottom',
      duration: 3000,
    }).present();
  }

  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }


}
