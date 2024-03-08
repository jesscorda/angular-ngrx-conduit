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

  @Output() performAction = new EventEmitter<void>();

  onPerformAction(): void {
    this.performAction.emit();
  }

  getColorClass(): string {
    if (this.type === 'primary') return 'bg-THEME_COLORS-spaceCadet text-THEME_COLORS-isabelline';
    else return 'text-THEME_COLORS-spaceCadet bg-THEME_COLORS-isabelline';
  }
}
