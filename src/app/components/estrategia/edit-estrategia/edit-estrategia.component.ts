import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstrategiaService } from 'src/app/services/estrategia.service';
import { UpdateComponent } from '../../portfolio/update/update.component';

@Component({
  selector: 'app-edit-estrategia',
  templateUrl: './edit-estrategia.component.html',
  styleUrls: ['./edit-estrategia.component.scss']
})
export class EditEstrategiaComponent implements OnInit {

  formulario!: FormGroup;
  estrategias: any;  
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<UpdateComponent>,
    private fb: FormBuilder,
    private estrategiaService: EstrategiaService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      detalhes: [this.data.estrategias.detalhes],
      nome: [this.data.estrategias.nome, Validators.required],
    });
  }

  update() {
    let dataUpdate = this.formulario.value;
    let idUpdate = this.data.estrategias.id;
    this.estrategiaService
      .editStrategy(idUpdate, dataUpdate)
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
