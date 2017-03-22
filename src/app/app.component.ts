import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';

export const firebaseConfig = {
  apiKey            : 'AIzaSyARzHvxkE2OltzCipFR311uemD8dOdnq3U',
  authDomain        : 'https://console.firebase.google.com/project/sitema-tercnico',
  databaseURL       : 'https://sitema-tercnico.firebaseio.com',
  storageBucket     : 'gs://sitema-tercnico.appspot.com',
  messagingSenderId : '915897620611'
};


  

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    
    firebase.initializeApp(firebaseConfig);
  
  }
}
