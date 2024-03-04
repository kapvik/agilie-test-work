import { ImageDataDto } from "./images-response-dto.model";

export class ImageItem {
  id: string;
  title: string;
  date: string;
  url: string;

  constructor (value: ImageDataDto) {
    this.id = value.id;
    this.title = value.title;
    this.date = value.import_datetime;
    this.url = value.images.fixed_width.url;
  }
}