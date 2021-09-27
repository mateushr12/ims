import { EditTipoComponent } from './edit-tipo/edit-tipo.component';
import { MatDialog } from '@angular/material/dialog';
import { TipoService } from './../../services/tipo.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.scss'],
})
export class TipoComponent implements OnInit {
  formulario: any;
  tipos: any;

  constructor(
    private fb: FormBuilder,
    private tipoService: TipoService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.intialForm();
    this.allTypes();
  }

  intialForm() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      detalhes: [''],
    });
  }

  save() {
    let data = this.formulario.value;
    this.tipoService
      .newType(data)
      .then((res) => {
        this.intialForm();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  allTypes() {
    this.tipoService.getType().subscribe((data) => {
      this.tipos = data.map((e: any) => {
        return { ...e.payload.doc.data() };
      });
    });
  }

  delete(id: any) {
    if (confirm('Tem certeza que deseja deletar o tipo?')) {
      return id;
      // this.tipoService.deleteType(id)
      // .then()
      // .catch()
    }
  }

  edit(tipo: any) {
    this.dialog.open(EditTipoComponent, {
      data: {
        tipo,
      },
    });
  }

  // msgSucesso() {
  //   this.snack.open('Operação atualizada com sucesso!', '', {
  //     duration: 4000,
  //     panelClass: ['sucesso'],
  //     horizontalPosition: 'right',
  //     verticalPosition: 'top',
  //   });
  // }

  get validForm() {
    return this.formulario.valid;
  }
}
