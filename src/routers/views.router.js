import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();

const cartManager = new CartManager('./src/data/carts.json');

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {});
})

export default router;