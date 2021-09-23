import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Portfolio } from './../../../models/portfolio.model';
import { PortfolioService } from './../../../services/portfolio.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EstrategiaService } from 'src/app/services/estrategia.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  //object that will recive the operation form field
  formulario: any;
  data_inicio!: Date;
  estrategias: any;

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService,
    private estrategiaService: EstrategiaService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.intialForm();
    this.estrategiaService.getStrategy().subscribe((data) => {
      this.estrategias = data.map((e: any) => {
        return {
          ...e.payload.doc.data(),
        };
      });
    });
        
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
        //this.formulario.reset();        
        this.route.navigate(['/portfolio'])
      })
      .catch((e) => {
        console.error(e);
      });
  }

  alterDate() {
    this.data_inicio = this.formulario.value.dt_inicio;
  }

  maxValue() {    
    this.formulario.controls['qtd_fim'].setValidators(Validators.max(this.formulario.value.qtd_inicio));  
    this.formulario.controls['qtd_fim'].updateValueAndValidity();  
  }

  get validForm(){
    return this.formulario.valid
  }

}
