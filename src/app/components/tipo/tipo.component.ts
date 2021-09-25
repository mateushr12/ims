import { TipoService } from './../../services/tipo.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.scss']
})
export class TipoComponent implements OnInit {

  formulario: any
  tipos: any

  constructor(private fb: FormBuilder, private tipoService: TipoService) { }

  ngOnInit(): void {
    this.intialForm();
    this.allTypes();
  }

  intialForm() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      detalhes: ['']
    })
  }

  save() {
    let data = this.formulario.value
    this.tipoService.newType(data)
    .then((res) => {
      this.intialForm();
      console.log(res);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  allTypes() {
    this.tipoService.getType().subscribe((data) => {
      this.tipos = data.map((e: any) => {
        return { ...e.payload.doc.data() }
      })
    })
  }

  get validForm() {
    return this.formulario.valid
  }

}
