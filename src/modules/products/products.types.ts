// Products types: the Category, Product and API types shared by the products files.
import type { ApiState } from "../../shared/api/client";

export type Category = "Bags" | "Shoes" | "Accessories";

// A product as the page uses it. The price is in cents (8900 means $89.00).
export type Product = {
  id: number;
  name: string;
  category: Category;
  priceCents: number;
  inStock: boolean;
  image: string;
};

// One category tile on the right of the slider: its name, how many products, and a photo.
export type CategorySummary = { category: Category; count: number; image: string };

// One product exactly as the API sends it.
export type ApiProduct = {
  id: number;
  title: string;
  category_name: Category;
  price_cents: number;
  in_stock: boolean;
};

// The API reply for the product list.
export type ProductsResponse = { items: ApiProduct[] };

// The products states where the page shows a message instead of the list.
export type ProductsMessageState = Exclude<ApiState<Product[]>, { status: "success" }>;
