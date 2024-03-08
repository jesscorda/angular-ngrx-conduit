import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroDocument } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-empty-data-indicator',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './empty-data-indicator.component.html',
  providers: [provideIcons({ heroDocument })],
})
export class EmptyDataIndicatorComponent {}
