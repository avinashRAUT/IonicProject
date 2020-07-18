import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Music2Service } from './music2.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private musicProvider:Music2Service
  ) {
    this.initializeApp();
  }
 //it will call once the complete lifeCycle complete ....
 ionViewDidLoad(){
   console.log("ionVieload");
  //get the music
  this.musicProvider.getMusic()
   .subscribe(musicList =>console.log(musicList));
}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
