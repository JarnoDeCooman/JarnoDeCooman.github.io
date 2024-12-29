// base-game.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../progress-service.service';

@Component({
  template: ''
})
export abstract class BaseGameComponent implements OnInit {
  
  // Each game will need its index to mark as completed in ProgressService
  protected gameIndex: number = 0;

  constructor(
    protected progressService: ProgressService,
    protected router: Router
  ) {}

  ngOnInit(): void {
  }

  // Abstract method to be implemented by each game
  protected abstract completeGame(): void;

  // Common method to mark a game as completed
  protected markAsCompleted(): void {
    this.progressService.setGameCompleted(typeof(this));
    this.router.navigate(['/home']);  // Navigate to home after completion
  }
}
