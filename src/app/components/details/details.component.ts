import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
  providers: [NgbModalConfig, NgbModal]
})
export class DetailsComponent implements OnInit {
  ButtonDisabled: boolean = true;
  ButtonDisabled1: boolean = true;
  public parametros: any;
  constructor(config: NgbModalConfig,
    private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit() {
  }
  open1(prueba) {
    const modalRef = this.modalService.open(prueba);  
  }

}
