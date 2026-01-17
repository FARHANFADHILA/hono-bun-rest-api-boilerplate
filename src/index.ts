import 'reflect-metadata';

import { Hono } from 'hono';

import { onErrorHandler } from '@middlewares/global/error-handler';
import { loggerMiddleware } from '@middlewares/global/logger';
import fakultasRoute from '@routes/fakultas.routes';
import universitasRoute from '@routes/universitas.routes';
const app = new Hono();

app.onError(onErrorHandler);

app.use('*', loggerMiddleware());
app.get('/', (c) => {
  return c.text('Hello Hono ! Server is running 🚀');
});

app.route('/universitas', universitasRoute);

app.route('/fakultas', fakultasRoute);

export default app;
