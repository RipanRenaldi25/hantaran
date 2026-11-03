import swaggerUi from 'swagger-ui-express';
import express from 'express';
import cors from 'cors';
import userRouter from './Infrastructure/Http/Express/v1/Router/UserRouter';
import boxRouter from './Infrastructure/Http/Express/v1/Router/BoxRouter';
import colorRouter from './Infrastructure/Http/Express/v1/Router/ColorRouter';
import decorationRouter from './Infrastructure/Http/Express/v1/Router/DecorationRouter';
import profileRouter from './Infrastructure/Http/Express/v1/Router/ProfileRouter';
import cartRouter from './Infrastructure/Http/Express/v1/Router/CartRouter';
import orderRouter from './Infrastructure/Http/Express/v1/Router/OrderRouter';

const swaggerDocument =
  process.env.NODE_ENV === 'production'
    ? require('./swagger.json')
    : require('../swagger.json');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/public', express.static('uploads'));
app.use('/users', userRouter);
app.use('/boxes', boxRouter);
app.use('/colors', colorRouter);
app.use('/decorations', decorationRouter);
app.use('/profiles', profileRouter);
app.use('/carts', cartRouter);
app.use('/orders', orderRouter);
app.get('/', (req, res) => res.send('ok2'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
