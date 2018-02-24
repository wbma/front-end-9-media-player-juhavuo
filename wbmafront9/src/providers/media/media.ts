import { HttpClient } from '@angular/common/http';
import{ HttpHeaders} from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { User } from "../../models/User";
import {NavController} from "ionic-angular";
import {LoginPage} from "../../pages/login/login";

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  newComment = '';
  username: string;
  password: string;
  email: string;
  status: string;
  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaUrl ='http://media.mw.metropolia.fi/wbma/uploads/';

  const;
  settingsX = {
    headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
  };

  constructor(public http: HttpClient) {

  }

  public login() {

    const body = {
      username: this.username,
      password: this.password
    };



    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    this.http.post(this.apiUrl + '/login', body, settings).subscribe(response => {
      console.log(this.username);
      console.log(this.password);
      console.log(response['token']);
      localStorage.setItem('token', response['token']);
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.status = error.message;
    });
  }

  public uploadFile(formdata: FormData) {

    console.log('token');
    return this.http.post(this.apiUrl + '/media', formdata, this.settingsX);
  }

  public getUserData() {

    return this.http.get(this.apiUrl + '/users/user', this.settingsX);
  }



  public register(user: User) {

    return this.http.post(this.apiUrl + '/users', user, this.options);
  }

  /*
    This is used to show files for one view in home-page
   */
  public getNewMediaFiles(start: number, amount: number) {
    return this.http.get(this.apiUrl + '/media?start=' + start + '&limit=' + amount, this.settingsX);
  }

  /*
    This is needed to get the total amount of files so that one can navigate to view the last files in home-page
   */
  public getAllMediaFiles(){
    return this.http.get(this.apiUrl + '/media/all', this.settingsX);
  }

  /*
    This is needed to show a specific file in fileview-page
   */
  public findMediafileWithsId(fileId:number){
    return this.http.get(this.apiUrl + '/media/' + fileId, this.settingsX);
  }

  /*
    This is needed to combine username to certain user_id, so that it can be shown, who has posted a photo/audio/video
   */
  public getUserInfo(userId:number){
    return this.http.get(this.apiUrl+'/users/'+userId,this.settingsX);
  }

  public getCommentsByFileId(fileId:number){
    return this.http.get(this.apiUrl+'/comments/file/'+fileId);
  }

  public addComment(fileId:number){

    const cBody = {
      "file_id": fileId,
      "comment": this.newComment
    }

    return this.http.post(this.apiUrl+'/comments',cBody, this.settingsX);
  }

}
