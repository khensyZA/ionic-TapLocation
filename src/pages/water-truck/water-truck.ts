import { TruckInfoPage } from './../truck-info/truck-info';
import { TapInfoPage } from './../tap-info/tap-info';

import { HomePage } from './../home/home';
import { UserprofilePage } from './../userprofile/userprofile';
import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';

import { TruckProvider } from '../../providers/truck/truck';
import { Base64 } from '@ionic-native/base64';
import { CoordstPage } from '../coordst/coordst';


/**
 * Generated class for the WatertruckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-water-truck',
  templateUrl: 'water-truck.html',
})
export class WaterTruckPage {
  listtrucks = [];
  listTrucks = [];
  imgPreview = null;
  name: string = 'trucks';
  key: any;
  reftruck = firebase.database().ref('waterService/trucks/answers/');

  constructor(public navCtrl: NavController,  private loadingCtrl: LoadingController, public navParams: NavParams, private truck: TruckProvider) {
  }

  ionViewDidEnter() {
    this.uploadtrucks();

  }



  uploadtrucks() {
    let loading = this.loadingCtrl.create({
      content: 'Loading content...'
    });
    loading.present();
    this.reftruck.on('value', resp => {
      this.listTrucks = snapshotToArray(resp);
      loading.dismiss();
    });
    this.truck.getalltrucks().then((res: any) => {
    });
  }
  truckInfo(i: number) {
    this.navCtrl.push(TruckInfoPage, { data: this.listTrucks[i] })
  }

  add() {
    this.navCtrl.setRoot(CoordstPage)
  }

}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
}