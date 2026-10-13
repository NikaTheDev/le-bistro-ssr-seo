/** კერძი — GET /api/v1/enterprise/dishes (SRMS API) */
export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  categorySlug: string;
  categoryName: string;
  imageFileName: string;
  imageUrl: string; // "/images/baguette.jpg" — სწრაფი, სტატიკური ფაილი
  slowImageUrl: string; // "/api/v1/learning/images/14" — ნელი (~2 წმ), როგორც ორიგინალ საიტზე
  isAvailable: boolean;
}

/** კატეგორია — GET /api/v1/enterprise/categories */
export interface Category {
  id: number;
  slug: string;
  nameEn: string;
  nameKa: string;
  sortOrder: number;
  dishCount: number;
}
