import { Prisma } from '@generated/prisma/client';
import { FakultasRepositories } from '@repositories/data-master/fakultas.repositories';
import { HTTPError } from '@utils/http-error';
import { injectable } from 'tsyringe';

@injectable()
export class FakultasService {
  constructor(private repoFakultas: FakultasRepositories) {}

  getAllFakultas = async () => {
    return await this.repoFakultas.getAllFakultas();
  };

  createFakultas = async (data: { kode: string; nama: string; id_universitas: string }) => {
    // Transform data dari format API ke format Prisma
    const prismaData: Prisma.FakultasCreateInput = {
      kode: data.kode,
      nama: data.nama,
      universitas: {
        connect: { id: data.id_universitas },
      },
    };
    try {
      return await this.repoFakultas.createFakultas(prismaData);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HTTPError(400, 'tidak ada universitas dengan id tersebut');
        }
      }
      throw new HTTPError(400, 'Gagal membuat fakultas');
    }
  };

  updateFakultas = async (id: string, data: Prisma.FakultasUpdateInput) => {
    try {
      return await this.repoFakultas.updateFakultas(id, data);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HTTPError(400, 'tidak ada fakultas dengan id tersebut');
        }
      }
      throw new HTTPError(400, 'Gagal mengupdate fakultas');
    }
  };

  deleteFakultas = async (id: string) => {
    try {
      return await this.repoFakultas.deleteFakultas(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HTTPError(400, 'tidak ada fakultas dengan id tersebut');
        }
      }
      throw new HTTPError(400, 'Gagal menghapus fakultas');
    }
  };
}
