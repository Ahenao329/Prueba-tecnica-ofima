import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../../../core/models/response.model';

@Injectable({
  providedIn: 'root'
})

export class ClientServiceService {
  private readonly URL = 'https://us-central1-appsaodev.cloudfunctions.net/clients/enterprise'
  private readonly URLlUGARES = 'https://us-central1-appsaodev.cloudfunctions.net/master'
  private http = inject(HttpClient)
  
  constructor() { 
  }

  getCliente():Observable<Response>  {
    return this.http.get<Response>(`${this.URL}/getAllListClient`)
  }

  getPaises():Observable<Response>  {
    return this.http.get<Response>(`${this.URLlUGARES}/getAllListCountry`)
  }

  getDepartamentos(id:string):Observable<Response>  {
    return this.http.get<Response>(`${this.URLlUGARES}/getListDepartamentByCountry/+` + id)

  }

  getCiudades(id:string):Observable<Response>  {
    return this.http.get<Response>(`${this.URLlUGARES}/getListCitiesByDepartament/+` + id)
  }

  deleteCliente(id:number): Observable<any>
  {
    return this.http.delete(`${this.URL}/deleteEnterpriseSAO/` + id)
  }

  saveCliente(cliente: any): Observable<any> {
    return this.http.post(`${this.URL}/createEnterpriseSAO/`, cliente)
  }

  updateClientes(id: number, cliente: any): Observable<Response>{
    return this.http.put<any>(`${this.URL}/sucursales/` + id, cliente)
  }

}
