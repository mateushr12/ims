import { Portfolio } from './../../models/portfolio.model';
import { PortfolioService } from './../../services/portfolio.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewComponent } from './new/new.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  //operacoes!: Portfolio[]
  operacoes: any

  constructor(private dialogo: MatDialog, private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.getOperation().subscribe(
      (data) => {
        this.operacoes = data.map( (e : any) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(), 
            dt_inicio: e.payload.doc.data()['dt_inicio'].toDate(), 
            total: ((e.payload.doc.data()['qtd_inicio'])*(e.payload.doc.data()['vl_inicio']))                        
          } 
          //as Portfolio
        })
      })
  }

  novo(){
    this.dialogo.open(NewComponent);
  }

}
