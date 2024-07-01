import express from 'express';

const init = () => {
  const port = process.env.PORT_APP ? +process.env.PORT_APP : 5000;
  const app = express();

  app.listen(port);
};

init();
