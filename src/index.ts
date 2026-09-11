import { Hono } from 'hono';

import { onErrorHandler } from '@middlewares/global/error-handler';
import { loggerMiddleware } from '@middlewares/global/logger';
const app = new Hono();

app.onError(onErrorHandler);

app.use('*', loggerMiddleware());
app.get('/', (c) => {
  return c.text('Hello Hono ! Server is running 🚀');
});

export default app;
