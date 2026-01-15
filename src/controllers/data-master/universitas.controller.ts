// src/controllers/data-master/universitas.controller.ts
import { injectable } from "tsyringe";
import type { Context } from "hono";
import { UniversitasService } from "@services/data-master/universitas.service";
import {
  createUniversitasSchema,
  deleteUniversitasSchema,
} from "@validations/data-master/universitas.validation";
@injectable()
export class UniversitasController {
  constructor(private universitasService: UniversitasService) {}

  getAllUniversitas = async (c: Context) => {
    const result = await this.universitasService.getAllUniversitas();

    return c.json(
      {
        response: true,
        message: "List Universitas",
        data: result,
      },
      200,
    );
  };

  createUniversitas = async (c: Context) => {
    const body = await c.req.json();
    const validated = createUniversitasSchema.parse(body);
    const result = await this.universitasService.createUniversitas(validated);
    return c.json(
      {
        response: true,
        message: "Berhasil dibuat",
        data: result,
      },
      201,
    );
  };

  deleteUniversitas = async (c: Context) => {
    const id = c.req.param("id");
    const validated = deleteUniversitasSchema.parse({ id });
    const result = await this.universitasService.deleteUniversitas(
      validated.id,
    );

    return c.json(
      {
        response: true,
        message: "Berhasil dihapus",
        data: result,
      },
      200,
    );
  };
}
