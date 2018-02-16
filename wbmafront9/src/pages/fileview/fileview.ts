import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FileParameters} from "../../models/FileParameters";
import {MediaProvider} from "../../providers/media/media";
import {Imagefile} from "../../models/Imagefile";

/**
 * Generated class for the FileviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fileview',
  templateUrl: 'fileview.html',
})
export class FileviewPage {

  fileId:number;
  fileType:string;

  shownFile: any;

  mediafile: Imagefile = {
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

  fileParameters: FileParameters;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {

    this.navParams.get('paramsForFile');
    this.fileParameters = this.navParams.data;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FileviewPage');
    this.fileId = this.fileParameters.file_id;
    this.mediaProvider.findMediafileWithsId(this.fileId).subscribe(response => {
      console.log(response);
      this.shownFile = response;
      this.mediafile = this.shownFile;
    });
  }

}
