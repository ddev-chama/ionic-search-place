import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReadService {
  private apiUrl = 'https://sheet.best/api/sheets/119bd0b5-6cb5-4088-b33c-aabc6d435316'; // Replace with your API endpoint
  private apiKey = 'JxA4Alul2H2CUSnzFYShkG38db3_gsoRG1lHmA8S0LO8a1xwQNF2RFPVm39st1#!'; // Replace with your actual API key

  constructor(private http: HttpClient) {}

  // Fetch news data from the API with x-api-key header
  getNewsData(): Observable<any[]> {
    const url = `${this.apiUrl}`; 

    // Set headers
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);

    return this.http.get<any[]>(url, { headers });
  }

}


