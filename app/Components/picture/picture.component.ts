import { Component } from '@angular/core';
import { ProgressService } from '../../progress-service.service';
import { Router } from '@angular/router';
import { BaseGameComponent } from '../base-game/base-game.component';
import { decryptAnswer, encryptAnswer } from '../../Utils';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-picture',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './picture.component.html',
  providers: [ProgressService] ,
  styleUrl: './picture.component.css'
})
export class PictureComponent extends BaseGameComponent {
  questions = [
    {
      question: "Welke stad wordt afgebeeld met deze beroemde toren?",
      answer: "U2FsdGVkX19tnxpXiMHx87X5XoqaHzlasz5XIwVCUEI=",
      options: this.shuffleArray(["Parijs", "Londen", "New York", "Eiffeltoren"]),
      image: "Resources/Images/Image1.jpg",
    },
    {
      question: "In welke stad staat deze scheve toren?",
      answer: "U2FsdGVkX18RhSTJkaAyw3GuZip+ilDo6IMkMSJGddA=",
      options: this.shuffleArray(["Pisa", "Florence", "Venetië", "Rome"]),
      image: "Resources/Images/Image2.jpg",
    },
    {
      question: "Dit is een kaart van welk land?",
      answer: "U2FsdGVkX1/aiJjwNEjY4XyU/H1lCwZ9yt+t+j4a+l4=",
      options: this.shuffleArray(["Japan", "China", "Zuid-Korea", "Thailand"]),
      image: "Resources/Images/Image3.jpg",
    },
    {
      question: "Wat is de naam van deze rivier?",
      answer: "U2FsdGVkX19jJrALi3V6f5goeAQXgxJvIhKO1/pVoc4=",
      options: this.shuffleArray(["Seine", "Schelde", "Nijl", "Amazone"]),
      image: "Resources/Images/Image4.jpg",
    },
    {
      question: "Door welke hoofdstad stad start deze beroemde rivier?",
      answer: "U2FsdGVkX1930YLrP8Izuec4rzzgML8eRWTzGHxamYI=",
      options: this.shuffleArray(["Khartoem", "Caïro", "Gizeh", "Suez"]),
      image: "Resources/Images/Image5.jpg",
    },
    {
      question: "In welke stad staat de Taj Mahal?",
      answer: "U2FsdGVkX1/iwXlJTtcm10v0j/TFu+ndHrBEhc9FDfw=",
      options: this.shuffleArray(["Agra", "New Delhi", "Mumbai", "Jaipur"]),
      image: "Resources/Images/Image6.jpg",
    },
    {
      question: "Welk automerk hoort bij dit logo?",
      answer: "U2FsdGVkX19JrUGbaFjk58+xkzbPYzns6fAuc/dLEcs=",
      options: this.shuffleArray(["General Motors", "Morris Garages", "Myasthenia Gravis", "Maybach"]),
      image: "Resources/Images/Image7.jpg",
    },
    {
      question: "Bij welk biermerk hoort dit glas?",
      answer: "U2FsdGVkX1+D0In5MhgDaDBMmDlcYUrO5ju9iDM/ELY=",
      options: this.shuffleArray(["Affligem", "Amstel", "Jupiler", "Grolsch"]),
      image: "Resources/Images/Image8.jpg",
    },
    {
      question: "Welke autofabrikant produceerde deze sportwagen?",
      answer: "U2FsdGVkX1+5GvR48Pp3LyLYciIBueKBIqEeJe7hRIk=",
      options: this.shuffleArray(["Ferrari", "Lotus", "Ford", "Lamborghini"]),
      image: "Resources/Images/Image9.jpg",
    },
    {
      question: "Wat is de naam van dit stadion?",
      answer: "U2FsdGVkX18AIjJJC69+33vW2PybhAzQicypRy9Uuvs=",
      options: this.shuffleArray(["Camp Nou", "Santiago Bernabéu", "Johan Cruijff Arena", "Wembley Stadium"]),
      image: "Resources/Images/Image10.jpg",
    },
    {
      question: "Welke chocoladefabrikant heeft dit logo?",
      answer: "U2FsdGVkX1/fb8mwQnAoRGolgVyKItgIm4Ys2xCuhtY=",
      options: this.shuffleArray(["Lindt", "Milka", "Toblerone", "Ferrero"]),
      image: "Resources/Images/Image11.jpg",
    },
    {
      question: "Wat is de naam van dit beroemde kunstwerk?",
      answer: "U2FsdGVkX1+eRDotTSwYL38gRf251TmP0srIpxAD/Sw=",
      options: this.shuffleArray(["De Nachtwacht", "Korenveld onder onweerslucht", "De Sterrennacht", "Sterrennacht boven de Rhône"]),
      image: "Resources/Images/Image12.jpg",
    },
    {
      question: "Welke stad staat bekend om deze iconische brug?",
      answer: "U2FsdGVkX18vUjSphIlxla+eHO09mB2HDrcmiUSH+0w=",
      options: this.shuffleArray(["Sydney", "Montreal", "San Francisco", "Los Angelos"]),
      image: "Resources/Images/Image13.jpg",
    },
  ];
  
  

  currentQuestionIndex = 0;
  selectedOption: string | null = null;
  isCorrect: boolean | null = null;


  constructor(progressService: ProgressService, router: Router) {
    super(progressService, router);
    this.questions = this.shuffleArray(this.questions);
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));  // Random index
      [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
  }
  // Check if the selected option is correct
  checkAnswer(): void {
    if (this.selectedOption !== null) {
      var decryptedAnswer = decryptAnswer(this.questions[this.currentQuestionIndex].answer);
      this.isCorrect = this.selectedOption === decryptedAnswer;
      if (this.isCorrect) {
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
          this.selectedOption = null;
          this.isCorrect = null;
        } else {
          this.completeGame();
        }
      }
    }
  }

  // Mark the game as completed
  protected completeGame(): void {
    this.markAsCompleted();
  }
}
