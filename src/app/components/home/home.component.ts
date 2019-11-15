import { Component, OnInit, Input  } from '@angular/core';
import {ApiService} from '../../Services/api.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [NgbModalConfig, NgbModal]
})
export class HomeComponent implements OnInit {
  @Input() name;
public info:any;
public params:any;

  constructor(private api:ApiService, config: NgbModalConfig,
     private modalService: NgbModal) { 
      config.backdrop = 'static';
      config.keyboard = false;
     }

  ngOnInit() {
    this.get_lista();
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
  open(content, movie) {
    const modalRef = this.modalService.open(content);
    this.params= movie;
  }



}
