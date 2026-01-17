// src/routes/universitas.route.ts
import { FakultasController } from '@controllers/data-master/fakultas.controller';
import { Hono } from 'hono';
import { container } from '../container';

const fakultasRoute = new Hono();

// Resolve Dependency Injection
const controller = container.resolve(FakultasController);

// ✅ SEKARANG INI AKAN BERHASIL
// Karena controller.getAllUniversitas tipe return-nya sudah 'Response', bukan 'Array' lagi.
fakultasRoute.get('/', controller.getAllFakultas);
fakultasRoute.post('/', controller.createFakultas);
fakultasRoute.put('/:id', controller.updateFakultas);
fakultasRoute.delete('/:id', controller.deleteFakultas);

export default fakultasRoute;
