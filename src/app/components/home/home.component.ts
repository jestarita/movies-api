import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../Services/api/api.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [NgbModalConfig, NgbModal]
})
export class HomeComponent implements OnInit {


  private info: any;
  private parametros: any;
  items = 6;
  isLoading: boolean = false;
  ButtonDisabled: boolean = true;
  ButtonDisabled1: boolean = true;
  private selected = [];
  genresArray = [];
  private everything:any;
  private favorite:boolean = true;
  constructor(private api: ApiService, config: NgbModalConfig,
    private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.get_lista();
  }

  get_lista() {
    this.isLoading = true;
    this.api.getmovies().subscribe(
      (data: any) => {
        this.info = data.results.sort((a, b)=> a.nombre.localeCompare(b.nombre));
        this.everything = data.results.sort((a, b)=> a.nombre.localeCompare(b.nombre));
        this.genresArray = this.getGenres(data.results);   
        this.isLoading = false;
        this.status_favorite();
      },
      error => {
        this.isLoading = false;
        console.log(<any>error);
      }
    )
  }

  status_favorite(){
    this.favorite = false;
  }

  getGenres(list: Array<any>) {
    let temp = [];
    list.forEach(l => {
      l.generos.forEach(g => {
        temp.push(g)
      })
    })
    return temp.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
  }


  exists(parametros) {
    if (localStorage.getItem(parametros.nombre)) {
      this.ButtonDisabled = true;
      this.ButtonDisabled1 = false;
    } else {
      this.ButtonDisabled = false;
      this.ButtonDisabled1 = true;
    }
  }

  open(content, movie) {
    const modalRef = this.modalService.open(content);
    this.parametros = movie;
    this.exists(this.parametros);
  }

  
  Filter_genres(genre){    
   
    if(genre != ""){
      this.selected.length = 0;
      if (this.selected.length == 0) {
        this.selected.push(genre);
        this.check_selected()
        return
      }
    }else{
      this.info = this.everything;
    }
   
  }


  check_selected(){
    this.info = this.everything;
    var resultado = [];    
    for (let i = 0; i < this.selected.length; i++) {
      for (let j = 0; j < this.info.length; j++) {
        for (let k = 0; k < this.info[j].generos.length; k++) {
         if(this.selected[i] == this.info[j].generos[k])
          resultado.push(this.info[j]);
        }        
      }      
    }
  this.info = resultado.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
  }

  //method to add movies to favorites
  add_favorites(params) {
    if (localStorage.getItem(params)) {

      this.ButtonDisabled = true;
      this.ButtonDisabled1 = false;
    } else {
      localStorage.setItem(params, params);
      this.ButtonDisabled = true;
      this.ButtonDisabled1 = false;
    }

  }

  //method to remove movies from favorites
  remove_favorites(params) {
    if (localStorage.getItem(params)) {
      localStorage.removeItem(params);
      this.ButtonDisabled = false;
      this.ButtonDisabled1 = true;

    } else {
      this.ButtonDisabled = false;
      this.ButtonDisabled1 = false;
    }
  }




}