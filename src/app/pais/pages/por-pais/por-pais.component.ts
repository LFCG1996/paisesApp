import { Component } from '@angular/core';
import { Country } from '../../interfaces/paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li {
      cursor: pointer;
    }
  `
  ]
})
export class PorPaisComponent  {

  termino: string = '';
  errorT: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;
  placeholder: string = "Buscar país...";

  constructor(private paisService: PaisService) { }

  buscar(termino: string): void {
    this.errorT = false;
    this.termino = termino.trim();
    this.mostrarSugerencias = false;
    if(this.termino == undefined || this.termino == null || this.termino.length == 0) {
      return;
    }
    this.paisService.buscarPais(this.termino)
      .subscribe({
        next: (resp) => {
          if(resp[0] == undefined) {
            this.errorT = true;
            this.paises = [];
          }
          this.paises = resp;
          console.log(resp);
        }, 
        error: (err) => {
          this.errorT = true;
          this.paises = [];
        }
      });
  }

  sugerencias(termino: string) {
    this.mostrarSugerencias = true;
    this.errorT = false;
    this.termino = termino.trim();
    if(this.termino == undefined || this.termino == null || this.termino.length == 0) {
      this.paisesSugeridos = [];
      return;
    }
    this.paisService.buscarPais(this.termino).subscribe(
      (paises) => {
        if(paises[0] == undefined) {
          this.paisesSugeridos = [];
        } else {
          this.paisesSugeridos = paises.splice(0,5);
        }
      },
      (err) => {
        this.paisesSugeridos = [];
      }
    );
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }
}
