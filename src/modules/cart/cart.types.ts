// Cart types: the CartItem and Cart types shared by the cart files.
import type { ApiState } from "../../shared/api/client";

// One saved cart entry: a product id and how many of it.
export type CartItem = { id: number; qty: number };

// The whole cart: a list of cart entries.
export type Cart = CartItem[];

// The states of the product request where the cart page shows a message instead of the rows.
export type CartMessageState = Extract<
  ApiState<unknown>,
  { status: "loading" } | { status: "error" }
>;
