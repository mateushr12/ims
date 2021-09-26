import { EditComponent } from './edit/edit.component';
import { ContaService } from './../../services/conta.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss'],
})
export class ContaComponent implements OnInit {
  formulario: any;
  contas: any;

  constructor(private fb: FormBuilder, private contaService: ContaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.intialForm();
    this.allCount();
  }

  intialForm() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      detalhes: [''],
    });
  }

  save() {
    this.contaService
      .newCount(this.formulario.value)
      .then((res) => {
        console.log(res);
        this.intialForm;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  delete(id: any) {
    if (confirm('Delete?')){
      return id
    }
  }

  edit() {
    this.dialog.open(EditComponent)
  }

  allCount() {
    this.contaService.getCount().subscribe((data) => {
      this.contas = data.map((e: any) => {
        return { ...e.payload.doc.data() };
      });
    });
  }

  get validForm() {
    return this.formulario.valid;
  }

}
