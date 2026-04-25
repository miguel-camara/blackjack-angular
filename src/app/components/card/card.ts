import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'card-component',
  templateUrl: './card.html',
})
export class Card {
  isToggle = input.required<boolean>();
  card = input.required<string>();
  index = input.required<number>();
}
