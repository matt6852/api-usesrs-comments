import { productsRepository } from "./../repositories/products-repository";
export type ProductType = {
  id: number;
  title: string;
};

export const productsService = {
  async findProducts(title: any) {
    return productsRepository.findProducts(title);
  },

  async findProductById(id: number): Promise<any> {
    return productsRepository.findProductById(id);
  },
  async createProduct(title: string) {
    const newProduct = {
      id: +new Date(),
      title: title,
    };
    return productsRepository.createProduct(newProduct);
  },
  async updateProduct(id: number, title: string): Promise<any> {
    return productsRepository.updateProduct(id, title);
  },
  async deleteProduct(id: number): Promise<any> {
    return productsRepository.deleteProduct(id);
  },
};
