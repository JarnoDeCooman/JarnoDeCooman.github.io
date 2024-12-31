// home.component.ts
import { Component, NgModule, OnInit } from '@angular/core';
import { Progress, ProgressService } from '../../progress-service.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { decryptAnswer, encryptAnswer } from '../../Utils';
import { HttpClientModule } from '@angular/common/http';
import { PathDirectoryService } from '../../path-directory.service';

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
  boxes;

  constructor(private progressService: ProgressService, public pathdirectory: PathDirectoryService) {
    this.boxes = [
      { gameName:'TicTacToeComponent', letter: 'U2FsdGVkX1+BeVxxPBtSxFNVkHXX9sSY8EZCpOFP/mQ=', completed: false },
      { gameName:'MathChallengeComponent', letter: 'U2FsdGVkX1/w3o6F416bVLkEDqjph83atP0YhTu5IeA=', completed: false },
      { gameName:'MemoryGameComponent', letter: 'U2FsdGVkX18KkxvamjZiw9qPePKanfY1h89J0pqClTE=', completed: false },
      { gameName:'QuizComponent', letter: 'U2FsdGVkX1/KOng4up5LiunRj3BRc0vMw2/LQwn+Cu8=', completed: false },
      { gameName:'PictureComponent', letter: 'U2FsdGVkX19eNrhs4WLzUHYwYSEDI5qpFvkumRgFzLA=', completed: false },
      { gameName:'GuessNumberComponent', letter: 'U2FsdGVkX1/abPpy4lnr99KE0zyiRS3CuOMXkMgAVk8=', completed: false },
      { gameName:'RiddleComponent', letter: 'U2FsdGVkX1+avca0sxDiCE376DIVJjxH5gkxW6YNS2s=', completed: false },
      { gameName:'SudokuComponent', letter: 'U2FsdGVkX1965QoPh1vY905ZXFo4ad/byCettamaQzY=', completed: false },
      { gameName:'PuzzleGameComponent', letter: 'U2FsdGVkX18sKOaVYScR4dzNAJ9LHQ/61OeuHzRtgZE=', completed: false },
    ]
  }

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