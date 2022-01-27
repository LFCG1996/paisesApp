import { Component } from '@angular/core';
import { Country } from '../../interfaces/paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent  {

  termino: string = '';
  errorT: boolean = false;
  paises: Country[] = [];
  placeholder: string = "Buscar país...";
  constructor(private paisService: PaisService) { }

  buscar(termino: string): void {
    this.errorT = false;
    this.termino = termino.trim();
    
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
    this.errorT = false;
  }
}
