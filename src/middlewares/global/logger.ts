import { pinoLogger } from "hono-pino";
import pino from "pino"; // Import pino asli untuk konfigurasi manual

export const loggerMiddleware = () => {
  return pinoLogger({
    pino: pino({
      level: process.env.LOG_LEVEL || "info", // Bisa diatur lewat .env

      // KONFIGURASI 1: Transport (Pretty vs JSON)
      transport:
        process.env.NODE_ENV === "development"
          ? {
              target: "pino-pretty",
              options: {
                colorize: true, // Biar berwarna
                ignore: "pid,hostname", // Biar terminal gak penuh info gak penting
                translateTime: "SYS:standard", // Format waktu manusia
              },
            }
          : undefined, // Di Production: undefined = JSON Murni (Cepat & Aman)

      // KONFIGURASI 2: Redaction (Sensor Data Sensitif)
      redact: [
        "req.headers.authorization", // Sensor Token JWT
        "req.body.password", // Sensor Password
        "req.body.confirmPassword", // Sensor Confirm Password
        "req.body.nik", // Sensor Data Pribadi
      ],
    }),

    // KONFIGURASI 3: Request ID (Biar gampang tracking error)
    // Hono-pino otomatis generate UUID untuk setiap request
  });
};
