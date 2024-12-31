import { Component } from '@angular/core';
import { BaseGameComponent } from '../base-game/base-game.component';
import { ProgressService } from '../../progress-service.service';
import { Router } from '@angular/router';
import * as questionsData from '../../../Resources/Json/Quiz.json';
import { decryptAnswer, encryptAnswer } from './../../Utils';
import { HttpClientModule } from '@angular/common/http';
import { PathDirectoryService } from '../../path-directory.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './quiz.component.html',
  providers: [ProgressService] ,
  styleUrl: './quiz.component.css'
})
export class QuizComponent extends BaseGameComponent{

  // Load questions from JSON file
  questions = questionsData.questions.map(q => ({
    question: q.question,
    options: this.shuffleArray([...q.options]),
    encrypted: q.correctAnswer
  }));

  currentQuestionIndex = 0;
  selectedOption: string | null = null;
  isCorrect: boolean | null = null;


  constructor(progressService: ProgressService, router: Router, pathdir: PathDirectoryService) {
    super(progressService, router, pathdir);
    this.ID = 'QuizComponent';
    this.questions = this.shuffleArray(this.questions);
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));  // Random index
      [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
  }
  // Check if the selected option is correct
  checkAnswer(): void {
    if (this.selectedOption !== null) {
      var decryptedAnswer = decryptAnswer(this.questions[this.currentQuestionIndex].encrypted);
      this.isCorrect = this.selectedOption === decryptedAnswer;
      if (this.isCorrect) {
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
          this.selectedOption = null;
          this.isCorrect = null;
        } else {
          this.completeGame();
        }
      }
    }
  }

  // Mark the game as completed
  protected completeGame(): void {
    this.markAsCompleted();
  }
}
