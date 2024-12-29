// puzzle-game.component.ts
import { Component } from '@angular/core';
import { BaseGameComponent } from '../base-game/base-game.component';
import { ProgressService } from '../../progress-service.service';
import { Router } from '@angular/router';
import { decryptAnswer, encryptAnswer } from '../../Utils';
import { FormsModule } from '@angular/forms';
interface Anagram {
  word: string;
  anagram: string;
  solved?: boolean;
}
interface Category{
  id: string;
  questions: Anagram[];
  solved?: boolean;
}
@Component({
  selector: 'app-puzzle-game',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './puzzle-game.component.html',
  styleUrls: ['./puzzle-game.component.css'],
})
export class PuzzleGameComponent extends BaseGameComponent{
 Categories: Category[] = [
  {
    id: 'BVs',
    questions: [
    { word: 'U2FsdGVkX1/4SDa34p5+PjO/wvCLgHHIeRFX1oX2E+g=', anagram: 'Edrdx ckeyM' },
    { word: 'U2FsdGVkX18u1e7CvyNipMP+2r+yAfL+kCrCo0KwbyY=', anagram: 'natessejTi nV' },
    { word: 'U2FsdGVkX19T4WNOM6WjPcc4ZgRFBI2ZBwF5aCgl6Dg=', anagram: 'moW saTe' },
    { word: 'U2FsdGVkX1+KAE3ly3yGyI1noYHmWoRjZIVcQijg67U=', anagram: 'SaK drmain' },
    { word: 'U2FsdGVkX18JGz13CNqUmvuehYMV9k54JM9VD01rhLU=', anagram: 'snoreewu akt' }
    ]
  },
  {
    id: 'Voorwerpen',
    questions: [
    { word: 'U2FsdGVkX19Gj4JUUfd3O87CVhwPIxuOG8fgM+1CDZg=', anagram: 'odoPtol' },
    { word: 'U2FsdGVkX1/f/DWxo2dN/qRmTY1xCFWT7aD6710Wz6Q=', anagram: 'edaoCohcl' },
    { word: 'U2FsdGVkX192WBK6bLt/ZLrdtjn8lvSl/QJ8xGClY+A=', anagram: 'umretopC' },
    { word: 'U2FsdGVkX1+wg00nXhvwiBpscZpP10J3Yo1yHxy2gdA=', anagram: 'bielnnZro' },
    { word: 'U2FsdGVkX1/U2v1YoKRxOlLYtkfJ2NDv81thHsdXRTo=', anagram: 'aeaCmr' }
    ]
  },
  {
    id: 'Plaatsen',
    questions: [
    { word: 'U2FsdGVkX1+igtHHI5ZLi7aQN0Ud1Gbs3iqUN7TR1p0=', anagram: 'aaelornbc' },
    { word: 'U2FsdGVkX1+u5DCniYvCj8wjYp1S+BOduBycaPs13pE=', anagram: 'ndneol' },
    { word: 'U2FsdGVkX19ZVUlPf/8NmBjnklsbtXO1pNy+LAQUYtg=', anagram: 'ruelsbs' },
    { word: 'U2FsdGVkX18K7A7OismDeK0xkgMVwI60FgecA9BNvfk=', anagram: 'tsaerdamm' },
    { word: 'U2FsdGVkX18iHxuwBSF6PJq2oW1yGqGZGb8W/8RvjLo=', anagram: 'pirasj' }
    ]
  },
  {
    id: 'Dieren',
    questions: [
    { word: 'U2FsdGVkX1/K6r0nhdlFVc1OJvD2x4StIS/VsmF4QPU=', anagram: 'noaftil' },
    { word: 'U2FsdGVkX19TDlf9TudhdhWm/lje32uOVgPA7sM0SZA=', anagram: 'jilfndo' },
    { word: 'U2FsdGVkX19NdpeDU4r8cyH945fXJHFIgZlIdc+YG1E=', anagram: 'rfiga' },
    { word: 'U2FsdGVkX1+UoYPLx7C7pHHmGQQ3kjcuOKVM7DrYLyw=', anagram: 'oneeakgro' },
    { word: 'U2FsdGVkX18tyu17mSHr3UsvUTyaUdlflJJ90h9QtlU=', anagram: 'jiegtr' }
    ]
  },
  {
    id: 'Landen',
    questions: [
    { word: 'U2FsdGVkX1/LhAXwaMWJimVFzjmY3/CNUbUCjCfL9QY=', anagram: 'deanrdlen' },
    { word: 'U2FsdGVkX18j52lyxrrGdw7YL+TSYLSJLz4AmG6becw=', anagram: 'apnesj' },
    { word: 'U2FsdGVkX1+hQDzqvrlsfBlpISkx8+EQyXj+soLGSPQ=', anagram: 'tdlndasiu' },
    { word: 'U2FsdGVkX18NqhCLKNuDk7VexJKyjZULV0NQvVVA6pw=', anagram: 'acndaa' },
    { word: 'U2FsdGVkX1+ZemMUebNz+zeFChbKl+Gi6Dg0EBIoCl8=', anagram: 'ajrnkfirk' }
    ]
  }
];

  currentCategory: Category | null = null; // Will hold the anagram data for the selected category
  currentAnagramIndex: number = 0;
  userAnswer: string = '';
  feedback: string | null = null;

  constructor(progressService: ProgressService, router: Router) {
    super(progressService, router);
    this.shuffleCategories();
/*
    this.Categories.forEach(c => {
      // Loop through each question and encrypt the anagram
      c.questions.forEach(q => {
        q.word = encryptAnswer(q.anagram); // Replace the anagram with the encrypted value
        var original = q.anagram.toLowerCase();
        do
        {
          q.anagram = this.shuffleArray(q.anagram.toLowerCase().split('')).join('');
        }
        while(original === q.anagram )
      });
    
  // Format the output with each question on a new line
  let formattedQuestions = c.questions.map(q => {
    return `  { word: '${q.word}', anagram: '${q.anagram}' }`;
  }).join(',\n');

  // Print the formatted output
  console.log(`{\n  id: '${c.id}',\n  questions: [\n${formattedQuestions}\n  ]\n}`);
    });*/
      }

  // Function to convert a string to PascalCase, keeping spaces between words
  ToPascalCase(str: string): string {
    return str
      .replace(/\b\w/g, match => match.toUpperCase())  // Capitalize the first letter of each word
      .replace(/\s+/g, ' ');  // Keep only one space between words
  }

  shuffleCategories(): void {
  
    // Shuffle each category's items
    this.Categories.forEach(category => {
      category.questions = this.shuffleArray(category.questions); // Shuffle the anagrams for each category
    });
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));  // Random index
      [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
  }

  // Start the game by selecting a category
  selectCategory(category: Category): void {
    this.currentCategory = category ?? null;
    if(!this.currentCategory)
      return;

    this.currentAnagramIndex = this.solvedQuestionCount(this.currentCategory); // Reset anagram index

    if(this.currentAnagramIndex === -1)
      this.currentCategory.solved = true;

    this.userAnswer = '';
    this.feedback = null;
  }

  checkAnswer(): void {
    if(!this.currentCategory)
      return;

    if (decryptAnswer(this.currentCategory.questions[this.currentAnagramIndex].word) === this.ToPascalCase(this.userAnswer.trim().toLowerCase())) {
      this.feedback = null;
      this.currentCategory.questions[this.currentAnagramIndex].solved = true;
      this.currentAnagramIndex += 1;
      this.userAnswer = '';
      if (!this.currentCategory.questions.some(q => !q.solved)) 
      {
          this.currentCategory.solved = true;
      }

      // If all anagrams in the category are solved, move to the next category
      if (this.currentAnagramIndex >= this.currentCategory.questions.length || this.currentCategory.solved) {
        this.currentAnagramIndex = 0;
        this.currentCategory.solved = true;
        this.currentCategory = null;
      }

      if (!this.Categories.some(c => !c.solved)) {
        this.completeGame(); // All categories completed
      }
    } else {
      this.feedback = 'Helaas, probeer het opnieuw.';
    }
  }
  get unsolvedAnagramCount(): number {
    return this.Categories.filter(q => !q.solved).length;
  }
  solvedQuestionCount(category: Category): number {
    if (!category) return 0;
    return category.questions.filter(q => q.solved).length;
  }
  
  totalQuestions(category: Category): number {
    if (!category) return 0;
    return category.questions.length;
  }
  

  protected completeGame(): void {
    this.markAsCompleted();
  }
}