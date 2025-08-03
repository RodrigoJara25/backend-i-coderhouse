import express from 'express';

import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// definimos las rutas para los productos y los carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

