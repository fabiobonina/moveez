import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { ModalsPage } from '../../pages/modals/modals';
import { Image } from '../../providers/image';
import { Preloader } from '../../providers/preloader';
import { Database } from '../../providers/database';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   private auth     : any;
   public movies    : any;
   private email    : string = 'fabiobonina@gmail.com';
   private pass     : string = '123abc';


   constructor( public navCtrl       : NavController,
                private platform     : Platform,
                private modalCtrl    : ModalController,
                private _IMG         : Image,
                private _LOADER      : Preloader,
                private _DB          : Database)
   {
   }


   ionViewDidEnter()
   {
      this._LOADER.displayPreloader();
      this.platform.ready()
      .then(() =>
      {
         firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
         .then((credentials) =>
         {
            this.loadAndParseMovies();
         })
         .catch((err : Error) =>
         {
            console.log(err.message);
         });
      });
   }


   loadAndParseMovies()
   {
      this.movies = this._DB.renderMovies();
      this._LOADER.hidePreloader();
   }


   addRecord()
   {
      let modal = this.modalCtrl.create(ModalsPage);
      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            this._LOADER.displayPreloader();
            this.loadAndParseMovies();
         }
      });
      modal.present();
   }


   editMovie(movie)
   {
      let params = { movie: movie, isEdited: true },
          modal  = this.modalCtrl.create(ModalsPage, params);

      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            this._LOADER.displayPreloader();
            this.loadAndParseMovies();
         }
      });
      modal.present();
   }



   deleteMovie(movie)
   {
      this._LOADER.displayPreloader();

      this._DB.deleteMovie(movie.id)
      .then((data) =>
      {
         this.loadAndParseMovies();
      });
   }
}