import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoService } from 'src/app/services/tipo.service';
import { UpdateComponent } from '../../portfolio/update/update.component';

@Component({
  selector: 'app-edit-tipo',
  templateUrl: './edit-tipo.component.html',
  styleUrls: ['./edit-tipo.component.scss']
})
export class EditTipoComponent implements OnInit {

  formulario!: FormGroup;
  tipo: any;  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<UpdateComponent>,
    private fb: FormBuilder,
    private tipoService: TipoService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      detalhes: [this.data.tipo.detalhes],
      nome: [this.data.tipo.nome, Validators.required],
    });
  }

  update() {
    let dataUpdate = this.formulario.value;
    let idUpdate = this.data.tipo.id;
    this.tipoService
      .editType(idUpdate, dataUpdate)
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
