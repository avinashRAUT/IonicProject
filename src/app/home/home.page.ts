import { Component, ViewChild ,OnInit} from '@angular/core';
import { Howl } from 'howler';
import { IonRange } from '@ionic/angular';
import { Music2Service } from '../music2.service';

export interface Track{
  name:string;
  path:string;
  music_url:string;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  activeTrack: Track = null;
  player:Howl=null;
  isPlaying=false;
  progress=0;
  public allMusicList = [];

  @ViewChild('range', { static:false }) range : IonRange;
  constructor(private musicProvider:Music2Service) {}

  async ngOnInit() {
    
    this.musicProvider.getMusic()
      .subscribe((musicList:any) => {
        this.allMusicList = musicList;
        console.log(this.allMusicList);
      });
  }
  playlist : Track[] = this.allMusicList;

  start(track:Track){  
    if(this.player){
      this.player.stop();
    }
    console.log("Play Music");
    this.player = new Howl({
    src:[track.music_url],
    html5:true,
    onplay:()=>{
      console.log("onend");
      this.isPlaying=true;
      this.activeTrack=track;
      this.updateProgress();

    },
    onend:()=>{
      console.log("onend");
    }
  });
  this.player.play();
  }

  togglePlayer(pause){
    this.isPlaying=!pause;
    if(pause){
      this.player.pause();
    }else{
      this.player.play();
    }
  }

  next(){
    console.log(this.activeTrack);
    let index = this.allMusicList.indexOf(this.activeTrack);
    console.log("Index value"+index)

    console.log(this.allMusicList);
    if(index!=this.allMusicList[index - 1])
    {
      this.start(this.allMusicList[index + 1])

    }else{
      this.start(this.allMusicList[1]);
    }
  }

  prev(){
    let index = this.allMusicList.indexOf(this.activeTrack);
    if(index>0){
      this.start(this.allMusicList[index - 1])
    }else{
      this.start(this.allMusicList[this.playlist.length -1]);
    }
  }

  seek(){
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));

  }

  updateProgress(){

    let seek : any = this.player.seek();
    this.progress = (( seek / this.player.duration()) * 100 ) || 0;
    setTimeout(()=>{
      this.updateProgress();
    },1000);

  }
}
