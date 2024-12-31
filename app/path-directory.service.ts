import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathDirectoryService {
  pathDir = [
    { component: 'TicTacToeComponent', name: 'TicTactToe' },
    { component: 'PuzzleGameComponent', name: 'Puzzle' },
    { component: 'MemoryGameComponent', name: 'Memory' },
    { component: 'MathChallengeComponent', name: 'Math' },
    { component: 'QuizComponent', name: 'Quiz' },
    { component: 'PictureComponent', name: 'Picture' },
    { component: 'GuessNumberComponent', name: 'GuessNumber' },
    { component: 'RiddleComponent', name: 'Riddle' },
    { component: 'SudokuComponent', name: 'Sudoku' },
  ]
  constructor() { }
 
  public GetPath<T>(component: T): string {
    return this.pathDir.find(x => x.component === component)?.name ?? '';
  }
}
