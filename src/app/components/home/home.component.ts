import { Component, OnInit, Input  } from '@angular/core';
import {ApiService} from '../../Services/api/api.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [NgbModalConfig, NgbModal]
})
export class HomeComponent implements OnInit {


private info:any;
public parametros:any;
private genres:any;
private lista = [];
itemsPerPage = 6;
ButtonDisabled: boolean = true;
ButtonDisabled1: boolean = true;
  constructor(private api:ApiService, config: NgbModalConfig,
     private modalService: NgbModal) { 
      config.backdrop = 'static';
      config.keyboard = false;
     }

  ngOnInit() {
    this.get_lista();
    this.Get_genres();
    
  }

  get_lista(){
    this.api.getmovies().subscribe(
      (data: any)=>{
        this.info= data.results;
      }, 
      error =>{
        console.log(<any>error);
      }
    )
  }
  


  Get_genres(){
   
    this.api.getmovies().subscribe(
      (data: any)=>{
        this.genres= data.results;
        this.genres.forEach(element => {
          this.lista.push(element.generos);
         
        
        });
        this.delete_duplicates(this.lista);
        
      }, 
      error =>{
        console.log(<any>error);
      }
    )
  
   

  }

  delete_duplicates(generos){

    var array = [];
    var newArray = [];
    for(let i in generos){
      array.push(generos[i]);
    }

    
    var uniqueArray = array.filter((thing, index) => {
      const _thing = JSON.stringify(thing);
      return index === array.findIndex(obj => {
        return JSON.stringify(obj) === _thing;
      });
    });
    var result = Object.keys(uniqueArray).map(function(key) {
      return [uniqueArray[key]];
    });
    
    
  
    console.log(result);    

    return result;
    }
    exists(parametros){      
    
      if(localStorage.getItem(parametros.nombre)){
        this.ButtonDisabled = true;
        this.ButtonDisabled1 = false;     
      }else{
        this.ButtonDisabled = false;
        this.ButtonDisabled1 = true;
      }
    }

    open(content, movie) {
      const modalRef = this.modalService.open(content);
      this.parametros= movie;      
      this.exists(this.parametros);
    }
 

    //method to add movies to favorites
    add_favorites(params){
    if(localStorage.getItem(params)){
   
      this.ButtonDisabled = true;
      this.ButtonDisabled1 = false;
    }else{
      localStorage.setItem(params, params);  
      this.ButtonDisabled = true;
      this.ButtonDisabled1 = false;
    }
        
    }

    //method to remove movies from favorites
    remove_favorites(params){
      if(localStorage.getItem(params)){
        localStorage.removeItem(params);
        this.ButtonDisabled = false;  
        this.ButtonDisabled1 = true;      
     
      }else{    
        this.ButtonDisabled = false;
        this.ButtonDisabled1 = false;  
      }
    }


  
  
  }