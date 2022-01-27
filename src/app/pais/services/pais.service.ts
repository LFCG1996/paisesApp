import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private _apiUrl: string = 'https://restcountries.com/v2';

  constructor(
    private http: HttpClient
  ) { }

  buscarPais (termino: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this._apiUrl}/name/${termino}`);
  } 

  buscarCapital (termino: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this._apiUrl}/capital/${termino}`);  
  }

  buscarAlpha (termino: string): Observable<Country> {
    return this.http.get<Country>(`${this._apiUrl}/alpha/${termino}`);  
  }
}
