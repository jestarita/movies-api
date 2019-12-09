import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() movie: any;  
  faStar = faStar;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Input() modalVisible:any;
  constructor() {   
    
   }

  ngOnInit() {    
 
  this.exists1('nombre');
  this.exists2('nombre');
 
  } 

  onCloseModal(event: any){
     
    this.movie = null;
   }



  exists1(parametros) {
     
    if (localStorage.getItem(parametros)) {
      return false;
    } else {
      return true;
    }
  }

  exists2(parametros) {
    if (localStorage.getItem(parametros)) {
      return true;
    } else {
      return false;
    }
  }

    //method to add movies to favorites
    add_favorites(params) {
      if (localStorage.getItem(params)) {
      console.log('la pelicula ya esta agregada'); 
      } else {
        localStorage.setItem(params, params);
      }  
    }
  
  
    //method to remove movies from favorites
    remove_favorites(params) {
      if (localStorage.getItem(params)) {
        localStorage.removeItem(params);     
      } else {
       console.log('la pelicula no existe')
      }
    }

  


}
