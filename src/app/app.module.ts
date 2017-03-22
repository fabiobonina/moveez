import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ModalsPage } from "../pages/modals/modals";
import { Preloader } from "../providers/preloader";
import { Database } from "../providers/database";
import { Image } from "../providers/image";

/*export const firebaseConfig = {
  apiKey: "AIzaSyARzHvxkE2OltzCipFR311uemD8dOdnq3U",
  authDomain: "sitema-tercnico.firebaseapp.com",
  databaseURL: "https://sitema-tercnico.firebaseio.com",
  storageBucket: "sitema-tercnico.appspot.com",
  messagingSenderId: "915897620611"
};*/


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Image,
    Preloader,
    Database,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  /*constructor(){
    firebase.initializeApp(firebaseConfig);
  }*/
 }
