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
import { encryptAnswer } from '../../Utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // Track the progress of each game
  boxes = [
    { gameName: typeof(TicTacToeComponent), letter: 'U2FsdGVkX1+BeVxxPBtSxFNVkHXX9sSY8EZCpOFP/mQ=', completed: false },
    { gameName: typeof(MathChallengeComponent), letter: 'U2FsdGVkX1/w3o6F416bVLkEDqjph83atP0YhTu5IeA=', completed: false },
    { gameName: typeof(MemoryGameComponent), letter: 'U2FsdGVkX18KkxvamjZiw9qPePKanfY1h89J0pqClTE=', completed: false },
    { gameName: typeof(QuizComponent), letter: 'U2FsdGVkX1/KOng4up5LiunRj3BRc0vMw2/LQwn+Cu8=', completed: false },
    { gameName: typeof(PictureComponent), letter: 'U2FsdGVkX19eNrhs4WLzUHYwYSEDI5qpFvkumRgFzLA=', completed: false },
    { gameName: typeof(GuessNumberComponent), letter: 'U2FsdGVkX1/abPpy4lnr99KE0zyiRS3CuOMXkMgAVk8=', completed: false },
    { gameName: typeof(RiddleComponent), letter: 'U2FsdGVkX1+avca0sxDiCE376DIVJjxH5gkxW6YNS2s=', completed: false },
    { gameName: typeof(SudokuComponent), letter: 'U2FsdGVkX1965QoPh1vY905ZXFo4ad/byCettamaQzY=', completed: false },
    { gameName: typeof(PuzzleGameComponent), letter: 'U2FsdGVkX18sKOaVYScR4dzNAJ9LHQ/61OeuHzRtgZE=', completed: false },
  ];

  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {
    // Correcting the mapping and calling saveProgresses
    this.progressService.saveProgresses(
      this.boxes.map(box => {
        return {
          id: box.gameName,
          completed: box.completed
        } as Progress;
      })
    );
        this.loadProgress();
  }

  // Load the current progress
  loadProgress(): void {
    const progress = this.progressService.getGameProgress();
    progress.forEach(pro => {
      var b = this.boxes.find(box => box.gameName === pro.id);
      if(b)
      {
        b.completed = pro.completed;
      }
    }
    )
  }

  // Calculate the number of completed games
  get completedGames(): number {
    return this.boxes.filter(box => box.completed).length;
  }
}