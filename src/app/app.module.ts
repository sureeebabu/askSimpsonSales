import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { CommfunProvider } from '../providers/commfun/commfun';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { SQLite } from '@ionic-native/sqlite';
import { Camera } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';
import { Device } from '@ionic-native/device';
import { Sim } from '@ionic-native/sim';
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Camera,
    SQLite,
    Device,
    Sim,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommfunProvider
  ]
})
export class AppModule {}
