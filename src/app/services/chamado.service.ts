import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Chamado, ChamadoExpiredDTO, ChamadoTop} from '../models/chamado';
import { API_CONFIG } from '../config/api.config';
import {Solution, SolutionState} from "../models/Product";
import {ChartPieDTO} from "../components/home/home.component";

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Chamado> {
    return this.http.get<Chamado>(`${API_CONFIG.baseUrl}/chamados/${id}`);
  }

  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`);
  }

  create(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(`${API_CONFIG.baseUrl}/chamados`, chamado);
  }

  update(chamado: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(`${API_CONFIG.baseUrl}/chamados/${chamado.id}`, chamado);
  }
  getChamadoExpired(): Observable<ChamadoExpiredDTO[]> {
    return this.http.get<ChamadoExpiredDTO[]>(`${API_CONFIG.baseUrl}/chamados/expired`);
  }
  getTopTechnician(): Observable<ChamadoTop> {
    return this.http.get<ChamadoTop>(`${API_CONFIG.baseUrl}/chamados/top`);
  }
  createSolution(solutionRequestDTO: any, file:File): Observable<Solution[]> {
    console.log(solutionRequestDTO);
    let body = new FormData();
    const blob = new Blob([JSON.stringify(solutionRequestDTO)], { type: 'application/json' });
    body.append("solutionRequestDTO", blob);
    body.append("file", file);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Solution[]>(`${API_CONFIG.baseUrl}/solution/create`, body, { headers: headers });
  }

  //total ticket resolved
    getTicketResolved(): Observable<number> {
        return this.http.get<number>(`${API_CONFIG.baseUrl}/chamados/total/resolved`);
    }
  //total ticket assigned
    getTicketUnresolved(): Observable<number> {
        return this.http.get<number>(`${API_CONFIG.baseUrl}/chamados/total/assigned`);
    }
  //total ticket created
    getTicketCreated(): Observable<number> {
        return this.http.get<number>(`${API_CONFIG.baseUrl}/chamados/total/created`);
    }
    //  chart/assigned
    getChartAssigned(): Observable<ChartPieDTO> {
        return this.http.get<ChartPieDTO>(`${API_CONFIG.baseUrl}/chamados/chart/assigned`);
    }
}
