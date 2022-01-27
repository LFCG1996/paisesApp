import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private _apiUrl: string = 'https://restcountries.com/v2';

  get httpParams () {
    return new HttpParams().set('fields','name,capital,alpha2Code,nativeName,population,numericCode,flag,translations,alpha3Code');
  }

  constructor(
    private http: HttpClient
  ) { 
  }

  buscarPais (termino: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this._apiUrl}/name/${termino}`,{params: this.httpParams});
  } 

  buscarCapital (termino: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this._apiUrl}/capital/${termino}`,{params: this.httpParams});  
  }

  buscarAlpha (termino: string): Observable<Country> {
    return this.http.get<Country>(`${this._apiUrl}/alpha/${termino}`,{params: this.httpParams});  
  }

  buscarRegion (termino: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this._apiUrl}/region/${termino}`,{params: this.httpParams});  
  }
}
