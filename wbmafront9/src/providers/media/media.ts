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

  /*
  logout() {

    localStorage.removeItem('token');
    this.navCtrl.push(LoginPage);
  }*/

  public register(user: User) {

    return this.http.post(this.apiUrl + '/users', user, this.options);
  }

  public getNewMediaFiles(start: number, amount: number) {
    return this.http.get(this.apiUrl + '/media?start=' + start + '&limit=' + amount, this.settingsX);
  }

  public getAllMediaFiles(){
    return this.http.get(this.apiUrl + '/media/all', this.settingsX);
  }

  public findMediafileWithsId(fileId:number){
    return this.http.get(this.apiUrl + '/media/' + fileId, this.settingsX);
  }

}
