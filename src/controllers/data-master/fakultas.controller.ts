import { FakultasService } from '@services/data-master/fakultas.service';
import {
  createFakultasSchema,
  deleteFakultasSchema,
  updateFakultasSchema,
} from '@validations/data-master/fakultas.validation';
import type { Context } from 'hono';
import { injectable } from 'tsyringe';

@injectable()
export class FakultasController {
  constructor(private fakultasService: FakultasService) {}

  getAllFakultas = async (c: Context) => {
    const result = await this.fakultasService.getAllFakultas();
    return c.json(
      {
        response: true,
        message: 'List Fakultas',
        data: result,
      },
      200,
    );
  };

  createFakultas = async (c: Context) => {
    const body = await c.req.json();
    const validated = createFakultasSchema.parse(body);
    const result = await this.fakultasService.createFakultas(validated);
    return c.json(
      {
        response: true,
        message: 'Berhasil dibuat',
        data: result,
      },
      201,
    );
  };
  updateFakultas = async (c: Context) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const validated = updateFakultasSchema.parse({ id, ...body });
    const result = await this.fakultasService.updateFakultas(validated.id, validated);
    return c.json(
      {
        response: true,
        message: 'Berhasil diupdate',
        data: result,
      },
      200,
    );
  };

  deleteFakultas = async (c: Context) => {
    const id = c.req.param('id');
    const validated = deleteFakultasSchema.parse({ id });
    const result = await this.fakultasService.deleteFakultas(validated.id);
    return c.json(
      {
        response: true,
        message: 'Berhasil dihapus',
        data: result,
      },
      200,
    );
  };
}
