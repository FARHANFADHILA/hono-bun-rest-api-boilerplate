-- CreateTable
CREATE TABLE "universitas" (
    "id" UUID NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "akronim" VARCHAR(60) NOT NULL,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "universitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fakultas" (
    "id" UUID NOT NULL,
    "kode" VARCHAR(10) NOT NULL,
    "nama" VARCHAR(60) NOT NULL,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "id_universitas" UUID NOT NULL,

    CONSTRAINT "fakultas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "universitas_nama_key" ON "universitas"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "universitas_akronim_key" ON "universitas"("akronim");

-- CreateIndex
CREATE UNIQUE INDEX "fakultas_kode_key" ON "fakultas"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "fakultas_nama_key" ON "fakultas"("nama");

-- AddForeignKey
ALTER TABLE "fakultas" ADD CONSTRAINT "fakultas_id_universitas_fkey" FOREIGN KEY ("id_universitas") REFERENCES "universitas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
