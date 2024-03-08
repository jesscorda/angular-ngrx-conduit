import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroUserCircleSolid } from '@ng-icons/heroicons/solid';

enum AvatarSizes {
  Small = 's',
  Medium = 'm',
  Large = 'l',
  XLarge = 'xl',
}

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './avatar.component.html',
  providers: [provideIcons({ heroUserCircleSolid })],
})
export class AvatarComponent {
  @Input() imageUrl?: string | null = heroUserCircleSolid;
  @Input() size?: string = AvatarSizes.Medium;

  getClassesForSize(size: string = AvatarSizes.Medium): string {
    switch (size) {
      case AvatarSizes.Small:
        return 'w-4 h-4';
      case AvatarSizes.Medium:
        return 'w-6 h-6';
      case AvatarSizes.Large:
        return 'w-16 h-16';
      case AvatarSizes.XLarge:
        return 'w-28 h-28';
      default:
        throw new Error('Invalid avatar size');
    }
  }
}
