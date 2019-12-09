import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../Services/api/api.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  private info: any;
  private parametros: any;
  items = 6;
  private movieSelected: any;
  isLoading: boolean = false;
  genSelected;
  private everything: any;
  private genres: any;
  @Input() name: string;
  faStar = faStar;
  private results:boolean;

  constructor(private api: ApiService) {
   
  }

  ngOnInit() {
    this.get_movies();
    this.get_list_genres();
    this.readLocalStorageValue('nombre');
    
  }

  get_movies() {
    this.isLoading = true;
    this.api.getmovies().subscribe(
      (data: any) => {
        this.info = data.results.sort((a, b) => a.nombre.localeCompare(b.nombre));
        this.everything = data.results.sort((a, b) => a.nombre.localeCompare(b.nombre));
        this.isLoading = false;

      },
      error => {
        this.isLoading = false;
        console.log(<any>error);
      }
    )
  }

  get_list_genres() {
    this.api.getgenres().subscribe(
      (data: any) => {
        this.genres = data.results.sort((x, z) => x.label.localeCompare(z.label));
      }),
      error => {
        console.log(<any>error)
      }

  }

  readLocalStorageValue(key): boolean {
    if (localStorage.getItem(key)) {
      return true
    } else {
      return false;
    }
  }

  open(movie) {  
    this.movieSelected = null;
    this.movieSelected = movie;
    
  }

 

  Filter_genres(genre) {
    this.info = genre != "all" ? this.everything.filter(p => p.generos.filter(g => g == genre).length) : this.everything;
  }
  
}