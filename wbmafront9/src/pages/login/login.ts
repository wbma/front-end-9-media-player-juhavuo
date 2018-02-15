import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {HttpErrorResponse} from "@angular/common/http";
import {HomePage} from "../home/home";
import {RegistrationPage} from "../registration/registration";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  inStack = ['initial'];

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loggingin(){
    this.mediaProvider.login();
      this.mediaProvider.getUserData().subscribe(response => {
        this.navCtrl.setRoot(HomePage);
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }



  showStack(){
    for ( let i=0; i < this.navCtrl.length(); i++ )
    {
      let v = this.navCtrl.getViews()[i];
      console.log(v.component.name);

    }
  }

  goToRegistration(){
    this.navCtrl.push(RegistrationPage);
  }

}
