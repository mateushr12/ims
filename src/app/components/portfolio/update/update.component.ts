import { PortfolioService } from './../../../services/portfolio.service';
import { Estrategia } from './../../../models/estrategia';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContaService } from 'src/app/services/conta.service';
import { EstrategiaService } from 'src/app/services/estrategia.service';
import { TipoService } from 'src/app/services/tipo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {

  formulario!: FormGroup;
  data_inicio!: Date;  
  estrategias: any;
  contas: any;
  tipos: any;  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<UpdateComponent>,
    private fb: FormBuilder,
    private estrategiaService: EstrategiaService,
    private contaService: ContaService,
    private tipoService: TipoService,
    private portfolio: PortfolioService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    
    console.log(this.data.portfolio.id)

    this.formulario = this.fb.group({
      estrategia: [this.data.portfolio.estrategia , Validators.required],
      conta: [this.data.portfolio.conta, Validators.required],
      tipo: [this.data.portfolio.tipo, Validators.required],
      dt_inicio: [this.data.portfolio.dt_inicio, Validators.required],
      vl_inicio: [this.data.portfolio.vl_inicio, Validators.required],
      qtd_inicio: [this.data.portfolio.qtd_inicio, Validators.required],
      dt_fim: [this.data.portfolio.dt_fim],
      vl_fim: [this.data.portfolio.vl_fim],
      qtd_fim: [this.data.portfolio.qtd_fim],
    })

    this.allCounts();
    this.allTypes();
    this.allStrategies();           

  }

  update() {
    let dataUpdate = this.formulario.value;
    let idUpdate = this.data.portfolio.id;
    this.portfolio.editOperation(idUpdate, dataUpdate)
    .then((res) => {
      console.log('registro atualizado');
      this.msgSucesso();
      this.dialog.close();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  alterDate() {
    this.data_inicio = this.formulario.value.dt_inicio;
  }

  allCounts() {
    this.contaService.getCount().subscribe((data) => {
      this.contas = data.map((e:any) => {
        return { ...e.payload.doc.data() }
      })
    })
  }

  allTypes() {
    this.tipoService.getType().subscribe((data) => {
      this.tipos = data.map((e:any) => {
        return { ...e.payload.doc.data() }
      })
    })
  }

  allStrategies(){
    this.estrategiaService.getStrategy().subscribe((data) => {
      this.estrategias = data.map((e:any) => {
        return { ...e.payload.doc.data() }
      })
    })
  }

  maxValue() {    
    this.formulario.controls['qtd_fim'].setValidators(Validators.max(this.formulario.value.qtd_inicio));  
    this.formulario.controls['qtd_fim'].updateValueAndValidity();  
  }

  msgSucesso() {
    this.snack.open('Operação atualizada com sucesso!', '',{
      duration: 4000,
      panelClass: ['sucesso'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  get validForm(){
    return this.formulario.valid
  }

}
