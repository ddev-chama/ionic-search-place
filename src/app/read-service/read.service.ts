import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReadService {
  private apiUrl = 'https://sheet.best/api/sheets/13a976a0-a82f-4301-9de5-c138d5c07074'; // Replace with your API endpoint
  private apiKey = 'VWWRcbcLaV4yopsl1@FNGThaH66k!-AhroFY!zl1hA!JBQdrlVHCZNZAwkx%KAYT'; // Replace with your actual API key

  constructor(private http: HttpClient) {}

  // Fetch news data from the API with x-api-key header
  getNewsData(): Observable<any[]> {
    const url = `${this.apiUrl}`; 

    // Set headers
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);

    return this.http.get<any[]>(url, { headers });
  }

}


