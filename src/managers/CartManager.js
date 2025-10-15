// import {promises as fs} from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
import Cart from "../models/Cart.js";

// YA NO USAMOS ESTO PORQUE VAMOS A MONGODB
// configuracion __dirname en modulos
// const __filename = fileURLToPath(import.meta.url);  // comnvierte url en rutas de archivo
// const __dirname = path.dirname(__filename);     // convierte la ruta del archivo actual en una normal

/*class CartManager {
    constructor(filePath) {
        this.path = path.resolve(__dirname, '..', filePath);
    }

    async getCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    // creamos un carrito
    async createCart() {
        const carts = await this.getCarts();
        const newCart = {
            id: carts.length ? carts[carts.length - 1].id + 1 : 1, // genera un id autoincremental
            products: []    // inicializamos el carrito con un array de productos vacío
        };
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    // obtenemos un carrito por id
    async getCarById(id) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === parseInt(id));
    }

    // agregar un producto a un carrito
    async addProductToCart(cid, pid) {
        const carts = await this.getCarts();
        const cartToAdd = carts.find(cart => cart.id === parseInt(cid));
        if (!cartToAdd) {
            return { error: 'Carrito no encontrado' };
        }
        const productToAdd = cartToAdd.products.find(product => product.id === parseInt(pid));
        if (productToAdd) {
            productToAdd.quantity += 1; // si el producto ya existe, incrementamos la cantidad
        }
        else {
            cartToAdd.products.push({ product: parseInt(pid), quantity: 1 }); // si no existe, lo agregamos con cantidad 1
        }
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return cartToAdd; // devolvemos el carrito actualizado
    }
}
*/
class CartManager {
    async getCarts() {
        return await Cart.find().populate('products.product');
    }

    async createCart() {
        const newCart = new Cart({ products: [] });
        return await newCart.save();
    }

    async getCartById(id) {
        return await Cart.findById(id).populate('products.product');
    }

    async addProductToCart(cartId, productId) {
        const cart = await Cart.findById(cartId);
        if (!cart) return null;
        const prod = cart.products.find(p => p.product.equals(productId));
        if (prod) {
            prod.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }
        return await cart.save();
    }
}

export default CartManager;