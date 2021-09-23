import { map } from 'rxjs/operators';
import { EstrategiaService } from './../../services/estrategia.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-estrategia',
  templateUrl: './estrategia.component.html',
  styleUrls: ['./estrategia.component.scss'],
})
export class EstrategiaComponent implements OnInit {
  formulario: any;
  estrategias: any;

  constructor(
    private fb: FormBuilder,
    private estrategiaService: EstrategiaService
  ) {}

  ngOnInit(): void {
    this.initalForm();
    this.estrategiaService.getStrategy().subscribe((data) => {
      this.estrategias = data.map((e: any) => {
        return {
          ...e.payload.doc.data(),
        };
      });
    });
  }

  initalForm() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      detalhes: [''],
    });
  }

  save() {
    this.estrategiaService
      .newStrategy(this.formulario.value)
      .then(() => {
        this.initalForm();
      })
      .catch((e) => {
        console.error(e);
      });
  }

  get validForm(): boolean {
    return this.formulario.valid
  }

}
