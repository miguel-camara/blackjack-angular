import { Component, inject, signal } from '@angular/core';
import { Card } from '../../components/card/card';
import { CardService } from '../../services/card-service';
import { Player } from '../../interfaces/player.inteface';
import { ToastComponent } from "../../components/toast-component/toast-component";

@Component({
  selector: 'app-home',
  imports: [Card, ToastComponent],
  templateUrl: './home.html',
})
export default class Home {
  COMPUTER = signal<number>(1);
  isDisabled = signal<boolean>(false);
  isWinner = signal<boolean>(false);
  message = signal<string>('');

  deckService = inject(CardService);

  protected players = signal<Player[]>([
    { name: 'Jugador', score: 0, cards: ['grey_back'], winner: false },
    { name: 'Computadora', score: 0, cards: ['grey_back'], winner: false }
  ]);

  isToggle = signal<boolean>(false);

  newGame() {
    this.players.set([
      { name: 'Jugador', score: 0, cards: ['grey_back'], winner: false },
      { name: 'Computadora', score: 0, cards: ['grey_back'], winner: false }
    ]);
    this.isDisabled.set(true);
    this.isWinner.set(false);
    this.deckService.createDeck();
  }

  getCard(index: number): number {
    const card: string = this.deckService.getCard();
    const player = this.players()[index];

    if (player.cards[0] === 'grey_back') {
      player.cards.pop();
    }

    const newCards = [...player.cards, card];
    const newScore = player.score + this.getValueCard(card);

    this.players.update((players) => {
      const newPlayers = [...players];
      newPlayers[index] = { ...player, cards: newCards, score: newScore, winner: false };
      return newPlayers;
    });

    this.checkWinner(newScore);

    return newScore;
  }

  getValueCard(card: string): number {
    const value = card.substring(0, card.length - 1);
    return isNaN(Number(value)) ? (value === 'A' ? 11 : 10) : Number(value);
  }

  checkWinner(score: number) {
    if (!this.isDisabled()) return;
    if (score > 21 || score === 21) {
      this.computerShift();
    }
  };

  computerShift() {
    this.isDisabled.set(false);

    let scoreGlobal = this.players()[this.COMPUTER()].score;
    let score = this.players()[0].score;
    do {
      scoreGlobal = this.getCard(this.COMPUTER());
    } while (scoreGlobal < score && score <= 21);

    this.determineWinner(scoreGlobal);
  };

  determineWinner(total: number) {
    const score = this.players().at(0)?.score ?? 0;

    if (total === score) {
      this.message.set("Nadie gana :(");
      this.updateWinner(false, false);
    } else if (score > 21) {
      this.message.set("Computadora gana");
      this.updateWinner(true, false);
    } else if (total > 21) {
      this.message.set("Jugador Gana");
      this.updateWinner(false, true);
    } else {
      this.message.set("Computadora gana");
      this.updateWinner(true, false);
    }
    this.isWinner.set(true);
  };

  updateWinner(computer: boolean, play: boolean) {
    this.players.update((players) => {
      const newPlayers = [...players];
      newPlayers[0] = { ...newPlayers[0], winner: play };
      newPlayers[this.COMPUTER()] = { ...newPlayers[this.COMPUTER()], winner: computer };
      return newPlayers;
    });
  }
}
