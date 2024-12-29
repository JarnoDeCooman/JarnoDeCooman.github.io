import { Component } from '@angular/core';
import { BaseGameComponent } from '../base-game/base-game.component';
import { ProgressService } from '../../progress-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css'
})
export class TicTacToeComponent extends BaseGameComponent{
  board: string[][];
  currentPlayer: string;
  gameOver: boolean;
  winner: string;
  difficulty: number; 
  aiStarts: boolean = false;

  constructor(progressService: ProgressService, router: Router) {
    super(progressService, router);
    this.gameIndex = 2;
    this.difficulty = 10;
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.winner = '';
    this.aiStarts = false; // Default is player starts
}

override ngOnInit(): void {
  super.ngOnInit();
  if (this.aiStarts) {
      this.currentPlayer = 'O'; // AI starts as 'O'
      this.aiMove();  // AI makes the first move
  }
}
onAiStartsChange(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  this.aiStarts = selectElement.value === 'true'; // Convert to boolean
  this.resetGame(); // Reset the game when the user changes the option
}

  completeGame(): void {
    super.markAsCompleted();
  }
  override markAsCompleted(): void {
    super.markAsCompleted();
  }
  
  makeMove(row: number, col: number) {
    if (this.board[row][col] === '' && !this.gameOver) {
        this.board[row][col] = this.currentPlayer;
        if (this.checkWin()) {
            this.gameOver = true;
            this.winner = this.currentPlayer;
            this.completeGame();
            return;
        }
        this.switchPlayer();
        if (this.currentPlayer === 'O' && !this.gameOver) {
            this.aiMove();
        }
    }
    if(this.isBoardFull(this.board))
      this.resetGame();
}


  // Switch players
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  // AI makes the best move using Minimax
  aiMove() {
    const bestMove = this.getBestMove();
    if(bestMove.col == -1 || bestMove.row == -1 || this.isBoardFull(this.board)) 
    {
      this.resetGame();
      return;
    }
    this.board[bestMove.row][bestMove.col] = this.currentPlayer;
    if (this.checkWin()) {
      this.gameOver = true;
      this.winner = this.currentPlayer;
      return;
    }
    this.switchPlayer();
  }
  // Minimax algorithm to calculate the best move
  getBestMove(): { row: number, col: number } {
    let bestScore = -Infinity;
    let move = { row: -1, col: -1 };
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === '') {
          this.board[i][j] = 'O'; // AI's move
          const score = this.minimax(this.board, 0, false);
          this.board[i][j] = ''; // Undo the move

          if (score > bestScore) {
            bestScore = score;
            move = { row: i, col: j };
          }
        }
      }
    }
    return move;
  }

  // Minimax function
  minimax(board: string[][], depth: number, isMaximizing: boolean): number {
    const winner = this.checkWinner(board);
    if (winner === 'O') return this.difficulty - depth;
    if (winner === 'X') return depth - this.difficulty;
    if (this.isBoardFull(board)) return 0;

    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'O';
            best = Math.max(best, this.minimax(board, depth + 1, false));
            board[i][j] = ''; // Undo the move
          }
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'X';
            best = Math.min(best, this.minimax(board, depth + 1, true));
            board[i][j] = ''; // Undo the move
          }
        }
      }
      return best;
    }
  }

  // Check if the board is full
  isBoardFull(board: string[][]): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') return false;
      }
    }
    return true;
  }

  // Check the winner on the current board
  checkWinner(board: string[][]): string | null {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') return board[i][0];
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') return board[0][i];
    }

    // Check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') return board[0][0];
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') return board[0][2];

    return null; // No winner yet
  }
  // Check if the current player has won
  checkWin(): boolean {
    const b = this.board;
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (b[i][0] === b[i][1] && b[i][1] === b[i][2] && b[i][0] !== '') return true;
      if (b[0][i] === b[1][i] && b[1][i] === b[2][i] && b[0][i] !== '') return true;
    }
    // Check diagonals
    if (b[0][0] === b[1][1] && b[1][1] === b[2][2] && b[0][0] !== '') return true;
    if (b[0][2] === b[1][1] && b[1][1] === b[2][0] && b[0][2] !== '') return true;
    return false;
  }

  resetGame() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = this.aiStarts ? 'O' : 'X';  // Set AI as starting player if true
    this.gameOver = false;
    this.winner = '';
    if (this.aiStarts) {
        this.aiMove();  // AI makes the first move if it starts
    }
}

  updateDifficulty(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.difficulty = Number(selectElement.value); // Convert to number if needed
  }
}