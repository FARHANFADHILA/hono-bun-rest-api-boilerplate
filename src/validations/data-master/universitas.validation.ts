import { z } from 'zod';

// Export schema yang bisa di-reuse dengan custom error messages
export const createUniversitasSchema = z.object({
  nama: z
    .string({
      message: 'Nama universitas harus berupa text, bukan angka atau tipe data lain',
    })
    .trim()
    .min(1, { message: 'Nama universitas tidak boleh kosong' })
    .max(100, { message: 'Nama universitas maksimal 100 karakter' }),

  akronim: z
    .string({ message: 'Akronim wajib diisi' })
    .trim()
    .toUpperCase()
    .min(1, { message: 'Akronim tidak boleh kosong' })
    .max(60, { message: 'Akronim maksimal 60 karakter' }),

  created_by: z.string().uuid({ message: 'Format UUID tidak valid untuk created_by' }).optional(),

  updated_by: z.string().uuid({ message: 'Format UUID tidak valid untuk updated_by' }).optional(),
});

export const updateUniversitasSchema = z.object({
  id: z.string().uuid({ message: 'Format UUID tidak valid untuk id' }),
  nama: z
    .string()
    .trim()
    .min(1, { message: 'Nama universitas tidak boleh kosong' })
    .max(100, { message: 'Nama universitas maksimal 100 karakter' })
    .optional(),

  akronim: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, { message: 'Akronim tidak boleh kosong' })
    .max(60, { message: 'Akronim maksimal 60 karakter' })
    .optional(),

  updated_by: z.string().uuid({ message: 'Format UUID tidak valid untuk updated_by' }).optional(),
});

export const deleteUniversitasSchema = z.object({
  id: z.string().uuid({ message: 'Format UUID tidak valid untuk id' }),
});

// Export types untuk TypeScript
export type CreateUniversitasInput = z.infer<typeof createUniversitasSchema>;
export type UpdateUniversitasInput = z.infer<typeof updateUniversitasSchema>;
export type DeleteUniversitasInput = z.infer<typeof deleteUniversitasSchema>;
