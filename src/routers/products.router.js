import { Router } from "express";
import ProductManager from "../managers/Productmanager.js";
import { io } from "../app.js";

const router = Router();

// inicializamos el json
const productManager = new ProductManager();

// get => obtener datos de los productos
router.get('/', async(req, res)=>{
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        // Construir filtro
        let filter = {};
        if (query) {
            // Puedes hacer que query sea por categoría, status, etc.
            // Ejemplo: ?query=category:Pizzas
            const [key, value] = query.split(':');
            filter[key] = value;
        }


        const products = await productManager.getProductsPaginated({ limit, page, sort, filter });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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
    const products = await productManager.getProducts();
    io.emit('productosActualizados', products); // emite la lista actualizada de productos a todos los clientes conectados
    res.status(201).json(newProduct);
})

export default router;