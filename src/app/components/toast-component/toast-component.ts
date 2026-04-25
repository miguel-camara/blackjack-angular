import { Component, input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast-component.html',
})
export class ToastComponent {
  message = input.required<string>();
  computer = input.required<boolean>();
  player = input.required<boolean>();
}
