export type ProductType = {
  id: number;
  title: string;
};
import { client, productsCollection } from "./db";

const products: ProductType[] = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];

export const productsRepository = {
  async findProducts(title: any) {
    if (title) {
      const test = await productsCollection
        .find({ title: { $regex: title } })
        .toArray();

      return test;
    }
    const test = await productsCollection.find().toArray();
    return test;
  },

  async findProductById(id: number): Promise<any> {
    const one = await productsCollection.findOne({ id });
    if (one) {
      return one;
    } else {
      return null;
    }
  },
  async createProduct(newProduct: object) {
    const updated = await productsCollection.insertOne(newProduct);

    return updated;
  },
  async updateProduct(id: number, title: string): Promise<boolean> {
    const one = await productsCollection.updateOne(
      { id },
      { $set: { title: title } }
    );
    return one.matchedCount >= 1;
  },
  async deleteProduct(id: number): Promise<boolean> {
    const one = await productsCollection.deleteOne({ id });

    return one.deletedCount >= 1;
  },
};
