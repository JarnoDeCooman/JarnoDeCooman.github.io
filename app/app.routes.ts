import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { PuzzleGameComponent } from './Components/puzzle-game/puzzle-game.component';
import { TicTacToeComponent } from './Components/tic-tac-toe/tic-tac-toe.component';
import { MemoryGameComponent } from './Components/memory-game/memory-game.component';
import { MathChallengeComponent } from './Components/math-challenge/math-challenge.component';
import { QuizComponent } from './Components/quiz/quiz.component';
import { PictureComponent } from './Components/picture/picture.component';
import { GuessNumberComponent } from './Components/guess-number/guess-number.component';
import { RiddleComponent } from './Components/riddle/riddle.component';
import { SudokuComponent } from './Components/sudoku/sudoku.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'puzzle', component: PuzzleGameComponent },
    { path: 'tictactoe', component: TicTacToeComponent },
    { path: 'memory-game', component: MemoryGameComponent },  
    { path: 'math-challenge', component: MathChallengeComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'picture', component: PictureComponent },
    { path: 'guess-number', component: GuessNumberComponent },
    { path: 'riddle', component: RiddleComponent },
    { path: 'sudoku', component: SudokuComponent },

];
