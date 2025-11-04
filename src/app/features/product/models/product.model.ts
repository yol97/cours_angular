export type Product = {
  active: boolean;        // à supprimer
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  stock: number;
  rating: number;
  reviews?: number[];
};
