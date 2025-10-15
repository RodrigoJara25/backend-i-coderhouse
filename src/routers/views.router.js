import { Router } from "express";
import ProductManager from "../managers/Productmanager.js";

const router = Router();

const productManager = new ProductManager();

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {});
})

router.get('/productsPaginated', async (req, res) => {
    // Puedes obtener los productos paginados aquí usando ProductManager
    const { limit = 10, page = 1, sort, query } = req.query;
    let filter = {};
    if (query) {
        const [key, value] = query.split(':');
        filter[key] = value;
    }
    const products = await productManager.getProductsPaginated({ limit, page, sort, filter });
    res.render('productsPaginated', { products });

    // ----- PRUEBAS -----
    // // 1. Ver los primeros 5 productos (página 1, límite 5)
    // http://localhost:8080/views/productsPaginated?limit=5&page=1

    // // 2. Ver los siguientes 5 productos (página 2, límite 5)
    // http://localhost:8080/views/productsPaginated?limit=5&page=2

    // // 3. Ver todos los productos de la categoría "Pizzas"
    // http://localhost:8080/views/productsPaginated?query=category:Pizzas

    // // 4. Ver todos los productos de la categoría "Bebidas"
    // http://localhost:8080/views/productsPaginated?query=category:Bebidas

    // // 5. Ver solo productos activos (status true)
    // http://localhost:8080/views/productsPaginated?query=status:true

    // // 6. Ver solo productos inactivos (status false)
    // http://localhost:8080/views/productsPaginated?query=status:false

    // // 7. Ordenar productos por precio ascendente
    // http://localhost:8080/views/productsPaginated?sort=asc

    // // 8. Ordenar productos por precio descendente
    // http://localhost:8080/views/productsPaginated?sort=desc

    // // 9. Ver los primeros 3 productos de la categoría "Postres", ordenados por precio descendente
    // http://localhost:8080/views/productsPaginated?query=category:Postres&limit=3&sort=desc

    // // 10. Ver la segunda página de productos de la categoría "Pizzas", 2 por página, ordenados por precio ascendente
    // http://localhost:8080/views/productsPaginated?query=category:Pizzas&limit=2&page=2&sort=asc

    // // 11. Ver todos los productos (sin filtros, límite por defecto)
    // http://localhost:8080/views/productsPaginated

    // // 12. Probar con un filtro inexistente (debería mostrar vacío o mensaje de no hay productos)
    // http://localhost:8080/views/productsPaginated?query=category:NoExiste

})

export default router;