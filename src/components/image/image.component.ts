import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ImageItem } from '../../models/image.model';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  @Input({ required: true }) public image!: ImageItem;

  public format = 'MMM d y';
}
