// Products types: the Category and Product types shared by the products files.
export type Category = "Laptops" | "Graphics Cards" | "Monitors" | "Keyboards & Mice" | "Storage";

export type Product = {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
};
