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
    { path: 'PuzzleGameComponent', component: PuzzleGameComponent },
    { path: 'TicTacToeComponent', component: TicTacToeComponent },
    { path: 'MemoryGameComponent', component: MemoryGameComponent },  
    { path: 'MathChallengeComponent', component: MathChallengeComponent },
    { path: 'QuizComponent', component: QuizComponent },
    { path: 'PictureComponent', component: PictureComponent },
    { path: 'GuessNumberComponent', component: GuessNumberComponent },
    { path: 'RiddleComponent', component: RiddleComponent },
    { path: 'SudokuComponent', component: SudokuComponent },

];
