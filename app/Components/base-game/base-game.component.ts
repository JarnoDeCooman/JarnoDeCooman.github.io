// base-game.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../progress-service.service';
import { PathDirectoryService } from '../../path-directory.service';

@Component({
  template: ''
})
export abstract class BaseGameComponent implements OnInit {
  
  // Each game will need its index to mark as completed in ProgressService

  ID: string = '';
  constructor(
    protected progressService: ProgressService,
    protected router: Router,
    protected pathdir: PathDirectoryService,
    
  ) {}

  ngOnInit(): void {
  }

  // Abstract method to be implemented by each game
  protected abstract completeGame(): void;

  // Common method to mark a game as completed
  protected markAsCompleted(): void {
    this.saveProgress();
    setTimeout(() => {
      this.router.navigate(['/home']); // Navigate after the progress is saved
    }, 1000);  // Adjust this timeout as needed, depending on how long it takes for the update to complete
   }
  
  saveProgress() {

    // Update the Progress data in the repository
    this.progressService.updateProgressData(this.ID).subscribe(() => {
      console.log('Progress data saved successfully');
    });
  }
}
