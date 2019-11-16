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


public info:any;
public params:any;
private genres:any;
public lista:[];
itemsPerPage = 6;
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
    var listado:any = [];
    this.api.getmovies().subscribe(
      (data: any)=>{
        this.genres= data.results;
        this.genres.forEach(element => {

         
         console.log(element.generos);
        


        });
      }, 
      error =>{
        console.log(<any>error);
      }
    )

  }

  // delete_duplicates(generos){
  //   var newArray = [];
  //   var lookupObject = {};
  //   for(var i in generos) {
  //   lookupObject[i] = generos[i];
  //   }
  //   for(i in lookupObject) {
  //   newArray.push(lookupObject[i]);
  //   }

  //  // console.log(newArray)
  //   return newArray;
  //   }

    open(content, movie) {
      const modalRef = this.modalService.open(content);
      this.params= movie;
    }
  
  }