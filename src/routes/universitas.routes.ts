// src/routes/universitas.route.ts
import { Hono } from "hono";
import { container } from "../container";
import { UniversitasController } from "@controllers/data-master/universitas.controller";

const univRoute = new Hono();

// Resolve Dependency Injection
const controller = container.resolve(UniversitasController);

// ✅ SEKARANG INI AKAN BERHASIL
// Karena controller.getAllUniversitas tipe return-nya sudah 'Response', bukan 'Array' lagi.
univRoute.get("/", controller.getAllUniversitas);
univRoute.post("/", controller.createUniversitas);
univRoute.delete("/:id", controller.deleteUniversitas);

export default univRoute;
