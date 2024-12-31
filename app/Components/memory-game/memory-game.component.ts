import { Component, OnInit } from '@angular/core';
import { BaseGameComponent } from '../base-game/base-game.component';
import { NgClass } from '@angular/common';
import { ProgressService } from '../../progress-service.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PathDirectoryService } from '../../path-directory.service';
// card.model.ts
export interface Card {
  id: number;        // Unique identifier for the card
  image: string;     // Path to the image representing the card
  isFlipped: boolean; // Indicates whether the card is currently flipped
  isMatched: boolean; // Indicates whether the card has been matched
}
@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [NgClass, HttpClientModule],
  templateUrl: './memory-game.component.html',
  providers: [ProgressService] ,
  styleUrl: './memory-game.component.css'
})
export class MemoryGameComponent extends BaseGameComponent implements OnInit {
  cards: Card[] = [];
  flippedCards: Card[] = [];
  matchedCards: number = 0;
  private flipTimeout: any = null;  // Store the timeout reference

  constructor(progressService: ProgressService, router: Router, pathdir: PathDirectoryService) {
    super(progressService, router, pathdir);
    this.ID = 'MemoryGameComponent'; // Set the game index for progress tracking
    this.initializeGame();
  }

  initializeGame(): void {
    const chocolateImages = [
      'Resources/Chocolate/Chocolate (1).png',
      'Resources/Chocolate/Chocolate (2).png',
      'Resources/Chocolate/Chocolate (3).png',
      'Resources/Chocolate/Chocolate (4).png',
      'Resources/Chocolate/Chocolate (5).png',
      'Resources/Chocolate/Chocolate (6).png',
      'Resources/Chocolate/Chocolate (7).png',
      'Resources/Chocolate/Chocolate (8).png',
      'Resources/Chocolate/Chocolate (9).png',
      'Resources/Chocolate/Chocolate (10).png',
    ];
     // Create pairs of cards
     this.cards = chocolateImages.flatMap((image, index) => [
      { id: index * 2, image: image, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, image: image, isFlipped: false, isMatched: false },
    ]);

    // Shuffle the cards
    this.cards = this.shuffleArray(this.cards);
  }

  shuffleArray(array: Card[]): Card[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  flipCard(card: Card): void {
    // If there's already one flipped card, flip the previous one back
    if (this.flippedCards.length === 2 && this.flippedCards[0] !== card) {
      // Cancel the previous timeout if the user clicked before it completed
      if (this.flipTimeout) {
        clearTimeout(this.flipTimeout);
      }

      // Flip the previously flipped card back
      this.flippedCards.forEach(element => {
        element.isFlipped = false;
      });

      // Clear the flipped cards array
      this.flippedCards = [];
    }

    // Flip the current card if it is not already flipped
    if (!card.isFlipped) {
      card.isFlipped = true;
      this.flippedCards.push(card);

      // If there are now two flipped cards, check for a match
      if (this.flippedCards.length === 2) {
        this.checkForMatch();
      }
    }
  }
  checkForMatch(): void {
    const [firstCard, secondCard] = this.flippedCards;

    if (firstCard.image === secondCard.image) {
      firstCard.isMatched = true;
      secondCard.isMatched = true;
      this.matchedCards += 2;
      if (this.matchedCards === this.cards.length) {
        this.completeGame();
      }
      this.flippedCards = [];
    } else {
      this.flipTimeout = setTimeout(() => {
        // Flip both cards back to default
        firstCard.isFlipped = false;
        secondCard.isFlipped = false;
        this.flippedCards = [];
      }, 1000);
    }
  }


  protected completeGame(): void {
    this.markAsCompleted();
  }
}