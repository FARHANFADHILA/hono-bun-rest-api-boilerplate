import { z } from 'zod';

export const createFakultasSchema = z.object({
  kode: z
    .string()
    .min(1, 'Kode fakultas tidak boleh kosong')
    .max(10, 'Kode fakultas maksimal 10 karakter'),
  nama: z
    .string()
    .min(1, 'Nama fakultas tidak boleh kosong')
    .max(60, 'Nama fakultas maksimal 60 karakter'),
  id_universitas: z.string().uuid('ID universitas harus berupa UUID yang valid'),
});

export const updateFakultasSchema = z.object({
  id: z.string().min(1, 'ID fakultas tidak boleh kosong'),
  nama: z.string().min(1, 'Nama fakultas tidak boleh kosong'),
  kode: z
    .string()
    .min(1, 'Kode fakultas tidak boleh kosong')
    .max(10, 'Kode fakultas maksimal 10 karakter'),
});

export const deleteFakultasSchema = z.object({
  id: z.string().min(1, 'ID fakultas tidak boleh kosong'),
});
