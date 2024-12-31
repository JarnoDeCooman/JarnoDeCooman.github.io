import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { ProgressService } from '../../progress-service.service';
import { Router } from '@angular/router';
import { BaseGameComponent } from '../base-game/base-game.component';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

interface Position {
  x: number;
  y: number;
  dir: number;
}
class WordObj {
  string: string[] = [];
  totalMatches: number = 0;
  effectiveMatches: number = 0;
  successfulMatches?: Position[];
  x?: number;
  y?: number;
  dir?: number;
}
interface Cell {
  value: string | null; // The value of the cell (can be a string or null)
  editable: boolean;    // Indicates if the cell is editable
}
@Component({
  selector: 'app-math-challenge',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './math-challenge.component.html',
  styleUrls: ['./math-challenge.component.css'],
  providers: [ProgressService] ,
})
export class MathChallengeComponent extends BaseGameComponent {
  isCorrect: boolean | null = null;
  Count: number = 15;
  RemoveCount: number = 15;
  editList: boolean[][] = [];
  board: string[][] = [];
  wordArr: string[] = [];
  wordBank: WordObj[] = [];
  wordsActive: WordObj[] = [];
  Bounds = {  
    top: Infinity,
    right: 0,
    bottom: 0,
    left: Infinity,
    Update(x: number, y: number): void {
      this.top = Math.min(y, this.top);
      this.right = Math.max(x, this.right);
      this.bottom = Math.max(y, this.bottom);
      this.left = Math.min(x, this.left);
    },
    Clean(): void {
      this.top = Infinity;
      this.right = 0;
      this.bottom = 0;
      this.left = Infinity;
    },
  };

  override ngOnInit(): void {
    this.ID = 'MathChallengeComponent';
    super.ngOnInit();
    this.CreateBoard();
  }
  
  CreateBoard() {
    const maxRetries = 2; // Set a max number of retries to avoid infinite loops
    let retries = 0;
    
    // Reset the board and active words
    this.CleanVars();
    
    // Start generating words
    while (this.wordsActive.length < this.Count) {
      if(retries >= maxRetries)
        break;
      this.GenerateWords();
      this.PopulateBoard();
      
      if (this.wordsActive.length < this.Count) {
        retries++;
        console.debug(`Retry #${retries} to place words. Active words: ${this.wordsActive.length}`);
      }
    }
    
    if (retries >= maxRetries) {
      console.warn('Max retries reached while placing words.');
    } else {
      console.log(`Successfully placed ${this.wordsActive.length} words.`);
    }
    this.wordsActive.forEach(word => {
      // Random index from the word's string array
      var randomIdx = Math.floor(word.string.length * Math.random());
      if(randomIdx === word.string.length - 2) // meaning the = sign
      randomIdx = Math.random() < 0.5 ? randomIdx + 1: randomIdx - 1;
      // Remove the character from the word array
      word.string[randomIdx] = '';
    
      // Remove the corresponding letter from the board
      if (word.x !== undefined && word.y !== undefined && word.dir !== undefined) {
        let xIndex = word.x;
        let yIndex = word.y;
        
        for (let i = 0; i < word.string.length; i++) {
          if (word.dir === 0) {  // Horizontal placement
            if (i === randomIdx) {
              this.board[xIndex + i][yIndex] = '?';  // Remove the letter from the board
              this.editList[xIndex + i][yIndex] = true;  // Remove the letter from the board
            }
          } else {  // Vertical placement
            if (i === randomIdx) {
              this.board[xIndex][yIndex + i] = '?';  // Remove the letter from the board
              this.editList[xIndex][yIndex + i] = true;  // Remove the letter from the board
            }
          }
        }
      }
    });
    this.removeEmptyRowsAndColumns();
  }
  
  removeEmptyRowsAndColumns(){
    // Remove empty rows
    const filteredRows = this.board.filter(row => row.some(cell => cell !== null && cell !== ''));

    // Remove empty columns
    const transposed = filteredRows[0]?.map((_, colIndex) =>
      filteredRows.map(row => row[colIndex])
    ) || [];
    
    const filteredColumns = transposed.filter(col => col.some(cell => cell !== null && cell !== ''));

    // Transpose back to the original orientation
    this.board = filteredColumns[0]?.map((_, colIndex) =>
      filteredColumns.map(row => row[colIndex])
    ) || [];
    this.editList = this.board.map(value => value.map(cell => cell === '?'));
  }
  // Collect words from the input fields
  GenerateWords(): void {

    for (let i = 0; i < this.Count; i++) {
      const expression = this.generateExpression(Math.floor(Math.random() * 5) + 2); 
      const result = this.evaluateExpression(expression);

      if (Number.isInteger(result) && result !== 0) {
        this.wordArr.push(`${expression} = ${result}`);
      } else {
        i--; // Retry if the result is not an integer
      }
    }

  }

  private generateExpression(maxTerms: number): string {
    const operators = ['+', '-', '*', '/'];
    const terms = [];

    let currentNum = Math.floor(Math.random() * 10) + 1; // Start with a random base number
    terms.push(currentNum.toString());
    var lastOperator = null;
    for (let i = 1; i < maxTerms; i++) {

      let operator;
      do {
        operator = operators[Math.floor(Math.random() * operators.length)];
      } while (operator === lastOperator); // Ensure no consecutive operators are the same
      let nextNum;

      if (operator === '/') {
        // Generate a divisor that ensures integer division
        nextNum = Math.floor(Math.random() * 9) + 1; // Avoid zero
        const flooredResult = Math.floor(currentNum / nextNum);
        if (flooredResult === 0) {
          nextNum = 1; // Prevent division resulting in zero
        }
        currentNum = flooredResult * nextNum; // Adjust currentNum to ensure it is divisible
      } else {
        nextNum = Math.floor(Math.random() * 20) + 1;
      }

      terms.push(operator);
      terms.push(nextNum.toString());

      // Adjust the currentNum based on the operator
      switch (operator) {
        case '+':
          currentNum += nextNum;
          break;
        case '-':
          currentNum -= nextNum;
          break;
        case '*':
          currentNum *= nextNum;
          break;
        case '/':
          currentNum = currentNum / nextNum;
          break;
      }
      lastOperator = operator;
    }

    return terms.join(' ');
  }

  private evaluateExpression(expression: string): number {
    return eval(expression); // Evaluate the expression directly
  }

  // Refactored version of CleanVars
  CleanVars() {
    this.Bounds.Clean();
    this.wordBank = [];
    this.wordsActive = [];
    this.board = Array.from({ length: 20 }, () => Array(20).fill(null));
    this.editList = Array.from({ length: 20 }, () => Array(20).fill(false));
  }

  // Refactored version of PopulateBoard
  PopulateBoard() {
    this.PrepareBoard();
    for (let i = 0; i < this.wordBank.length; i++) {
      this.AddWordToBoard();
    }
  }

  PrepareBoard() {
    this.wordBank =[];
  
    for(var i = 0, len = this.wordArr.length; i < len; i++){
      // Create a new instance of WordObj and assign the properties
      const newWord = new WordObj();
      newWord.string = this.wordArr[i].split(' ');
    
      // Push the new WordObj to the wordBank
      this.wordBank.push(newWord);
    }
    
    for(i = 0; i < this.wordBank.length; i++){
      for(var j = 0, wA=this.wordBank[i]; j<wA.string.length; j++){
        for(var k = 0, cA=wA.string[j]; k<this.wordBank.length; k++){
          for(var l = 0,wB=this.wordBank[k]; k!==i && l<wB.string.length; l++){
            wA.totalMatches += (cA === wB.string[l])?1:0;
          }
        }
      }
    }  
  }
  AddWordToBoard(): boolean {
    let curIndex = this.findBestWordIndex();
    
    if (curIndex === -1) {
        console.debug("No suitable match found for the word.");
        return false;
    }

    this.placeWord(curIndex);
    return true;
}

private findBestWordIndex(): number {
    let curIndex = -1;
    let minMatchDiff = Infinity;

    if (this.wordsActive.length < 1) {
        curIndex = this.placeInitialWord();
    } else {
        for (let i = 0, len = this.wordBank.length; i < len; i++) {
            let curWord = this.wordBank[i];
            this.resetWord(curWord);

            this.calculateEffectiveMatches(curWord);

            let curMatchDiff = curWord.totalMatches - curWord.effectiveMatches;

            if (curMatchDiff < minMatchDiff && curWord.successfulMatches!.length > 0) {
                minMatchDiff = curMatchDiff;
                curIndex = i;
            } else if (curMatchDiff <= 0) {
                return -1; // No valid match found
            }
        }
    }
    return curIndex;
}

private placeInitialWord(): number {
    let curIndex = 0;
    for (let i = 1; i < this.wordBank.length; i++) {
        if (this.wordBank[i].totalMatches < this.wordBank[curIndex].totalMatches) {
            curIndex = i;
        }
    }
    this.wordBank[curIndex].successfulMatches = [{ x: 12, y: 12, dir: 0 }];
    console.debug("No active words, placed word at (12,12) with direction 0.");
    return curIndex;
}

private resetWord(curWord: WordObj): void {
    curWord.effectiveMatches = 0;
    curWord.successfulMatches = [];
}

private calculateEffectiveMatches(curWord: WordObj): void {
    for (let j = 0; j < curWord.string.length; j++) {
        let curChar = curWord.string[j];
        this.checkMatches(curChar, curWord, j);
    }
}

private checkMatches(curChar: string, curWord: WordObj, j: number): void {
    for (let k = 0; k < this.wordsActive.length; k++) {
        let testWord = this.wordsActive[k];
        for (let l = 0; l < testWord.string.length; l++) {
            let testChar = testWord.string[l];
            if (curChar === testChar) {
                this.handleMatch(curChar, curWord, testWord, j, l);
            }
        }
    }
}

private handleMatch(curChar: string, curWord: WordObj, testWord: WordObj, j: number, l: number): void {
    curWord.effectiveMatches++;
    let curCross: Position = { x: testWord.x!, y: testWord.y!, dir: 0 };

    if (testWord.dir === 0) {
        curCross.dir = 1;
        curCross.x += l;
        curCross.y -= j;
    } else {
        curCross.dir = 0;
        curCross.y += l;
        curCross.x -= j;
    }

    console.debug(`Match found for char '${curChar}' at (${curCross.x}, ${curCross.y}) with direction ${curCross.dir}`);

    if (this.isValidMatch(curWord, curCross, j)) {
        curWord.successfulMatches!.push(curCross);
        console.debug(`Successful match added for word '${curWord.string}' at (${curCross.x}, ${curCross.y})`);
    }
}

private isValidMatch(curWord: WordObj, curCross: Position, j: number): boolean {
    for (let m = -1; m < curWord.string.length + 1; m++) {
        if (m !== j) {
            if (!this.checkCrossValidity(curCross, m, curWord)) {
                return false;
            }
        }
    }
    return true;
}

private checkCrossValidity(curCross: Position, m: number, curWord: WordObj): boolean {
    let crossVal: string[] = [];
    if (curCross.dir === 0) {
        let xIndex = curCross.x + m;
        if (xIndex < 0 || xIndex >= this.board.length) return false;
        crossVal.push(this.board[xIndex][curCross.y]);
        crossVal.push(this.board[xIndex][curCross.y + 1]);
        crossVal.push(this.board[xIndex][curCross.y - 1]);
    } else {
        let yIndex = curCross.y + m;
        if (yIndex < 0 || yIndex >= this.board[curCross.x].length) return false;
        crossVal.push(this.board[curCross.x][yIndex]);
        crossVal.push(this.board[curCross.x + 1][yIndex]);
        crossVal.push(this.board[curCross.x - 1][yIndex]);
    }

    if (m > -1 && m < curWord.string.length - 1) {
        return crossVal.every((val, index) => val === curWord.string[m] || val === null);
    } else {
        return crossVal[0] === null;
    }
}

private placeWord(curIndex: number): void {
    let spliced = this.wordBank.splice(curIndex, 1);
    this.wordsActive.push(spliced[0]);

    let pushIndex = this.wordsActive.length - 1;
    let matchArr = this.wordsActive[pushIndex].successfulMatches;
    let matchIndex = Math.floor(Math.random() * matchArr!.length);
    let matchData = matchArr![matchIndex];

    this.wordsActive[pushIndex].x = matchData.x;
    this.wordsActive[pushIndex].y = matchData.y;
    this.wordsActive[pushIndex].dir = matchData.dir;

    console.debug(`Placing word '${this.wordsActive[pushIndex].string}' at (${matchData.x}, ${matchData.y}) with direction ${matchData.dir}`);

    this.updateBoard(pushIndex, matchData);
}

private updateBoard(pushIndex: number, matchData: Position): void {
    for (let i = 0; i < this.wordsActive[pushIndex].string.length; i++) {
        let xIndex = matchData.x;
        let yIndex = matchData.y;

        if (matchData.dir === 0) {
            xIndex += i;
            this.board[xIndex][yIndex] = this.wordsActive[pushIndex].string[i];
        } else {
            yIndex += i;
            this.board[xIndex][yIndex] = this.wordsActive[pushIndex].string[i];
        }

        console.debug(`Placing char '${this.wordsActive[pushIndex].string[i]}' at (${xIndex}, ${yIndex})`);
        this.Bounds.Update(xIndex, yIndex);
    }
}
  Evaluate()
  {
    var horizontalWords = this.GetHorizontalWords();
    var verticalWords = this.GetVerticalWords();
    let completed = true;
    
    // Iterate through all active words
    horizontalWords.forEach(word => {
      console.log('Word string before check:', word);
  
      // Check if any character is missing (i.e., set to null or undefined)
      if (word.includes('?')) {
        completed = false;
        console.log('Found missing character in word:', word);
        return;  // Early exit if missing character found
      }
  
      // Join the word's string array without commas, then split by '='
      var [equation, result] = word.split('=');
      console.log('Evaluating:', equation, '=', result);
  
      // Convert the result to a number for comparison
      var eqRes = eval(equation);
  
      // Check if the evaluated result matches the result from the string
      if (eqRes !== parseFloat(result)) {
        completed = false;
        console.log('Equation result mismatch:', eqRes, '!==', result);
      }
    });
  
    if (!completed) {
      this.isCorrect = false;
      return;
    }
    // Iterate through all active words
    verticalWords.forEach(word => {
      console.log('Word string before check:', word);
  
      // Check if any character is missing (i.e., set to null or undefined)
      if (word.includes('?')) {
        completed = false;
        console.log('Found missing character in word:', word);
        return;  // Early exit if missing character found
      }
  
      // Join the word's string array without commas, then split by '='
      var [equation, result] = word.split('=');
      console.log('Evaluating:', equation, '=', result);
  
      // Convert the result to a number for comparison
      var eqRes = eval(equation);
  
      // Check if the evaluated result matches the result from the string
      if (eqRes !== parseFloat(result)) {
        completed = false;
        console.log('Equation result mismatch:', eqRes, '!==', result);
      }
    });

    // If all words are valid and completed
    if (completed) {
      this.isCorrect = true;
      this.completeGame();
    }
    this.isCorrect = false;
  }
  
  GetHorizontalWords(): string[] {
    const horizontalWords: string[] = [];
    
    for (let row of this.board) {
      let currentWord = '';
      
      for (let cell of row) {
        if (cell === null) {
          if (currentWord) {
            if(currentWord.includes('=') && currentWord.length > 5) 
            {
              horizontalWords.push(currentWord);  // Push the word formed so far
            }
            currentWord = '';  // Reset current word
          }
        } else {
          currentWord += cell;  // Append the character to the current word
        }
      }
      
      // If the last part of the row has a word, push it
      if (currentWord) {
        if(currentWord.includes('=') && currentWord.length > 5) 
          horizontalWords.push(currentWord);
      }
    }
    
    return horizontalWords;
  }

  GetVerticalWords(): string[] {
    const verticalWords: string[] = [];
    
    // Iterate over columns
    for (let col = 0; col < this.board[0].length; col++) {
      let currentWord = '';
      
      for (let row = 0; row < this.board.length; row++) {
        let cell = this.board[row][col];
        
        if (cell === null) {
          if (currentWord) {
            if(currentWord.includes('=') && currentWord.length > 5) 
              verticalWords.push(currentWord);  // Push the word formed so far
            currentWord = '';  // Reset current word
          }
        } else {
          currentWord += cell;  // Append the character to the current word
        }
      }
      
      // If the last part of the column has a word, push it
      if (currentWord) {
        if(currentWord.includes('=') && currentWord.length > 5) 
          verticalWords.push(currentWord);  // Push the word formed so far
      }
    }
    
    return verticalWords;
  }
  
  
  protected override completeGame(): void {
    super.markAsCompleted();
  }
}