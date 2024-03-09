import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './action-button.component.html',
})
export class ActionButtonComponent {
  @Input({ required: true }) label!: string;

  @Input() type: string = 'primary';

  @Input() disabled: boolean = false;

  @Output() performAction = new EventEmitter<void>();

  onPerformAction(): void {
    this.performAction.emit();
  }
}
