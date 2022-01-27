import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/paises.interface';


import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(
    //   ({id}) => {
    //     this.paisService.buscarAlpha(id)
    //       .subscribe(
    //         pais => {
    //           console.log(pais);
    //         });
    //   }
    // );
    //Cambia el resultado de un observable por otro
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.paisService.buscarAlpha(id)),
        tap(console.log)
      )
      .subscribe(
        pais => {
          this.pais = pais;
        }
      );
  }

}
