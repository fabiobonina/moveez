import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Image } from '../../providers/image';
import { Preloader } from '../../providers/preloader';
import { Database } from '../../providers/database';
import * as firebase from 'firebase';

@Component({
  selector: 'page-modals',
  templateUrl: 'modals.html'
})
export class ModalsPage {

   public form             : any;
   public filmImage  	   : any;
   public movies           : any;
   public movieName        : any     = '';
   public movieImage       : any     = '';
   public movieGenres      : any     = [];
   public movieDuration    : any     = '';
   public movieSummary     : any     = '';
   public movieActors      : any     = [];
   public movieYear        : any     = '';
   public movieRating      : any     = '';
   public movieId          : string  = '';
   public isEditable       : boolean = false;


   constructor(
      public navCtrl        : NavController,
      public params         : NavParams,
      private _FB 	        : FormBuilder,
      private _IMG          : Image,
      public viewCtrl       : ViewController,
      private _LOADER       : Preloader,
      private _DB           : Database
   )
   {
      this.form 		= _FB.group({
         'summary' 		: ['', Validators.minLength(10)],
         'year' 		: ['', Validators.maxLength(4)],
         'name' 		: ['', Validators.required],
         'duration'		: ['', Validators.required],
         'image'		: ['', Validators.required],
         'rating'		: ['', Validators.required],
         'genres' 		: ['', Validators.required],
         'actors' 		: ['', Validators.required]
      });

      this.movies = firebase.database().ref('films/');


      if(params.get('isEdited'))
      {
          let movie 		    = params.get('movie'), k;

          this.movieName	    = movie.title;
          this.movieDuration	= movie.duration;
          this.movieSummary   	= movie.summary;
          this.movieRating   	= movie.rating;
          this.movieYear    	= movie.year;
          this.movieImage       = movie.image;
          this.filmImage        = movie.image;
          this.movieId          = movie.id;


          for(k in movie.genres)
          {
             this.movieGenres.push(movie.genres[k].name);
          }


          for(k in movie.actors)
          {
             this.movieActors.push(movie.actors[k].name);
          }

          this.isEditable      = true;
      }
   }




   saveMovie(val)
   {
      this._LOADER.displayPreloader();

      let title	    : string		= this.form.controls["name"].value,
	 	  summary 	: string 		= this.form.controls["summary"].value,
  		  rating  	: number		= this.form.controls["rating"].value,
  		  genres  	: any		    = this.form.controls["genres"].value,
  		  actors  	: any		    = this.form.controls["actors"].value,
  		  duration 	: string		= this.form.controls["duration"].value,
  		  year    	: string		= this.form.controls["year"].value,
  		  image     : string        = this.filmImage,
  		  types     : any           = [],
  		  people    : any           = [],
  		  k         : any;


      for(k in genres)
      {
         types.push({
            "name" : genres[k]
         });
      }


      for(k in actors)
      {
         people.push({
            "name" : actors[k]
         });
      }


      if(this.isEditable)
      {

         if(image !== this.movieImage)
         {
            this._DB.uploadImage(image)
            .then((snapshot : any) =>
            {
               let uploadedImage : any = snapshot.downloadURL;

               this._DB.updateDatabase(this.movieId,
               {
	              title    : title,
	              summary  : summary,
	              rating   : rating,
	              duration : duration,
	              image    : uploadedImage,
	              genres   : types,
	              actors   : people,
	              year     : year
	           })
               .then((data) =>
               {
                  this._LOADER.hidePreloader();
               });

            });
         }
         else
         {

           this._DB.updateDatabase(this.movieId,
           {
	          title    : title,
	          summary  : summary,
	          rating   : rating,
	          duration : duration,
	          genres   : types,
	          actors   : people,
	          year     : year
	       })
           .then((data) =>
           {
              this._LOADER.hidePreloader();
           });
	     }

      }
      else
      {
         this._DB.uploadImage(image)
         .then((snapshot : any) =>
         {
            let uploadedImage : any = snapshot.downloadURL;

            this._DB.addToDatabase({
	           title    : title,
	           image    : uploadedImage,
	           summary  : summary,
	           rating   : rating,
	           duration : duration,
	           genres   : types,
	           actors   : people,
	           year     : year
	        })
            .then((data) =>
            {
               this._LOADER.hidePreloader();
            });
         });

      }
      this.closeModal(true);
   }



   closeModal(val = null)
   {
      this.viewCtrl.dismiss(val);
   }



   selectImage()
   {
      this._IMG.selectImage()
      .then((data) =>
      {
         this.filmImage = data;
      });
   }


}
