import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import {Profile, ProfileRequestDTO, Tecnico, TecnicoState} from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
  }
  findByEmail(email: string): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/email?email=${email}`);
  }
  findAll(): Observable<Tecnico[]>{
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnicos`);
  }

  create(tecnico: Tecnico): Observable<Tecnico>{
    return this.http.post<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos`, tecnico);
  }

  update(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${tecnico.id}`, tecnico);
  }

  delete(id: any): Observable<Tecnico>{
    return this.http.delete<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
  }
  getProfile(userID: number){
    return this.http.get(`${API_CONFIG.baseUrl}/profile?id=${userID}`);
  }
  createProfile(data: ProfileRequestDTO){
    return this.http.post<Profile>(`${API_CONFIG.baseUrl}/tecnicos/profile`,data);
  }
  updateProfile(data: ProfileRequestDTO, id: number){
    const params = new HttpParams()
        .set('id', id)
    return this.http.put(`${API_CONFIG.baseUrl}/tecnicos/profile`,data, {params});
  }
  uploadImage(file:File, email: string): Observable<Tecnico>{
    let body = new FormData();
    const blob = new Blob([email], { type: 'application/json' });
    body.append("file",file);
    body.append("email",blob);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/upload/avatar`,body, { headers: headers });
  }
}
