import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) {

  }

  getmovies() {
    return this._http.get(environment.moviesUrl + 'movies');

  }

  getgenres() {
    return this._http.get(environment.moviesUrl + 'genres');
  }


}
