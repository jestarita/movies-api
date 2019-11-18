import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url:string;
  
  constructor(private _http: HttpClient) {

    this.url = 'https://api-movies-free.herokuapp.com/api/';
   }
  
      getmovies(){   
      return this._http.get(this.url+'movies');

   }

   getgenres(){
    return this._http.get(this.url+'genres');
   }


}
