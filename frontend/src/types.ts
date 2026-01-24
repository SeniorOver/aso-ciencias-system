export interface Product {
  id: string; // O '_id' si viene directo de Mongo, ajustaremos según tu backend
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}