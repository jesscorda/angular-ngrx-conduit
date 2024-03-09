import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-articles-wrapper',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './articles-wrapper.component.html',
})
export class ArticlesWrapperComponent {}
