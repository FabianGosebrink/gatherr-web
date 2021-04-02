import { Category } from './category';

export interface Group {
  id: string;
  name: string;
  created: string;
  description: string;
  latitude: number;
  longitude: number;
  linkName: string;
  imageUrl: string;
  groupCategories: Category[];
}

export interface GroupLinks {
  href: string;
  rel: string;
  method: string;
}

export interface PagingMetadata {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
