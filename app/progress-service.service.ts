import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

export interface Progress {
  id: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private gameProgress: Progress[] = [];
  private readonly fileUrl = 'Resources/Json/Progress.json'; // Correct path

  constructor(private http: HttpClient) {}

  setGameCompleted(id: string): void {
    const progress = this.gameProgress.find((gp: Progress) => gp.id === id);
    if (progress) {
      progress.completed = true;
    } else {
      this.gameProgress.push({ id, completed: true });
    }
    this.saveProgress();
  }

  getGameProgress(): Progress[] {
    return this.gameProgress;
  }

  // Save progress to the backend
  saveProgresses(progress: Progress[]): void {
    const jsonBlob = new Blob([JSON.stringify(progress, null, 2)], {
      type: 'application/json'
    });
    saveAs(jsonBlob, this.fileUrl);  // This will trigger the download
  }
  
  private saveProgress(): void {
    this.http.post(this.fileUrl, this.gameProgress).subscribe({
      next: () => console.log('Progress saved successfully'),
      error: (err) => console.error('Failed to save progress', err),
    });
  }

  loadProgress(): void {
    this.http.get<Progress[]>(this.fileUrl).subscribe({
      next: (savedProgress) => {
        this.gameProgress = savedProgress || [];
      },
      error: (err) => console.error('Failed to load progress', err),
    });
  }
}

