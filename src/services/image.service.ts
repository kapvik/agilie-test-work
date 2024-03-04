import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, map } from 'rxjs';

import { ImagesResponctDto } from '../models/images-response-dto.model';
import { ImageItem } from '../models/image.model';
import { RequestType } from '../models/request-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  public images$: BehaviorSubject<ImageItem[]> = new BehaviorSubject<ImageItem[]>([]);
  public imagesTotal$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  private readonly _API_KEY = 'TkEtD5LFddBuClR4wC7PclIvjYYxeSU8';
  private readonly _PAGE_LIMIT = 12;
  private readonly _apiUrl = 'https://api.giphy.com/v1/gifs/';
  private _offset$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public getImages(request: RequestType, query?: string): Observable<ImageItem[]> {
    this.isLoading$.next(true);
    this.isLoaded$.next(false);
    this.isError$.next(false);

    let params = new HttpParams();

    if (!this._offset$.value) {
      this.images$.next([]);
    }

    params = params
    .append('api_key', this._API_KEY)
    .append('limit', this._PAGE_LIMIT)
    .append('offset', this._offset$.value);

    if (query) {
      params = params.append('q', query);
    }

    return this.httpClient.get<ImagesResponctDto>(`${ this._apiUrl }${ request }`, { params })
    .pipe(
      map(result => {
        this.isLoading$.next(false);
        this.isLoaded$.next(true);

        const formattedImages = result.data.map(item => new ImageItem(item));
        this.images$.next([...this.images$.value, ...formattedImages]);
        this.imagesTotal$.next(result.pagination.total_count);
        return formattedImages;
      }),
      catchError(() => {
        this.isError$.next(true);
        this.isLoading$.next(false);
        return EMPTY;
      })
    );
  }

  public updateOffset(offset?: number): void {
    if (offset === undefined) {
      this._offset$.next(this._offset$.value + this._PAGE_LIMIT);
    } else {
      this._offset$.next(offset);
    }
  }
}
