// Cart types: the CartItem and Cart types shared by the cart files.

// One saved cart entry: a product id and how many of it.
export type CartItem = { id: number; qty: number };

// The whole cart: a list of cart entries.
export type Cart = CartItem[];
