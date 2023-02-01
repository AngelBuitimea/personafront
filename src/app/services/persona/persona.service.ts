import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private API_SERVER = "http://localhost:3000/users/";

  constructor(private httpClient: HttpClient) { }

  public getPersonaRol(id){
    return this.httpClient.get(this.API_SERVER+"rol/"+id);
  }

  public getPersona(id){
    return this.httpClient.get(this.API_SERVER+""+id);
  }
  public getAllPersonas(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
    
  }
  public savePersona (persona:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,persona);
  }
  editPersona(id:string, editPersona:PersonaList){
    return this.httpClient.put(this.API_SERVER+""+id,editPersona);
  }

  public deletePersona(id):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + ""+id);
  }
}
export interface PersonaList{
  id: string,
      nombre: string,
      apellidoPaterno: string,
      apellidoMaterno: string,
      puesto: string,
      rfc: string,
      direccion:string,
      correoElectronico: string,
      cuentaGithub: string,
      estado: string,
      ciudad: string,
      numero1:string,
      numero2: string,
      genero: string,
      password: string,
      rol: string
}
