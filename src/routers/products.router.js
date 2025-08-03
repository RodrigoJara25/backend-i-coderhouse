import { Router } from "express";
import ProductManager from "../managers/Productmanager.js";

const router = Router();

// inicializamos el json
const productManager = new ProductManager('./src/data/products.json');

// get => obtener datos de los productos
router.get('/', async(req, res)=>{
    const products = await productManager.getProducts();
    res.json(products);
})

// producto por id
router.get('/:id', async(req, res)=> {
    const { id } = req.params.id;
    const product = await productManager.getProductById(pid);
    product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
})

// post => agregar un producto
router.post('/', async(req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
})

export default router;