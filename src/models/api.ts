// COMMON
export interface IApiResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  regionCode?: string;
  pageInfo: IApiPageInfo;
  items: IItem[];
}

export interface IApiPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface IItem {
  kind: string;
  etag: string;
  id: IItemId;
  snippet: IAPISnippet;
  statistics?: IChannelStatistics;
  brandingSettings?: IChannelBrandingSettings;
  player?: IVideoPlayer
}

export interface IAPISnippet {
  publishedAt: string;
  channelId?: string;
  title: string;
  description: string;
  thumbnails: ISnippetThumbnails;
  channelTitle?: string;
  liveBroadcastContent?: string;
  publishTime?: string;
  customUrl?: string;
  [propName: string]: unknown;
}

export interface ISnippetThumbnails {
  default: IThumbnail;
  medium: IThumbnail;
  high: IThumbnail;
}

export interface IThumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface IItemId {
  kind: string;
  channelId?: string;
  videoId?: string;
}

// SPECIFIC SEARCH
export interface IApiSpecificSearchResponse extends Omit<IApiResponse, 'items'> {
  items: ISpecificSearchItem[];
}

export interface ISpecificSearchItem extends Omit<IItem, 'id'> {
  id: string
}

// CHANNEL
export interface IChannelStatistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

export interface IChannelBrandingSettings {
  channel: IChannelBrandingSettingsChannel;
  image: IChannelBrandingSettingsImage;
}

export interface IChannelBrandingSettingsChannel {
  title: string;
  description: string;
  keywords: string;
  unsubscribedTrailer: string;
  country: string;
}

export interface IChannelBrandingSettingsImage {
  bannerExternalUrl: string;
}

// VIDEO
export interface IVideoStatistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface IVideoPlayer {
  embedHtml: string;
}