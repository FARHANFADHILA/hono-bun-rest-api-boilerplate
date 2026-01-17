import type { Prisma, PrismaClient } from '@generated/prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FakultasRepositories {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async getAllFakultas() {
    return await this.prisma.universitas.findMany({
      select: {
        id: true,
        nama: true,
        akronim: true,
        fakultas: {
          select: {
            id: true,
            nama: true,
            kode: true,
          },
        },
      },
    });
  }

  async createFakultas(data: Prisma.FakultasCreateInput) {
    return await this.prisma.fakultas.create({ data });
  }

  async updateFakultas(id: string, data: Prisma.FakultasUpdateInput) {
    return await this.prisma.fakultas.update({ where: { id }, data });
  }

  async deleteFakultas(id: string) {
    return await this.prisma.fakultas.delete({ where: { id } });
  }
}
