import { Component } from '@angular/core';
import { BaseGameComponent } from '../base-game/base-game.component';
import { ProgressService } from '../../progress-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guess-number',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './guess-number.component.html',
  styleUrl: './guess-number.component.css'
})
export class GuessNumberComponent extends BaseGameComponent{
  targetNumber: number = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
  userGuess: number | null = null; // User's current guess
  feedback: string | null = null; // Feedback to the user
  AmountGuesses: number = 0; // User's current guess
  recentFeedback: string | null = null; // Indicates the last action

  // Handle the user's guess
  makeGuess(): void {
    if (this.userGuess === null) {
      this.recentFeedback = 'Je hebt geen nummer ingevoerd.';
      return;
    }
    this.AmountGuesses += 1;
    this.recentFeedback = `Je hebt ${this.userGuess} ingevoerd.`;
    if (this.userGuess < this.targetNumber) {
      this.feedback = 'Hoger! Probeer opnieuw.';
    } else if (this.userGuess > this.targetNumber) {
      this.feedback = 'Lager! Probeer opnieuw.';
    } else {
      this.feedback = null;
      this.completeGame();
    }
  }

  // Mark the game as completed
  protected completeGame(): void {
    this.markAsCompleted();
  }
}
