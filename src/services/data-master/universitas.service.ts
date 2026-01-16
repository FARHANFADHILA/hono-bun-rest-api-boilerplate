import { Prisma } from '@generated/prisma/client';
import { UniversitasRepositories } from '@repositories/data-master/universitas.repositories';
import { HTTPError } from '@utils/http-error';
import { injectable } from 'tsyringe';

@injectable()
export class UniversitasService {
  constructor(private repoUniversitas: UniversitasRepositories) {}

  async getAllUniversitas() {
    return await this.repoUniversitas.getAllUniversitas();
  }

  async createUniversitas(data: Prisma.UniversitasCreateInput) {
    try {
      return await this.repoUniversitas.createUniversitas(data);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HTTPError(409, 'Data niversitas sudah ada (Duplikat).');
        }
      }
      throw error;
    }
  }

  async updateUniversitas(id: string, data: Prisma.UniversitasUpdateInput) {
    try {
      return await this.repoUniversitas.updateUniversitas(id, data);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HTTPError(404, 'Data universitas tidak ditemukan.');
        }
      }
      throw error;
    }
  }

  async deleteUniversitas(id: string) {
    try {
      return await this.repoUniversitas.deleteUniversitas(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HTTPError(404, 'Data universitas tidak ditemukan.');
        }
      }
      throw error;
    }
  }
}
