import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarService, ServicePackage } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
  private baseUrl = 'http://localhost:3000'; // JSON Server URL

  constructor(private http: HttpClient) { }

  // Services
  addService(service: CarService): Observable<CarService> {
    return this.http.post<CarService>(`${this.baseUrl}/services`, service);
  }

  getServices(): Observable<CarService[]> {
    return this.http.get<CarService[]>(`${this.baseUrl}/services`);
  }

  deleteService(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/services/${id}`);
  }

  // Packages
  addPackage(servicePackage: ServicePackage): Observable<ServicePackage> {
    return this.http.post<ServicePackage>(`${this.baseUrl}/packages`, servicePackage);
  }

  getPackages(): Observable<ServicePackage[]> {
    return this.http.get<ServicePackage[]>(`${this.baseUrl}/packages`);
  }
} 