// src/routes/universitas.route.ts
import { UniversitasController } from '@controllers/data-master/universitas.controller';
import { Hono } from 'hono';
import { container } from '../container';

const univRoute = new Hono();

// Resolve Dependency Injection
const controller = container.resolve(UniversitasController);

// ✅ SEKARANG INI AKAN BERHASIL
// Karena controller.getAllUniversitas tipe return-nya sudah 'Response', bukan 'Array' lagi.
univRoute.get('/', controller.getAllUniversitas);
univRoute.post('/', controller.createUniversitas);
univRoute.delete('/:id', controller.deleteUniversitas);
univRoute.put('/:id', controller.updateUniversitas);

export default univRoute;
