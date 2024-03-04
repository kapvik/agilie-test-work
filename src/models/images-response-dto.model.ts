import { Pagination } from "./pagination.model";

export interface ImagesResponctDto {
  data: ImageDataDto[];
  meta: Meta;
  pagination: Pagination;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

export interface ImageDataDto {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: Image;
  user: User;
  analytics_response_payload: string;
  analytics: Analytics;
}

export interface Image {
  original: ImageFullData;
  downsized: BasicImage;
  downsized_large: BasicImage;
  downsized_medium: BasicImage;
  downsized_small: BasicImage;
  downsized_still: BasicImage
  fixed_height: ImageFullData;
  fixed_height_downsampled: WebpImage;
  fixed_height_small: ImageFullData;
  fixed_height_small_still: BasicImage;
  fixed_height_still: BasicImage;
  fixed_width: ImageFullData;
  fixed_width_downsampled: WebpImage;
  fixed_width_small: ImageFullData;
  fixed_width_small_still: BasicImage;
  fixed_width_still: BasicImage;
  looping: Mp4Image;
  original_still: BasicImage;
  original_mp4: Mp4Image;
  preview: Mp4Image;
  preview_gif: BasicImage;
  preview_webp: BasicImage;
  '480w_still': BasicImage;
  hd?: Mp4Image;
}

export interface ImageSize {
  height: string;
  width: string;
}

export interface BasicImage extends ImageSize {
  size: string;
  url: string;
}

export interface Mp4Image extends ImageSize {
  mp4_size: string;
  mp4: string;
}

export interface WebpImage extends ImageSize {
  webp_size: string;
  webp: string;
}

export interface ImageFullData extends BasicImage, Mp4Image, WebpImage {
  frames?: string;
  hash?: string;
}

export interface User {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
}

export interface Analytics {
  [k: string]: {
    url: string;
  }
}