import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Imagefile} from "../../models/Imagefile";
import { MediaProvider} from "../../providers/media/media";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginPage} from "../login/login";
import {UploadPage} from "../upload/upload";
import {Mediaquery} from "../../models/Mediaquery";
import {FileviewPage} from "../fileview/fileview";
import {UserInfo} from "../../models/UserInfo";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  paramsForFile: any;
  startingPoint = 0;
  photosPerView = 10;
  lastOfPage = this.photosPerView-1;
  endOfPhotos = 0;
  userName = '';
  adderOfFile = '';

  files: any;
  query: any;
  filecount: 0;

  userInfo:any;

  mediafile: Imagefile = {
    file_id: 0,
    filename: '',
    filesize: 0,
    title: '',
    description: '',
    user_id: 0,
    media_type: '',
    mime_type: '',
    time_added: '',
    user_name: ''
  };


  mediafiles: Imagefile[];

  mediaquery: Mediaquery = {
    "file_count" : {
      "total": 0,
      "image": 0,
      "video": 0,
      "audio": 0
    }
  }

  constructor(public navCtrl: NavController, public mediaProvider: MediaProvider) {

  }

  ionViewDidLoad() {
    if (localStorage.getItem('token') !== null) {
      //get the userdata
      this.mediaProvider.getUserData().subscribe(response => {
        this.userName = response ['username'];
        //find the first files
        this.mediaProvider.getNewMediaFiles(0, this.photosPerView).subscribe((response2: Imagefile[]) => {
          console.log(response2);
          if (response2 !== undefined || response2 !== null) {
            this.mediafiles = response2;
            console.log(this.mediafiles);

            //find all the usernames corresponding to user_id:s of the ones that added files
            for(let i = 0; i<this.mediafiles.length;++i){
              this.mediaProvider.getUserInfo(this.mediafiles[i].user_id).subscribe(response => {
                this.mediafiles[i].user_name = response['username'];
              });
            }
          } else if (response2 === null) {
            console.log('null');
          } else {
            console.log('undefined');
          }

          //get the amount of total files
          this.mediaProvider.getAllMediaFiles().subscribe(response4 => {
            if (response4 !== undefined){
              this.query=response4;
              this.filecount=this.query.file_count.total;
              this.endOfPhotos = this.filecount-1;
            }else{
              console.log(undefined);
            }
          });

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
    if(this.lastOfPage>this.endOfPhotos){
      this.lastOfPage=this.endOfPhotos;
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

  /*
    Go to the start page
   */
  goToFirstSet(){
    this.startingPoint = 0;
    this.lastOfPage = this.startingPoint+this.photosPerView-1;
    this.getMediaFiles();
  }

  /*
    Go to the last page
  */
  goToLastSet(){
    this.startingPoint = Math.floor(this.endOfPhotos/this.photosPerView)*this.photosPerView;
    this.lastOfPage = this.startingPoint+this.photosPerView-1;
    if(this.lastOfPage>this.endOfPhotos){
      this.lastOfPage = this.endOfPhotos;
    }
    this.getMediaFiles();
  }

  /*
    This function is helper function, when one goes from one page to another. This loads ne
   */
  getMediaFiles(){
    this.mediaProvider.getNewMediaFiles(this.startingPoint,this.photosPerView).subscribe((response3: Imagefile[]) => {
      this.mediafiles = response3;
      for(let i = 0; i<this.mediafiles.length;++i){
        this.mediaProvider.getUserInfo(this.mediafiles[i].user_id).subscribe(response => {
          this.mediafiles[i].user_name = response['username'];
          /*
          this.userInfo = response;
          if(this.userInfo !== undefined) {
            this.mediafiles[i].user_name = this.userInfo.username;
          }else{
            this.mediafiles[i].user_name = 'unknown';
          }
          */
        });
      }
    });
  }

  goToFileview(file_id:number,typeOfFile:string){

    this.paramsForFile = {
      "file_id":file_id,
      "media_type":typeOfFile
    };

    this.navCtrl.push(FileviewPage, this.paramsForFile);
  }

  getUsernameOfId(id:number): string{
    let name = 'jill';
    this.mediaProvider.getUserInfo(id).subscribe(response => {
        this.userInfo = response;

    });
    if(this.userInfo !== undefined) {
      name = this.userInfo.username;
    }
    return name;
  }

}



