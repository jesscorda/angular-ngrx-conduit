import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { Paginator } from '../../types/paginator.interface';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [ActionButtonComponent],
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  @Input({
    required: true,
    transform: (value: number | undefined) => {
      return value ? value : 1;
    },
  })
  offset!: number;

  @Input({
    required: true,
    transform: (value: number | undefined) => {
      return value ? value : 10;
    },
  })
  limit!: number;

  @Input({
    required: true,
    transform: (value: number) => {
      return value + 1;
    },
  })
  total!: number;

  @Output() next = new EventEmitter<Paginator>();

  @Output() previous = new EventEmitter<Paginator>();

  onPreviousPress(): void {
    this.previous.emit({ limit: this.limit, offset: this.offset });
  }

  onNextPress(): void {
    this.next.emit({ limit: this.limit, offset: this.offset });
  }
}
