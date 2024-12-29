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

  constructor() {}

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
  }

  loadProgress(): void {
  }
}

