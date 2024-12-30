import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Progress {
  id: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private fileUrl = 'https://raw.githubusercontent.com/JarnoDeCooman/JarnoDeCooman.github.io/main/Resources/Json/Progress.json';
  private token = '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'; 

  constructor(private http: HttpClient) {}

  // Fetch the Progress data from the GitHub repository
  getProgressData(): Observable<{ data: Progress[]; sha: string }> {
    const headers = new HttpHeaders({
      Authorization: `token ${this.token}`,
    });

    return this.http.get<any>(this.fileUrl, { headers }).pipe(
      map((response) => {
        const content = atob(response.content); // Decode Base64 content
        const jsonData = JSON.parse(content); // Parse JSON
        return { data: jsonData.Progress as Progress[], sha: response.sha }; // Return data and sha
      })
    );
  }

  // Update the Progress data in the GitHub repository
  updateProgress(data: Progress[], sha: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `token ${this.token}`,
    });

    const body = {
      message: 'Update Progress data',
      content: btoa(JSON.stringify({ Progress: data })), // Convert to Base64
      sha: sha, // Current SHA of the file
    };

    return this.http.put<any>(this.fileUrl, body, { headers });
  }
  // Update the Progress data in the GitHub repository
  updateProgressData(data: string, sha: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `token ${this.token}`,
    });

    const body = {
      message: 'Update Progress data',
      content: btoa(JSON.stringify({ Progress: data })), // Convert to Base64
      sha: sha, // Current SHA of the file
    };

    return this.http.put<any>(this.fileUrl, body, { headers });
  }
}
