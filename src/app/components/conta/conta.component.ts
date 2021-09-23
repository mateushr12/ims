import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit {

  formulario: any

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.intialForm();
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
