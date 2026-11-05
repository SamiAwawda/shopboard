// Products API: the products path, the check of the reply, and API data -> Product.
import { api, type ApiState } from "../../shared/api/client";
import type { ApiProduct, Category, Product, ProductsResponse } from "./products.types";

const PRODUCTS_PATH = "/api/products";
const IMAGE_FOLDER = "/images/products";

// Checks that an unknown value is one of the three categories.
function isCategory(value: unknown): value is Category {
  return value === "Bags" || value === "Shoes" || value === "Accessories";
}

// Checks that an unknown value is one product in the shape the API sends.
function isApiProduct(value: unknown): value is ApiProduct {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "title" in value &&
    "category_name" in value &&
    "price_cents" in value &&
    "in_stock" in value &&
    typeof value.id === "number" &&
    typeof value.title === "string" &&
    isCategory(value.category_name) &&
    typeof value.price_cents === "number" &&
    typeof value.in_stock === "boolean"
  );
}

// Checks that an unknown value is the API reply: an object with a list of products.
function isProductsResponse(value: unknown): value is ProductsResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "items" in value &&
    Array.isArray(value.items) &&
    value.items.every(isApiProduct)
  );
}

// The photo path for a product: its title in lowercase with dashes, for example leather-tote-bag.jpg.
function imagePath(title: string): string {
  return `${IMAGE_FOLDER}/${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.jpg`;
}

// Turns one API product into the Product the page uses (this is where the names are translated).
function toProduct(item: ApiProduct): Product {
  return {
    id: item.id,
    name: item.title,
    category: item.category_name,
    priceCents: item.price_cents,
    inStock: item.in_stock,
    image: imagePath(item.title),
  };
}

// Turns the API states into product states: a success carries a list of Product.
function toProductsState(state: ApiState<ProductsResponse>): ApiState<Product[]> {
  if (state.status === "success") {
    return { status: "success", data: state.data.items.map(toProduct) };
  }
  return state;
}

// Loads the products and reports every state (loading, then success, empty or error).
export function loadProducts(onState: (state: ApiState<Product[]>) => void): Promise<void> {
  return api.load(
    PRODUCTS_PATH,
    isProductsResponse,
    (response) => response.items.length === 0,
    (state) => onState(toProductsState(state)),
  );
}
