import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Imagefile} from "../../models/Imagefile";
import { MediaProvider} from "../../providers/media/media";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginPage} from "../login/login";
import {UploadPage} from "../upload/upload";
import {Mediaquery} from "../../models/Mediaquery";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  startingPoint = 0;
  photosPerView = 10;
  lastOfPage = this.photosPerView-1;
  addingtime = '';
  userName = '';

  imagefile: Imagefile = {
    file_id: 0,
    filename: '',
    filesize: 0,
    title: '',
    description: '',
    user_id: 0,
    media_type: '',
    mime_type: '',
    time_added: ''
  };

  mediaquery: Mediaquery = {
    "file_count" : {
      "total": 0,
      "image": 0,
      "video": 0,
      "audio": 0
}
  }

  imagefiles: any;
  query: any;
  filecount: 0;
  baseurl = ' http://media.mw.metropolia.fi/wbma/uploads/';
  srcforimage = this.baseurl;

  constructor(public navCtrl: NavController, public mediaProvider: MediaProvider) {

  }

  ionViewDidLoad() {
    if (localStorage.getItem('token') !== null) {
      //get the userdata
      this.mediaProvider.getUserData().subscribe(response => {
        this.userName = response ['username'];
        //find the first files
        this.mediaProvider.getNewMediaFiles(0, this.photosPerView).subscribe(response2 => {
          console.log(response2);
          if (response2 !== undefined || response2 !== null) {
            this.imagefiles = response2;
            //get the amount of total files
            this.mediaProvider.getAllMediaFiles().subscribe(response4 => {
              if (response4 !== undefined){
                this.query=response4;
                this.filecount=this.query.file_count.total;
            }else{
              console.log(undefined);
            }
            });
          } else if (response2 === null) {
            console.log('null');
          } else {
            console.log('undefined');
          }
        });
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.navCtrl.push(LoginPage);
      });
    } else {
      this.navCtrl.push(LoginPage);
    }
  }

  loggingout(){

    localStorage.removeItem('token');
    this.navCtrl.setRoot(LoginPage);
  }

  toUppload(){
    this.navCtrl.push(UploadPage);
  }

  /*
    Function to view previous set of photos (set size = photosPerViiew)
   */
  viewNextPhotos() {
    this.startingPoint += this.photosPerView;
    this.lastOfPage = this.startingPoint+this.photosPerView-1;
    if(this.lastOfPage>this.filecount){
      this.lastOfPage=this.filecount;
    }
    this.getMediaFiles();
  }
  /*
    Function to view next set of photos (set size = photosPerView)
   */
  viewPreviousPhotos() {
    if(this.startingPoint-this.photosPerView >= 0){
      this.startingPoint -= this.photosPerView;
      this.lastOfPage = this.startingPoint+this.photosPerView-1;
      this.getMediaFiles();
    }
  }

  goToFirstSet(){
    this.startingPoint = 0;
    this.lastOfPage = this.startingPoint+this.photosPerView-1;
    this.getMediaFiles();
  }

  goToLastSet(){
    this.startingPoint = Math.floor(this.filecount/this.photosPerView)*this.photosPerView;
    this.lastOfPage = this.startingPoint+this.photosPerView-1;
    if(this.lastOfPage>this.filecount){
      this.lastOfPage = this.filecount;
    }
    this.getMediaFiles();
  }

  getMediaFiles(){
    this.mediaProvider.getNewMediaFiles(this.startingPoint,this.photosPerView).subscribe(response3 => {
      this.imagefiles = response3;
    });
  }
  
  goToFileview(typeOfFile:string){
    console.log(typeOfFile);
  }


}



