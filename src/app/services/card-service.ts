import { Injectable, signal } from '@angular/core';
import _ from 'underscore';

@Injectable({
  providedIn: 'root',
})
export class CardService {

  deck = signal<string[]>([]);
  types: string[] = ['C', 'D', 'H', 'S'];
  specials: string[] = ['A', 'J', 'Q', 'K'];

  pushDeck(value: string | number) {
    this.deck.update((deck) => [...deck, `${value + this.types[0]}`, `${value + this.types[1]}`, `${value + this.types[2]}`, `${value + this.types[3]}`]);
  }

  createDeck(): string[] {
    this.deck.set([]);

    for (let i = 1; i <= 13; i++) {
      switch (i) {
        case 1:
          this.pushDeck(this.specials[0]);
          continue;
        case 11:
          this.pushDeck(this.specials[1]);
          continue;
        case 12:
          this.pushDeck(this.specials[2]);
          continue;
        case 13:
          this.pushDeck(this.specials[3]);
          continue;
        default:
          this.pushDeck(i);
      }
    }

    const short = _.shuffle(this.deck());
    this.deck.set(short);
    // const short = ['AC', 'JC', 'AD', 'JD']
    // this.deck.set(short);

    return short;
  }

  getCard(): string {
    if (this.deck().length === 0) {
      throw new Error('No hay cartas en el deck');
    }

    const card = this.deck().at(0);
    const cards: string[] = this.deck().slice(1);

    this.deck.set(cards);

    return card ?? '';

  }
}
