export interface BackendCategory {
  id: string;
  name: string;
}

export interface Artisan {
  id: string;
  storeName: string;
  storeDescription: string;
  status: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user?: {
    name: string;
  };
}

export interface BackendProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  compareAtPrice: string | null;
  stock: number;
  status: "DRAFT" | "PUBLISHED";
  imageUrls: string[];
  categories: BackendCategory[];
  weight?: number; 
  material?: string;
  artisan?: Artisan; 
  reviews?: Review[];
  avgRating?: string;
}

export interface ProductFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  material?: string;
  minStock?: number;
  minRating?: number;
  cursor?: string;
  take?: number;
}

export interface PaginationMeta {
  nextCursor: string | null;
  hasNextPage: boolean;
}

export interface PaginatedProductsResponse {
  data: BackendProduct[];
  meta: PaginationMeta;
}