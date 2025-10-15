// import {promises as fs} from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
import Product from "../models/Product.js";

// YA NO USAMOS ESTO PORQUE VAMOS A MONGODB
// configuracion __dirname en modulos
// const __filename = fileURLToPath(import.meta.url);  // comnvierte url en rutas de archivo
// const __dirname = path.dirname(__filename);     // convierte la ruta del archivo actual en una normal

/*class ProductManager {

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();  //this.getProducts() devuelve todos los productos de la misma clase
        return products.find(product => product.id === id);
    }

    async addProduct(productData) {
        const products = await this.getProducts();
        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1, // genera un id autoincremental
            title: productData.title,
            description: productData.description,
            code: productData.code,
            price: productData.price,
            status: productData.status ?? true,
            stock: productData.stock,
            category: productData.category,
            thumbnails: productData.thumbnails || []
        };
        products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, productData) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index === -1) return {error: 'no se encontro producto'}; // Producto no encontrado

        const updatedProduct = { ...products[index], ...productData };
        products[index] = updatedProduct;
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return updatedProduct;
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index === -1) return {error: 'no se encontro producto'}; // Producto no encontrado

        products.splice(index, 1);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return {message: `Producto con id ${id} eliminado`};
    }
}
*/
class ProductManager {
    async getProducts() {
        return await Product.find();
    }

    async getProductById(id) {
        return await Product.findById(id);
    }

    async addProduct(productData) {
        const newProduct = new Product(productData);
        return await newProduct.save();
    }

    async updateProduct(id, productData) {
        return await Product.findByIdAndUpdate(id, productData, { new: true });
    }

    async deleteProduct(id) {
        return await Product.findByIdAndDelete(id);
    }
}

export default ProductManager;