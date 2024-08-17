import swaggerUi from 'swagger-ui-express';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.NODE_ENV);

const swaggerDocument =
  process.env.NODE_ENV === 'production'
    ? require('./swagger.json')
    : require('../swagger.json');
const port = process.env.NODE_ENV === 'production' ? 5000 : +process.env.PORT!;
console.log({ port });

const app = express();

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => console.log(`Server started on port ${port}`));
