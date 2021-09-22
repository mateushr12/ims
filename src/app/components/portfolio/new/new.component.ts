import { map } from 'rxjs/operators';
import { Portfolio } from './../../../models/portfolio.model';
import { PortfolioService } from './../../../services/portfolio.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  //object that will recive the operation form field
  formulario: any;

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.intialForm();
        
  }

  intialForm() {
    this.formulario = this.fb.group({
      estrategia: ['', Validators.required],
      conta: ['', Validators.required],
      tipo: ['', Validators.required],
      dt_inicio: ['', Validators.required],
      vl_inicio: ['', Validators.required],
      qtd_inicio: ['', Validators.required],
      dt_fim: [''],
      vl_fim: [''],
      qtd_fim: [''],
    });
  }

  save() {
    let operacao = this.formulario.value as Portfolio;

    this.portfolioService
      .newOperation(operacao)
      .then((res) => {
        this.formulario.reset();
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  }
}
