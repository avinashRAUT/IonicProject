import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
const API:string="http://kokorospark.com/test.php";

@Injectable({
  providedIn: 'root'
})
export class Music2Service {

  constructor(public http:HttpClient) {
    console.log("Hello MusicProvider Provider");    
   }
   getMusic(){
     
     return this.http.get(API);
   }
}