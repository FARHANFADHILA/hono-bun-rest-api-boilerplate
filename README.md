# 🚀 Hono REST API - Clean Architecture (OOP Pattern)

Project ini adalah boilerplate Backend menggunakan **Hono** dan **Bun**, yang dibangun dengan prinsip **Clean Architecture** (Layered Architecture). Struktur ini dirancang untuk skalabilitas, kemudahan maintenance, dan penerapan prinsip **SOLID**.

---

## 🛠️ Tech Stack

Berikut adalah teknologi yang digunakan dalam project ini:

### Core Technologies

| Technology | Version | Description |
|------------|---------|-------------|
| **[Bun](https://bun.sh/)** | Latest | ⚡ JavaScript runtime yang super cepat (pengganti Node.js) |
| **[Hono](https://hono.dev/)** | ^4.11.3 | 🔥 Web framework ultralight & ultra-fast untuk edge computing |
| **[TypeScript](https://www.typescriptlang.org/)** | ^5 | 📘 Superset JavaScript dengan type safety |

### Database & ORM

| Technology | Version | Description |
|------------|---------|-------------|
| **[Prisma](https://www.prisma.io/)** | ^7.2.0 | 🗄️ Next-generation ORM untuk TypeScript & Node.js |
| **[Prisma Adapter PG](https://www.prisma.io/docs/orm/overview/databases/postgresql)** | ^7.2.0 | 🔌 PostgreSQL adapter untuk Prisma |
| **[pg](https://node-postgres.com/)** | ^8.16.3 | 🐘 PostgreSQL client untuk Node.js dengan connection pooling |

### Dependency Injection

| Technology | Version | Description |
|------------|---------|-------------|
| **[TSyringe](https://github.com/microsoft/tsyringe)** | ^4.10.0 | 💉 Lightweight dependency injection container untuk TypeScript |
| **[reflect-metadata](https://www.npmjs.com/package/reflect-metadata)** | ^0.2.2 | 🪞 Polyfill untuk Metadata Reflection API (required untuk TSyringe) |

### Validation

| Technology | Version | Description |
|------------|---------|-------------|
| **[Zod](https://zod.dev/)** | ^4.3.5 | ✅ TypeScript-first schema validation dengan static type inference |

### Code Quality & Formatting

| Technology | Version | Description |
|------------|---------|-------------|
| **[Prettier](https://prettier.io/)** | ^3.8.0 | 💅 Opinionated code formatter untuk konsistensi kode |
| **[prettier-plugin-organize-imports](https://www.npmjs.com/package/prettier-plugin-organize-imports)** | ^4.3.0 | 📦 Plugin Prettier untuk auto-organize imports |
| **[Husky](https://typicode.github.io/husky/)** | ^9.1.7 | 🐶 Git hooks untuk menjalankan script sebelum commit/push |
| **[lint-staged](https://github.com/okonet/lint-staged)** | ^16.2.7 | 🎯 Run linters hanya pada staged files (pre-commit) |

### Logging

| Technology | Version | Description |
|------------|---------|-------------|
| **[Pino](https://getpino.io/)** | ^10.2.0 | 📝 Super fast, low overhead logging library |
| **[hono-pino](https://www.npmjs.com/package/hono-pino)** | ^0.10.3 | 🔗 Pino logger middleware untuk Hono |
| **[pino-pretty](https://github.com/pinojs/pino-pretty)** | ^13.1.3 | 🎨 Prettifier untuk Pino logs (development only) |

### Development Tools

| Technology | Version | Description |
|------------|---------|-------------|
| **[@types/bun](https://www.npmjs.com/package/@types/bun)** | ^1.3.5 | 📦 TypeScript definitions untuk Bun |
| **[@types/node](https://www.npmjs.com/package/@types/node)** | ^25.0.8 | 📦 TypeScript definitions untuk Node.js |
| **[@types/pg](https://www.npmjs.com/package/@types/pg)** | ^8.16.0 | 📦 TypeScript definitions untuk pg |
| **[dotenv](https://www.npmjs.com/package/dotenv)** | ^17.2.3 | 🔐 Load environment variables dari `.env` file |

---

## ✨ Key Features

- ✅ **Clean Architecture** - Separation of concerns dengan layered architecture
- ✅ **Dependency Injection** - Menggunakan TSyringe untuk IoC (Inversion of Control)
- ✅ **Type Safety** - Full TypeScript support dengan Zod validation
- ✅ **Fast Performance** - Bun runtime + Hono framework = blazing fast ⚡
- ✅ **Database Pooling** - PostgreSQL connection pooling untuk performa optimal
- ✅ **Auto Formatting** - Prettier + Husky untuk code consistency
- ✅ **Structured Logging** - Pino logger dengan pretty print untuk development
- ✅ **Error Handling** - Global error handler dengan custom HTTPError class
- ✅ **SOLID Principles** - Mengikuti best practices OOP

---

## 📂 Struktur Folder (The Anatomy)

Berikut adalah peta mental dari struktur folder proyek ini. Setiap folder memiliki tanggung jawab spesifik (Single Responsibility Principle).

```
src/
├── config/         # ⚙️ Jantung Konfigurasi (Database, Env, Singleton)
├── controllers/    # 🗣️ Resepsionis (Handle Request & Response)
├── services/       # 🧠 Otak Bisnis (Logika Utama & OOP Classes)
├── repositories/   # 🗄️ Gudang Data (Akses Database/Prisma)
├── models/         # 🛡️ Validasi Data (DTO / Zod or Valibot Schema)
├── routes/         # 🗺️ Peta Jalan (Routing URL)
├── middlewares/    # 👮 Satpam (Auth Guard, Logging)
├── utils/          # 🛠️ Alat Bantu (Helper Functions)
└── index.ts        # 🚪 Pintu Utama Aplikasi
```

---

## 📖 Penjelasan Detail Setiap Folder

### 1. `config/` - ⚙️ Jantung Konfigurasi

**Tanggung Jawab:**
- Menyimpan semua konfigurasi aplikasi (database, environment variables, third-party services)
- Menginisialisasi koneksi database (Prisma Client, Redis, dll)
- Mengelola singleton instances untuk mencegah multiple connections

**Contoh File:**
- `database.ts` - Prisma Client instance
- `env.ts` - Environment variable validation & parsing
- `redis.ts` - Redis client configuration
- `s3.ts` - AWS S3 bucket configuration

**Best Practice:**
```typescript
// ✅ BENAR: Export singleton instance
export const prisma = new PrismaClient();

// ❌ SALAH: Jangan buat instance baru di setiap file
const prisma = new PrismaClient(); // Ini akan bikin memory leak!
```

---

### 2. `controllers/` - 🗣️ Resepsionis (HTTP Layer)

**Tanggung Jawab:**
- Menerima HTTP Request dari client
- Validasi input (basic validation, bukan business logic)
- Memanggil Service layer untuk proses bisnis
- Mengembalikan HTTP Response (JSON, status code)

**Contoh File:**
- `auth.controller.ts` - Login, Register, Logout
- `user.controller.ts` - CRUD User
- `product.controller.ts` - CRUD Product

**Best Practice:**
```typescript
// ✅ BENAR: Controller hanya handle HTTP
class UserController {
  async getUser(c: Context) {
    const userId = c.req.param('id');
    const user = await userService.findById(userId); // Delegate ke Service
    return c.json(user);
  }
}

// ❌ SALAH: Jangan taruh business logic di Controller
class UserController {
  async getUser(c: Context) {
    const user = await prisma.user.findUnique(...); // ❌ Langsung query DB
    if (user.age < 18) { ... } // ❌ Business logic di Controller
  }
}
```

**Aturan Emas:**
- ✅ Boleh: Parsing request, validasi format, return response
- ❌ Jangan: Query database langsung, business logic, hashing password

---

### 3. `services/` - 🧠 Otak Bisnis (Business Logic Layer)

**Tanggung Jawab:**
- Menjalankan **semua** business logic aplikasi
- Validasi data kompleks (misal: email sudah terdaftar?)
- Orchestration (menggabungkan beberapa repository calls)
- Error handling & custom exceptions

**Contoh File:**
- `auth.service.ts` - Hash password, generate JWT, verify token
- `user.service.ts` - Business rules untuk user (misal: user harus 18+ tahun)
- `payment.service.ts` - Kalkulasi diskon, tax, total harga

**Best Practice:**
```typescript
// ✅ BENAR: Service handle business logic
class AuthService {
  async register(data: RegisterDTO) {
    // 1. Cek email sudah ada?
    const exists = await userRepository.findByEmail(data.email);
    if (exists) throw new Error('Email already registered');
    
    // 2. Hash password (business logic)
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    // 3. Simpan ke DB via Repository
    return await userRepository.create({ ...data, password: hashedPassword });
  }
}

// ❌ SALAH: Service tidak boleh akses Hono Context
class AuthService {
  async register(c: Context) { // ❌ Jangan terima Context
    const body = await c.req.json(); // ❌ Ini tugas Controller
  }
}
```

**Aturan Emas:**
- ✅ Boleh: Business logic, validasi kompleks, orchestration
- ❌ Jangan: Akses HTTP Context (`c`), return HTTP response

---

### 4. `repositories/` - 🗄️ Gudang Data (Data Access Layer)

**Tanggung Jawab:**
- **Satu-satunya** layer yang boleh akses database
- CRUD operations (Create, Read, Update, Delete)
- Query builder & raw queries
- Abstraksi database (jika ganti DB, cukup ubah Repository)

**Contoh File:**
- `user.repository.ts` - Query user table
- `product.repository.ts` - Query product table
- `order.repository.ts` - Query order table

**Best Practice:**
```typescript
// ✅ BENAR: Repository hanya query DB
class UserRepository {
  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }
  
  async create(data: CreateUserDTO) {
    return await prisma.user.create({ data });
  }
}

// ❌ SALAH: Jangan taruh business logic di Repository
class UserRepository {
  async create(data: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(data.password); // ❌ Ini tugas Service
    return await prisma.user.create({ data: { ...data, password: hashedPassword } });
  }
}
```

**Aturan Emas:**
- ✅ Boleh: Query DB, raw SQL, transaction
- ❌ Jangan: Business logic, validasi, hashing

---

### 5. `models/` - 🛡️ Validasi Data (Schema & DTO)

**Tanggung Jawab:**
- Definisi schema untuk validasi input (Zod, Valibot, Yup)
- Data Transfer Objects (DTO) - TypeScript interfaces/types
- Memastikan data yang masuk sesuai format

**Contoh File:**
- `user.model.ts` - Schema untuk register, login, update user
- `product.model.ts` - Schema untuk create/update product
- `common.model.ts` - Schema umum (pagination, sorting)

**Best Practice:**
```typescript
// ✅ BENAR: Definisi schema dengan Zod
import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3),
});

export type RegisterDTO = z.infer<typeof RegisterSchema>;

// Gunakan di Controller:
const body = await c.req.json();
const validated = RegisterSchema.parse(body); // Auto throw error jika invalid
```

**Aturan Emas:**
- ✅ Boleh: Schema definition, type inference
- ❌ Jangan: Business logic, database queries

---

### 6. `routes/` - 🗺️ Peta Jalan (Routing)

**Tanggung Jawab:**
- Mendefinisikan endpoint URL aplikasi
- Menghubungkan URL dengan Controller
- Menerapkan middleware (auth, rate limit, dll)

**Contoh File:**
- `auth.route.ts` - `/register`, `/login`, `/logout`
- `user.route.ts` - `/users`, `/users/:id`
- `index.ts` - Menggabungkan semua routes

**Best Practice:**
```typescript
// ✅ BENAR: Route hanya mapping URL ke Controller
import { Hono } from 'hono';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const authRoute = new Hono();

authRoute.post('/register', (c) => authController.register(c));
authRoute.post('/login', (c) => authController.login(c));
authRoute.post('/logout', authMiddleware, (c) => authController.logout(c)); // Dengan middleware

export default authRoute;
```

**Aturan Emas:**
- ✅ Boleh: Define routes, apply middleware
- ❌ Jangan: Business logic, validasi kompleks

---

### 7. `middlewares/` - 👮 Satpam (Middleware Layer)

**Tanggung Jawab:**
- Authentication & Authorization (cek JWT token)
- Logging (request/response logger)
- Rate limiting
- CORS handling
- Error handling global

**Contoh File:**
- `auth.middleware.ts` - Verify JWT token
- `logger.middleware.ts` - Log setiap request
- `error.middleware.ts` - Global error handler
- `rate-limit.middleware.ts` - Batasi request per IP

**Best Practice:**
```typescript
// ✅ BENAR: Middleware untuk auth
export const authMiddleware = async (c: Context, next: Next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    c.set('user', decoded); // Simpan user di context
    await next(); // Lanjut ke handler berikutnya
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
};
```

**Aturan Emas:**
- ✅ Boleh: Validasi token, logging, error handling
- ❌ Jangan: Business logic, database queries langsung

---

### 8. `utils/` - 🛠️ Alat Bantu (Helper Functions)

**Tanggung Jawab:**
- Pure functions yang bisa dipakai di mana saja
- Helper untuk formatting, parsing, calculation
- Tidak boleh ada side effects (tidak akses DB/API)

**Contoh File:**
- `date.util.ts` - Format tanggal, calculate age
- `string.util.ts` - Slugify, capitalize, truncate
- `crypto.util.ts` - Generate random string, hash
- `response.util.ts` - Standardize API response format

**Best Practice:**
```typescript
// ✅ BENAR: Pure function, no side effects
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// ❌ SALAH: Jangan akses database di utils
export async function getUserAge(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } }); // ❌
  return calculateAge(user.birthDate);
}
```

**Aturan Emas:**
- ✅ Boleh: Pure functions, formatting, calculation
- ❌ Jangan: Database access, API calls, side effects

---

### 9. `index.ts` - 🚪 Pintu Utama Aplikasi

**Tanggung Jawab:**
- Entry point aplikasi
- Inisialisasi Hono app
- Register semua routes
- Start server

**Contoh:**
```typescript
import { Hono } from 'hono';
import authRoute from './routes/auth.route';
import userRoute from './routes/user.route';

const app = new Hono();

// Register routes
app.route('/auth', authRoute);
app.route('/users', userRoute);

// Start server
export default {
  port: 3000,
  fetch: app.fetch,
};
```

---

# 🔄 The Request Lifecycle (Alur Hidup Request)

Bagian ini menjelaskan bagaimana data bergerak dari saat User menekan tombol "Send" di Postman/Frontend hingga data masuk ke Database, dan kembali lagi.

Kita ambil contoh kasus: **Registrasi User Baru**.

### 1. Diagram Alur

`Request (JSON)` ➡️ **Router** ➡️ **Controller** ➡️ **Service** ➡️ **Repository** ➡️ **Database**

### 2. Bedah Langkah-demi-Langkah (Step-by-Step)

#### Langkah 1: Router (Peta Jalan) 🗺️

- **File:** `src/routes/auth.route.ts`
- **Tugas:** Mendengar request `POST /register`.
- **Aksi:** Meneruskan request ke `AuthController`.
- **Kode:**
  ```typescript
  app.post("/register", (c) => authController.register(c));
  ```

#### Langkah 2: Controller (Resepsionis) 🗣️

- **File:** `src/controllers/auth.controller.ts`
- **Tugas:** Menerima data mentah, validasi bentuk data, panggil bos (Service).
- **Aksi:**
  1.  Ambil body: `const body = await c.req.json()`.
  2.  Panggil Service: `await authService.register(body)`.
  3.  Kembalikan Response: `return c.json({ message: 'Success' }, 201)`.
- **Pantangan:** Jangan lakukan hash password atau query DB di sini!

#### Langkah 3: Service (Otak Bisnis) 🧠

- **File:** `src/services/auth.service.ts`
- **Tugas:** Logika berat.
- **Aksi:**
  1.  Cek apakah email sudah ada? (`userRepository.findByEmail`).
  2.  Jika ada, lempar error: `throw new Error("User already exists")`.
  3.  Jika belum, hash password: `bcrypt.hash(password)`.
  4.  Suruh Repository simpan: `userRepository.create(userData)`.

#### Langkah 4: Repository (Gudang) 🗄️

- **File:** `src/repositories/user.repository.ts`
- **Tugas:** Eksekutor Database.
- **Aksi:** Menggunakan Prisma untuk menulis ke DB.
- **Kode:**
  ```typescript
  async create(data: UserData) {
    return await prisma.user.create({ data });
  }
  ```

---

## 👨‍💻 Cheat Sheet: Siapa Memanggil Siapa?

Jangan sampai terbalik! Arsitektur ini punya aturan arah komunikasi satu arah (Unidirectional).

| Layer          | Boleh Memanggil (Import) | Tidak Boleh Memanggil          |
| :------------- | :----------------------- | :----------------------------- |
| **Controller** | Service                  | Repository, Database           |
| **Service**    | Repository, Utils        | Controller, Hono Context (`c`) |
| **Repository** | Prisma (Database)        | Controller, Service            |

> **Analogi Restoran:**
>
> - **Controller** adalah **Pelayan**. Dia mencatat pesanan (Request) dan kasih ke Dapur. Dia tidak boleh masak.
> - **Service** adalah **Koki Kepala**. Dia meracik bumbu (Logic), memotong daging. Dia menyuruh asisten ambil bahan.
> - **Repository** adalah **Penjaga Gudang**. Dia cuma mengambil bahan (Data) dari kulkas (Database) sesuai perintah Koki.

---

## 🏗️ Cara Menambah Fitur Baru (Workflow)

Jika Anda ingin membuat fitur baru (misal: "Create Product"), ikuti urutan kerjanya dari **Bawah ke Atas**:

1.  **Database:** Update `schema.prisma` (tambah model Product), lalu `bunx prisma migrate dev`.
2.  **Repository:** Buat `ProductRepository` (fungsi: `create`, `findAll`).
3.  **Service:** Buat `ProductService` (validasi harga gak boleh minus, stok harus ada).
4.  **Controller:** Buat `ProductController` (terima input JSON).
5.  **Route:** Daftarkan URL `/products` di `routes/product.route.ts`.
