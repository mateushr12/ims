import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.scss']
})
export class TipoComponent implements OnInit {

  formulario: any

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.intialForm()
  }

  intialForm() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      detalhes: ['']
    })
  }

  save(){
    
  }

}
