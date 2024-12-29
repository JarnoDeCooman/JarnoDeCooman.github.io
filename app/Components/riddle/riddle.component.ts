import { Component } from '@angular/core';
import { BaseGameComponent } from '../base-game/base-game.component';
import { FormsModule } from '@angular/forms';
import { ProgressService } from '../../progress-service.service';
import { Router } from '@angular/router';
import { decryptAnswer, encryptAnswer } from '../../Utils';

@Component({
  selector: 'app-riddle',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './riddle.component.html',
  styleUrl: './riddle.component.css'
})
export class RiddleComponent extends BaseGameComponent{

  riddles = [
    { question: 'Wat ik ben, is hoe ik heet. Mensen hebben mij het liefst als laatst. Maar wat ik wel weet, is dat ik in elke tekst ben geplaatst. Wat ben ik?', answers: ['U2FsdGVkX18nH4nKVA60Sfe5iuLXyHMSrEMe4oNdx7I='], Article: 'een'},
    { question: 'verdediger zonder wapens, drager zonder spieren, stilstaand op de grens. Wat ben ik?', answers: ['U2FsdGVkX18uDNJF6d5zJWAavesKC4XCmyiCOFsJwrg='], Article: 'een' },
    { question: 'Een huis heeft vier muren. Alle ramen in de muren kijken uit op het zuiden. Rond het huis loopt een beer. Welke kleur heeft de beer?', answers: ['U2FsdGVkX18wGGHdxXJPqigzCq9KEGy2hnMzlHpETJ4='] },
    { question: 'Als ik het heb, deel ik het niet. Als ik het deel, heb ik het niet. Wat is het?', answers: ['U2FsdGVkX1/DyyRwx9Q9Tj25FulOc5hRgdJXbzOpGNQ='], Article: 'een' },
    { question: 'Licht verbergt me, maar duisternis doodt me.', answers: ['U2FsdGVkX19LFX2UeFgZmmivC59WZkkyOa0hSICputE='], Article: 'een' },
    { question: 'Ik ben altijd in de toekomst, maar nooit in het verleden. Wat ben ik?', answers: ['U2FsdGVkX1/SNYmEI2nSZMCAY+y4SOONDy5bzF6bD8E='] },
    { question: 'Hoe meer je van mij wegneemt, hoe groter ik word. Wat ben ik?', answers: ['U2FsdGVkX19sMmUTQE6N+12Tlz2CGgziL0lQAmKNb8o=', "U2FsdGVkX1/Gk806zJPP8R88GaeQG0UW9yaS6joWc6U=", "U2FsdGVkX1/b+GXdpp9HiBtJj5YaFEbns0Jhtnu2nCY="], Article: 'een' },
    { question: 'Wat heeft een nek, maar geen hoofd?', answers: ['U2FsdGVkX18lXq9G1s7+tXd11H96PjL6lNgKToYyIlA='], Article: 'een' },
    { question: 'Wat heeft tanden, maar kan niet bijten?', answers: ['U2FsdGVkX1+R8wy88VHji6LV2op0eA6RFV0Kuzszlp8='], Article: 'een' },
    { question: 'Wat is altijd voor je, maar kun je niet zien?', answers: ['U2FsdGVkX19uWwmbfxsVjQ0Hi3c0IqGV4tMOlN8WrNA='], Article: 'de' },
    { question: 'Wat heeft één oog, maar kan niet zien?', answers: ['U2FsdGVkX18aYAq+YaPnf/z3PqXSMrxvQ6gUKU+lpEU='], Article: 'een' },
    { question: 'Wat gaat omhoog en omlaag, maar beweegt niet?', answers: ['U2FsdGVkX1+1N9f6EKBDkACpMlyuDW6a0YzjgL0RAZM=','U2FsdGVkX19TZ8WXcY1bn+wpOUBsNBtlpxwMxRCnEZk='], Article: 'een' }
  ];

  currentRiddleIndex: number = 0;
  userAnswer: string = '';
  feedback: string | null = null;

  constructor(progressService: ProgressService, router: Router) {
    super(progressService, router);
    this.riddles = this.shuffleArray(this.riddles);
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));  // Random index
      [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
  }
  checkAnswer(): void {
    var decryptedAnswers = this.riddles[this.currentRiddleIndex].answers.map(answer => {
      return decryptAnswer(answer);
    });
    if (decryptedAnswers.includes(this.userAnswer.trim().toLowerCase())) {
      this.feedback = null;
      this.currentRiddleIndex+=1;
      this.userAnswer = '';

      if (this.currentRiddleIndex >= this.riddles.length) {
        this.completeGame();
      } else {
      }
    } else {
      this.feedback = 'Helaas, probeer het opnieuw.';
    }
  }

  protected completeGame(): void {
    this.markAsCompleted();
  }
}
