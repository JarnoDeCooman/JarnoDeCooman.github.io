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
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
}
