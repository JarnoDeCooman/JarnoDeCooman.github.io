import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { decryptAnswer } from './Utils';

export interface Progress {
  id: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private fileUrl = 'https://api.github.com/repos/JarnoDeCooman/JarnoDeCooman.github.io/contents/Resources/Json/Progress.json';
  private token = decryptAnswer('U2FsdGVkX19hzF65zkbfylRG1VloPTrWwnwZPdw7DAazvFza133OhnTEBaalK5iTkmWUL9JUBiJQ+9DQPbeHJw=='); 
  public fileSha: string | undefined;
  constructor(private http: HttpClient) {}

  // Fetch the Progress data from GitHub using the API
  getProgressData(): Observable<any> {
    console.log(this.token)
    const headers = new HttpHeaders({
      Authorization: `token ${this.token}`,
    });

    return this.http.get<any>(this.fileUrl, { headers }).pipe(
      map((response) => {
        const content = atob(response.content); // Decode base64 content
        const jsonData = JSON.parse(content); // Parse JSON
        return jsonData.Progress; // Return the progress data
      })
    );
  }

  // Update the Progress data in the GitHub repository
  updateProgress(data: Progress[]): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `token ${this.token}`,
    });

    const body = {
      message: 'Update Progress data',
      content: btoa(JSON.stringify({ Progress: data })), // Convert to Base64
      sha: this.fileSha, // Current SHA of the file
    };

    return this.http.put<any>(this.fileUrl, body, { headers });
  }
  updateProgressData(ID: string): Observable<any> {
    let progress: Progress[] = [];
  
    // Fetch the current progress data
    this.getProgressData().subscribe((response) => {
      progress = response;  // Assuming response is an array of Progress objects
    });
  
    // Step 1: Fetch the file content to get its SHA
    return this.http.get<any>(this.fileUrl, {
      headers: new HttpHeaders({
        Authorization: `token ${this.token}`,
      }),
    }).pipe(
      switchMap(fileData => {
        const sha = fileData.sha;  // Ensure you're getting the 'sha' from the file's metadata
  
        // Check if sha is retrieved correctly
        if (!sha) {
          throw new Error('SHA is undefined, cannot update file.');
        }
  
        // Step 2: Find the progress object and update it
        const p = progress.find(p => p.id === ID);
        if (p) {
          p.completed = true; // Update the completion status
        }
  
        // Step 3: Prepare the body for the PUT request
        const body = {
          message: 'Update Progress data',
          content: btoa(JSON.stringify({ Progress: progress })), // Wrap progress in a 'Progress' object
          sha: sha,  // Include the correct sha here
        };
  
        // Step 4: Send the PUT request to update the file
        return this.http.put<any>(this.fileUrl, body, {
          headers: new HttpHeaders({
            Authorization: `token ${this.token}`,
          }),
        });
      })
    );
  }
  
  
}
