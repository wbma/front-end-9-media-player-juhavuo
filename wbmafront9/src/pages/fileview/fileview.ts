import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FileParameters} from "../../models/FileParameters";
import {MediaProvider} from "../../providers/media/media";
import {Imagefile} from "../../models/Imagefile";
import {CommentInfo} from "../../models/CommentInfo";
import {UserInfo} from "../../models/UserInfo";

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

  fileId: number;
  sizetext = '';

  shownFile: any;
  commenter: UserInfo;
  showComments = false;

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

  data: any;
  comments: CommentInfo[];

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
      if (this.mediafile.filesize > 1024 * 1024) {
        this.mediafile.filesize = Math.round(100 * this.mediafile.filesize / (1024 * 1024)) / 100;
        this.sizetext = '' + this.mediafile.filesize + ' MB';
      } else {
        this.mediafile.filesize = Math.round(100 * this.mediafile.filesize / 1024) / 100;
        this.sizetext = '' + this.mediafile.filesize + ' kB';
      }
    });

    this.mediaProvider.getCommentsByFileId(this.fileId) .subscribe((response: CommentInfo[]) => {
      this.comments = response;
      if(this.comments.length>0){
        this.showComments = true;
      }
      for(let i = 0;i < this.comments.length;++i){
        this.mediaProvider.getUserInfo(this.comments[i].user_id).subscribe((response2: UserInfo)=>{
          this.commenter = response2;
          this.comments[i].user_name = this.commenter.username;
        });
      }
    });

  }

}

