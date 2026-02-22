export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory: string;
  gender: 'women' | 'men' | 'unisex';
  fabric: string;
  color: string;
  sizes: string[];
  occasion: string[];
  description: string;
  craftStory?: string;
  fabricDetails?: string;
  artisanNote?: string;
  culturalMeaning?: string;
  stylingGuide?: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  deliveryDays: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface NavCategory {
  label: string;
  href: string;
  columns: NavColumn[];
  featured?: { title: string; image: string; href: string };
}

export interface NavColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  location: string;
}
