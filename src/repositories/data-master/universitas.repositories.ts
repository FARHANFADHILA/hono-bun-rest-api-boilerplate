import type { Prisma, PrismaClient } from '@generated/prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UniversitasRepositories {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async getAllUniversitas() {
    return await this.prisma.universitas.findMany({
      select: {
        id: true,
        nama: true,
        akronim: true,
      },
    });
  }

  async createUniversitas(data: Prisma.UniversitasCreateInput) {
    return await this.prisma.universitas.create({ data });
  }

  async updateUniversitas(id: string, data: Prisma.UniversitasUpdateInput) {
    return await this.prisma.universitas.update({ where: { id }, data });
  }

  async deleteUniversitas(id: string) {
    return await this.prisma.universitas.delete({ where: { id } });
  }
}
