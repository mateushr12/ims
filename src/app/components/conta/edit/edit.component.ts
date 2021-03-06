import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContaService } from 'src/app/services/conta.service';
import { UpdateComponent } from '../../portfolio/update/update.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  formulario!: FormGroup;
  estrategias: any;
  contas: any;  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<UpdateComponent>,
    private fb: FormBuilder,
    private contaService: ContaService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      detalhes: [this.data.conta.detalhes],
      nome: [this.data.conta.nome, Validators.required],
    });
  }

  update() {
    let dataUpdate = this.formulario.value;
    let idUpdate = this.data.conta.id;
    this.contaService
      .editCount(idUpdate, dataUpdate)
      .then((res) => {
        this.msgSucesso();
        this.dialog.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  msgSucesso() {
    this.snack.open('Operação atualizada com sucesso!', '', {
      duration: 4000,
      panelClass: ['sucesso'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  get validForm() {
    return this.formulario.valid;
  }
}
