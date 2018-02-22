import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {Imagefile} from "../../models/Imagefile";

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  file: File;
  imagefile: Imagefile = {
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
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];

  }

  startUpload() {
    // create FormData-object
    // add ttle and dexcription to FormData object
    // add file to FormData object
    // send FormData object somewere
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('title', this.imagefile.title);
    formData.append('description', this.imagefile.description);
    console.log(this.file.toString())
    console.log(this.imagefile.title);
    console.log(this.imagefile.description);
    this.mediaProvider.uploadFile(formData).subscribe(response => {
      this.navCtrl.popToRoot();
    }, (error) => {
      alert('Something went wrong!!!');
    });
  }

}
