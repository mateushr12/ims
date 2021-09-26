import { UpdateComponent } from './update/update.component';
import { Portfolio } from './../../models/portfolio.model';
import { PortfolioService } from './../../services/portfolio.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewComponent } from './new/new.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  //operacoes!: Portfolio[]
  operacoes: any;

  constructor(
    private dialogo: MatDialog,
    private portfolioService: PortfolioService,
    private snack : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.allOperations();
  }

  novo() {
    this.dialogo.open(NewComponent);
  }

  allOperations() {
    this.portfolioService.getOperation().subscribe((data) => {
      this.operacoes = data.map((e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
          dt_inicio: e.payload.doc.data()['dt_inicio'].toDate(),
          total_inicio:
            e.payload.doc.data()['qtd_inicio'] *
            e.payload.doc.data()['vl_inicio'],
          total_fim:
            e.payload.doc.data()['qtd_fim'] * e.payload.doc.data()['vl_fim'],
        };
        //as Portfolio
      });
      console.log(this.operacoes);
    });
  }

  edit(portfolio: any) {
    this.dialogo.open( UpdateComponent, {
      data: {
        portfolio
      }
    })
  }

  delete(id: any) {
    if (confirm('delete?')) {
      this.portfolioService.deleteOperation(id)
      .then(() => {
        this.msgDelete();
      })
      .catch((err) => {
        console.error(err);
      })
    }    
  }

  msgDelete() {
    this.snack.open('Operação deletada com sucesso!', '', {
      panelClass: ['delete'],
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    })
  }


}
