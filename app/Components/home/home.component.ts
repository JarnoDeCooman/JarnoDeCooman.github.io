// home.component.ts
import { Component, NgModule, OnInit } from '@angular/core';
import { Progress, ProgressService } from '../../progress-service.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TicTacToeComponent } from '../tic-tac-toe/tic-tac-toe.component';
import { MathChallengeComponent } from '../math-challenge/math-challenge.component';
import { MemoryGameComponent } from '../memory-game/memory-game.component';
import { QuizComponent } from '../quiz/quiz.component';
import { PictureComponent } from '../picture/picture.component';
import { GuessNumberComponent } from '../guess-number/guess-number.component';
import { RiddleComponent } from '../riddle/riddle.component';
import { SudokuComponent } from '../sudoku/sudoku.component';
import { PuzzleGameComponent } from '../puzzle-game/puzzle-game.component';
import { decryptAnswer, encryptAnswer } from '../../Utils';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, RouterLink, HttpClientModule],
  providers: [ProgressService] ,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
decrypt(arg0: string): string {
  return decryptAnswer(arg0);
}
  // Track the progress of each game
  boxes = [
    { gameName: TicTacToeComponent.name, letter: 'U2FsdGVkX1+BeVxxPBtSxFNVkHXX9sSY8EZCpOFP/mQ=', completed: false },
    { gameName: MathChallengeComponent.name, letter: 'U2FsdGVkX1/w3o6F416bVLkEDqjph83atP0YhTu5IeA=', completed: false },
    { gameName: MemoryGameComponent.name, letter: 'U2FsdGVkX18KkxvamjZiw9qPePKanfY1h89J0pqClTE=', completed: false },
    { gameName: QuizComponent.name, letter: 'U2FsdGVkX1/KOng4up5LiunRj3BRc0vMw2/LQwn+Cu8=', completed: false },
    { gameName: PictureComponent.name, letter: 'U2FsdGVkX19eNrhs4WLzUHYwYSEDI5qpFvkumRgFzLA=', completed: false },
    { gameName: GuessNumberComponent.name, letter: 'U2FsdGVkX1/abPpy4lnr99KE0zyiRS3CuOMXkMgAVk8=', completed: false },
    { gameName: RiddleComponent.name, letter: 'U2FsdGVkX1+avca0sxDiCE376DIVJjxH5gkxW6YNS2s=', completed: false },
    { gameName: SudokuComponent.name, letter: 'U2FsdGVkX1965QoPh1vY905ZXFo4ad/byCettamaQzY=', completed: false },
    { gameName: PuzzleGameComponent.name, letter: 'U2FsdGVkX18sKOaVYScR4dzNAJ9LHQ/61OeuHzRtgZE=', completed: false },
  ];

  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    // Fetch the Progress data when the component is initialized
    this.progressService.getProgressData().subscribe((response) => {
      if(response)
      {

        response.forEach((p: { id: string; completed: boolean; }) => {
          var box = this.boxes.find(b => b.gameName === p.id);
          if(box)
            {
              box.completed = p.completed
            }
          });
          this.progressService.fileSha = response.sha;
        }
        });
    }
  
  // Calculate the number of completed games
  get completedGames(): number {
    return this.boxes.filter(box => box.completed).length;
  }
}