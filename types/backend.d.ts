export interface BackendProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  compareAtPrice: string | null;
  stock: number;
  status: "DRAFT" | "PUBLISHED";
  imageUrls: string[];
  categories: { id: string; name: string }[];
}

export interface BackendCategory {
  id: string;
  name: string;
}
