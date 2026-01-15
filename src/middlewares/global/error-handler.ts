import { HTTPError } from '@utils/http-error';
import type { ErrorHandler } from 'hono';
import { ZodError } from 'zod';

export const onErrorHandler: ErrorHandler = (err, c) => {
  if (err instanceof HTTPError) {
    console.log('Handling as HTTPError with status:', err.statusCode);

    return c.json(
      {
        response: false,
        message: err.message,
      },
      err.statusCode as any,
    );
  }

  if (err instanceof ZodError) {
    console.log('Handling as ZodError');
    return c.json(
      {
        response: false,
        message: 'Validation error',
        errors: err.issues,
      },
      400,
    );
  }

  // Handle generic errors
  console.error('Handling as generic error');
  return c.json(
    {
      response: false,
      message: err instanceof Error ? err.message : 'Internal server error',
    },
    500,
  );
};
