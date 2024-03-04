import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ImageComponent } from '../image/image.component';
import { SearchComponent } from '../search/search.component';
import { ImageService } from '../../services/image.service';
import { ImageItem } from '../../models/image.model';
import { RequestType } from '../../models/request-type.enum';

@UntilDestroy()
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ImageComponent, SearchComponent, AsyncPipe, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  public images$: BehaviorSubject<ImageItem[]> = this.imageService.images$;
  public imagesTotal$: BehaviorSubject<number> = this.imageService.imagesTotal$;
  public isLoading$: BehaviorSubject<boolean> = this.imageService.isLoading$;
  public isLoaded$: BehaviorSubject<boolean> = this.imageService.isLoaded$;
  public isError$: BehaviorSubject<boolean> = this.imageService.isError$;

  public selectedQuery = '';

  public get isLoadMore(): boolean {
    const total = this.imagesTotal$.value;
    return Boolean(total && total > this.images$.value?.length);
  }

  constructor(
    private readonly imageService: ImageService,
  ) {
  }

  public ngOnInit(): void {
    this.loadTrendingImgs();
  }

  public loadTrendingImgs(): void {
    this.selectedQuery = '';
    this.imageService.updateOffset(0);
    this.imageService.getImages(RequestType.trending).pipe(untilDestroyed(this)).subscribe();
  }

  public loadMore(): void {
    this.imageService.updateOffset();

    if (this.selectedQuery) {
      this.imageService.getImages(RequestType.search, this.selectedQuery).pipe(untilDestroyed(this)).subscribe();
    } else {
      this.imageService.getImages(RequestType.trending).pipe(untilDestroyed(this)).subscribe();
    }
  }

  public searchImages(query: string): void {
    this.selectedQuery = query;
    this.imageService.updateOffset(0);
    this.imageService.getImages(RequestType.search, query).pipe(untilDestroyed(this)).subscribe();
  }
}
