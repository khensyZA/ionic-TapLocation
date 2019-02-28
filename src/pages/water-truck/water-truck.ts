
import { HomePage } from './../home/home';
import { UserprofilePage } from './../userprofile/userprofile';
import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';

import { TruckProvider } from '../../providers/truck/truck';
import { Base64 } from '@ionic-native/base64';
import { TruckInfoPage } from '../truck-info/truck-info';


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
  // listtrucks = [];
  listTrucks = [];
  imgPreview = null;
  name: string = 'trucks';
  key: any;
  reftruck = firebase.database().ref('waterService/trucks/answers/');

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private truck: TruckProvider) {
  }

  ionViewDidEnter() {
    this.uploadtrucks();

  }

  truckInfo(i:number){
    this.navCtrl.push(TruckInfoPage,{data:this.listTrucks[i]})
  }

  

  uploadtrucks() {
    this.reftruck.on('value', resp => {
      this.listTrucks = snapshotToArray(resp);

    });
    this.truck.getalltrucks().then((res: any) => {
    });
  }

  add(){
    this.navCtrl.setRoot(HomePage)
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
