import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
})
export class TagComponent {
  @Input({ required: true }) tag!: string;
}
