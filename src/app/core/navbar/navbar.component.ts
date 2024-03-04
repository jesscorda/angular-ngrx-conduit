import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCheckCircle } from '@ng-icons/heroicons/outline';
import { THEME_COLORS } from '../../../theme/theme-colors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './navbar.component.html',
  providers: [provideIcons({ heroCheckCircle })],
})
export class NavbarComponent {
  readonly HEADER_ICON_COLOR = THEME_COLORS.spaceCadet
}
