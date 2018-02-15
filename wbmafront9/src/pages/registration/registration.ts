import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/User";
import {MediaProvider} from "../../providers/media/media";
import {HomePage} from "../home/home";

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  user: User = {
    username: '',
    password: '',
    email: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  register() {
    this.mediaProvider.register(this.user).subscribe(response => {
      console.log(response);
      this.mediaProvider.username = this.user.username;
      this.mediaProvider.password = this.user.password;
      this.mediaProvider.login();
      this.navCtrl.popToRoot();
    },(error) =>{
      console.log(error);
    });
  }

}
