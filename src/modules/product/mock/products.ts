import { Product } from "../types/Product";

export const products: Product[] = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 900) + 100,
  description: `This is a detailed description for Product ${i + 1}. It is a high-quality item that is perfect for your needs. It comes with a variety of features and is built to last.`,
  createdAt: new Date(
    new Date().getTime() - Math.random() * 1e12,
  ).toISOString(),
  updatedAt: new Date().toISOString(),
  thumbnail: `https://picsum.photos/seed/${i + 1}/200/300`,
  images: [
    `https://picsum.photos/seed/${i + 1}-1/600/800`,
    `https://picsum.photos/seed/${i + 1}-2/600/800`,
    `https://picsum.photos/seed/${i + 1}-3/600/800`,
  ],
  category: `Category ${i + 1}`,
}));
