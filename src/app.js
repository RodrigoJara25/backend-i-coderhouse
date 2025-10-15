import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import viewsRouter from './routers/views.router.js';

import mongoose from 'mongoose';

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

// handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// definimos las rutas para los productos y los carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/views', viewsRouter);

// ruta home
app.get('/', async (req, res) => {
    try {
        const response = await fetch(`http://localhost:${PORT}/api/products`);
        const products = await response.json();
        res.render('home', { products });
    } catch (error) {
        res.render('home', { products: [] });
    }
});

let io;

const main = async() => {
    try {
        await mongoose.connect("mongodb+srv://rodrigo:1234@cluster0.s85oick.mongodb.net/backend?retryWrites=true&w=majority&appName=Cluster0")

        const httpServer = app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

        io = new Server(httpServer);

        io.on('connection', async (socket) => {
            console.log('Nuevo cliente conectado');
        
            try {
                const response = await fetch(`http://localhost:${PORT}/api/products`);
                const productosActualizados = await response.json();
                // mandar los productos actualizados a los clientes
                io.emit('productosActualizados', productosActualizados)
            } catch (error) {
                console.error('Error al recuperar productos:', error);
            }
        });

    } catch (error) {
        console.error('Error al conectador a MongoDB:', error);
    }
}

main();

export { io };