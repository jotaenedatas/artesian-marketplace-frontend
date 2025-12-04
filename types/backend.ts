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
  weight: number | null; // Pode ser null no banco
  material: string | null;
  stock: number;
  status: "DRAFT" | "ACTIVE" | "PAUSED" | "ARCHIVED";
  imageUrls: string[];
  artisanId: string;
  artisan?: {
    id: string;
    storeName: string;
  };
  categories: {
    id: string;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
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

export interface ArtisanProfile {
  id: string;
  storeName: string;
  storeDescription: string;
  identification: string;
  proofOfAddressUrl: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  userId: string;
  products: BackendProduct[];
}

export interface ArtisanDashboardStats {
  storeName: string;
  totalProducts: number;
  averageRating: string;
  totalReviews: number;
  status: string;
}

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  ARTISAN = "ARTISAN",
  ADMIN = "ADMIN",
}

export interface BackendUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface BackendAddress {
  id: string;
  street: string;
  number: string;
  complement: string | null;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  userId: string;
}

export type OrderStatus =
  | "AWAITING_PAYMENT"
  | "PAYMENT_APPROVED"
  | "IN_PREPARATION"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface BackendOrder {
  id: string;
  createdAt: string;
  status: OrderStatus;
  shippingFee: string;
  totalAmount: string;
  trackingCode: string | null;
  customerId: string;
  items?: {
    id: string;
    quantity: number;
    unitPrice: string;
    product: {
      title: string;
      imageUrls: string[];
    };
  }[];
}

export type ProductStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "ARCHIVED";
